/**
 * modal.js
 */
(function(){
	if( window.px2style.modal ){
		return;
	}

	var $ = window.px2style.$;
	var modalLayers = [];
	var isIphone = window.navigator.userAgent.match(/iPhone/);
	var $body;

	/**
	 * Open modal dialog.
	 */
	window.px2style.modal = function(options, callback){
		var px2style = this;
		callback = callback||function(){};

		$body = $('body');

		options = options||{};
		options.title = options.title||'';
		options.type = options.type||'modal'; // modal(default), drawer-left, drawer-right
		options.body = options.body||$('<div>');
		options.buttons = options.buttons||[
			$('<button type="submit" class="px2-btn px2-btn--primary">')
				.text('OK')
				.on('click.px2-modal', function(e){
					px2style.closeModal();
				})
		];
		options.buttonsSecondary = options.buttonsSecondary||[];
		options.target = options.target||$('body');
		options.onclose = options.onclose||function(){};
		options.onbgclick = options.onbgclick||function(){};
		options.form = options.form||false;

		var tpl = '';
		tpl += '<dialog class="px2-modal">';
		if(options.form){
			tpl += '<form>';
		}
		tpl += ' <article class="px2-modal__dialog">';
		tpl += '  <div class="px2-modal__header">';
		tpl += '      <h1 class="px2-modal__title" tabindex="-1"></h1>';
		tpl += '  </div>';
		tpl += '  <div class="px2-modal__body"><div class="px2-modal__body-inner"></div></div>';
		tpl += '  <div class="px2-modal__footer"><div class="px2-modal__footer-primary"></div><div class="px2-modal__footer-secondary"></div></div>';
		tpl += '  <div class="px2-modal__close"><button type="button"></button></div>';
		tpl += ' </article>';
		if(options.form){
			tpl += '</form>';
		}
		tpl += '</dialog>';

		var $modal = $(tpl);
		$modal.on('click.px2-modal', function(e){
			e.preventDefault();
			options.onbgclick(e);
		});

		if( options.type ){
			$modal.addClass('px2-modal--type-'+options.type);
		}

		if(options.form){
			$modal.find('form').attr({
				'action': options.form.action || 'javascript:;',
				'method': options.form.method || 'post'
			}).on('submit.px2-modal', options.form.submit || function(){
				px2style.closeModal();
			});
		}

		var $title = $modal.find('.px2-modal__title');
		if( typeof(options.title) === typeof('') && options.title.length ){
			$title.append( options.title );
		}else{
			$modal.addClass('px2-modal--no-title');
		}

		var $closeBtn = $modal.find('.px2-modal__close button');
		$closeBtn.on('click.px2-modal', function(e){
			e.preventDefault();
			px2style.closeModal();
		});

		var $modalBodyInner = $modal.find('.px2-modal__body-inner');
		$modalBodyInner.append( options.body );

		function generateBtn(btnSetting){
			btnSetting = btnSetting || {};
			var $li = $('<li>');
			var $btn = $(btnSetting);
			$li.append($btn);
			if( !$btn.attr('class') ){
				$btn.attr({'class':'px2-btn'});
			}
			if( !$btn.text() ){
				$btn.text('button');
			}
			return $li;
		}

		var $footer = $modal.find('.px2-modal__footer-primary');
		var $footerUl = $('<ul>');
		for( var i in options.buttons ){
			$footerUl.append( generateBtn(options.buttons[i]) );
		}
		$footer.append($footerUl);

		var $footer2 = $modal.find('.px2-modal__footer-secondary');
		var $footer2Ul = $('<ul>');
		for( var i in options.buttonsSecondary ){
			$footer2Ul.append( generateBtn(options.buttonsSecondary[i]) );
		}
		$footer2.append($footer2Ul);

		if( (!options.buttons || !options.buttons.length) && (!options.buttonsSecondary || !options.buttonsSecondary.length) ){
			$modal.addClass('px2-modal--no-btn');
		}

		var objModal = new classModal(px2style, $modal, options);
		modalLayers.push(objModal);

		optimizeOverlappingModalStyles();

		callback( objModal );

		return objModal;
	}

	/**
	 * モーダルクラス
	 */
	function classModal(px2style, $modal, options){
		var self = this;
		this.$modal = $modal;
		this.options = options;
		this.focusBackTo = document.activeElement;

		var presetOverflow = {
			"hasClass": $body.hasClass('px2-scroll-lock'),
			"scrollY": window.scrollY,
			"scrollX": window.scrollX,
			"css_overflow": $body.css('overflow'),
			"css_top": $body.css('top'),
		};
		if( !presetOverflow.hasClass ){
			$body.addClass('px2-scroll-lock');
			if( isIphone ){
				$body
					.addClass('px2-scroll-lock--iphone')
					.css({"top": presetOverflow.scrollY * -1});
			}
		}

		var isClosable = true;
		var $target = $(this.options.target);
		$target.append($modal);

		if( this.options.width ){
			this.$modal.find('.px2-modal__dialog').css({
				"max-width": this.options.width
			});
		}

		if(!modalLayers.length){
			$(window).on('keydown.px2-modal', function(e){
				if( e.keyCode == 27 ){ // ESC
					px2style.closeModal(function(){});
				}
			});
		}

		tabkeyControl(this.$modal);


		/**
		 * 状態を更新する
		 */
		this.refresh = function(){
			tabkeyControl(this.$modal);
		}

		/**
		 * フォーム要素をロックする
		 *
		 * フォームをロックしても、Escキー操作などでモーダルを閉じることはできます。
		 * モーダルを閉じれなくするには、 `this.closable(false)` を同時に呼び出してください。
		 */
		this.lock = function(){
			var $formElms = this.$modal.find('input,select,textarea,button');
			$formElms.each(function(idx, elm){
				var $elm = $(elm);
				var isDisabled = !!$elm.attr('disabled');
				if( !isDisabled ){
					$elm.attr({
						'data-px2-modal-locked': true,
						'disabled': true
					});
				}
			});
			tabkeyControl(this.$modal, true);
		}

		/**
		 * フォーム要素のロックを解除する
		 */
		this.unlock = function(){
			var $formElms = this.$modal.find('[data-px2-modal-locked]');
			$formElms
				.removeAttr('data-px2-modal-locked')
				.removeAttr('disabled')
			;
			tabkeyControl(this.$modal, false);
		}


		/**
		 * モーダルの 閉じれる/閉じれない を切り替える
		 */
		this.closable = function( toggle ){
			isClosable = !!toggle;
			var closeBtn = this.$modal.find('.px2-modal__close');
			if( isClosable ){
				closeBtn.css({'display':'block'});
			}else{
				closeBtn.css({'display':'none'});
			}
			return;
		}

		/**
		 * モーダルが 閉じれる状態にあるか調べる
		 */
		this.isClosable = function(){
			return isClosable;
		}


		/**
		 * モーダルの内容を置き換える
		 */
		this.replaceBody = function( modalBodyContent ){
			var $modalBodyInner = this.$modal.find('.px2-modal__body-inner');
			$modalBodyInner.html('').append( modalBodyContent );
			tabkeyControl(this.$modal);
			this.$modal.find('.px2-modal__title').focus();
		}

		/**
		 * モーダルを閉じる
		 */
		this.close = function( callback ){
			var self = this;
			callback = callback||function(){};
			self.$modal.find('.px2-modal__dialog').addClass('px2-modal__dialog--closed');

			if( !presetOverflow.hasClass ){
				$body
					.removeClass('px2-scroll-lock')
					.removeClass('px2-scroll-lock--iphone');
				if( isIphone ){
					window.scroll(presetOverflow.scrollX, presetOverflow.scrollY);
					$body.css({"top": presetOverflow.css_top});
				}
			}

			setTimeout(function(){
				try {
					self.focusBackTo.focus();
				} catch (e) {}
				try {
					self.$modal.remove();
				} catch (e) {}
				if(!modalLayers.length){
					$(window).off('keydown.px2-modal');
				}
				callback(true);
				self.options.onclose();

				optimizeOverlappingModalStyles();

				self = undefined;
			}, 300);
		}

	}

	/**
	 * Close modal dialog.
	 */
	window.px2style.closeModal = function(callback){
		callback = callback||function(){};
		var lastModal = modalLayers.pop();
		if( !lastModal.isClosable() ){
			modalLayers.push(lastModal);
			callback(false);
			return;
		}
		lastModal.close(function(res){
			callback(res);
			lastModal = undefined;
		});
		return;
	}

	/**
	 * タブキーの操作を制御する
	 */
	function tabkeyControl($target, isLocked){

		var $modalFrame = $target.find('.px2-modal__dialog');
		var $tabTargets = $target.find('a, input:not([type=hidden]), textarea, select, button');
		var $start = $tabTargets.eq(0);
		var $end = $tabTargets.eq(-1);
		var $title = $target.find('.px2-modal__title');

		$target.off('keydown.px2-modal');
		$modalFrame.off('click.px2-modal').off('keydown.px2-modal');
		$start.off('keydown.px2-modal');
		$end.off('keydown.px2-modal');
		$title.off('keydown.px2-modal');


		$target
			.on('click.px2-modal', function(e){
				e.preventDefault();
				e.stopPropagation();
				$title.focus();
				return false;
			})
		;
		if( !isLocked ){
			// --------------------------------------
			// 基本動作
			$modalFrame
				.on('click.px2-modal', function(e){
					e.stopPropagation();
				})
				.on('keydown.px2-modal', function(e){
					if (e.keyCode == 9 ) {
						e.stopPropagation();
					}
				})
			;
			$tabTargets
				.css({
					'pointer-events': '',
				})
			;

			$start
				.on('keydown.px2-modal', function(e){
					if (e.keyCode == 9 && e.originalEvent.shiftKey) {
						$end.focus();
						e.preventDefault();
						e.stopPropagation();
						return false;
					}
				})
			;
			$end
				.on('keydown.px2-modal', function(e){
					if (e.keyCode == 9 && !e.originalEvent.shiftKey) {
						$start.focus();
						e.preventDefault();
						e.stopPropagation();
						return false;
					}
				})
			;
			$title
				.on('keydown.px2-modal', function(e){
					if (e.keyCode == 9 ) {
						$start.focus();
						e.preventDefault();
						e.stopPropagation();
						return false;
					}
				})
				.focus()
			;

		}else{
			// --------------------------------------
			// フォームロックされている場合
			$modalFrame
				.on('click.px2-modal', function(e){
					e.preventDefault();
					e.stopPropagation();
					$title.focus();
					return false;
				})
				.on('keydown.px2-modal', function(e){
					if (e.keyCode == 9 ) {
						e.preventDefault();
						e.stopPropagation();
						$title.focus();
						return false;
					}
				})
			;
			$tabTargets
				.css({
					'pointer-events': 'none',
				})
			;

			$title
				.on('keydown.px2-modal', function(e){
					if (e.keyCode == 9 ) {
						e.preventDefault();
						e.stopPropagation();
						return false;
					}
				})
				.focus()
			;
		}
	}

	/**
	 * モーダルの重なりを考慮したスタイリングの調整
	 */
	function optimizeOverlappingModalStyles(){
		for(var i = 0; i < modalLayers.length; i ++){
			if( modalLayers.length == i + 1 ){
				modalLayers[i].$modal.removeClass('px2-modal--background');
			}else{
				modalLayers[i].$modal.addClass('px2-modal--background');
			}
		}
	}
})();
