/**
 * modal.js
 */
module.exports = function(Px2style){
	var $ = require('jquery');
	var modalLayers = [];

	/**
	 * Open modal dialog.
	 */
	Px2style.prototype.modal = function(options, callback){
		var _this = this;
		callback = callback||function(){};

		options = options||{};
		options.title = options.title||'';
		options.body = options.body||$('<div>');
		options.buttons = options.buttons||[
			$('<button type="submit" class="px2-btn px2-btn--primary">')
				.text('OK')
				.on('click', function(e){
					_this.closeModal();
				})
		];
		options.buttonsSecondary = options.buttonsSecondary||[];
		options.target = options.target||$('body');
		options.onclose = options.onclose||function(){};
		options.form = options.form||false;

		var tpl = '';
		tpl += '<div class="px2-modal">';
		if(options.form){
			tpl += '<form>';
		}
		tpl += ' <article class="px2-modal__dialog">';
		tpl += '  <div class="px2-modal__header">';
		tpl += '      <h1 class="px2-modal__title"></h1>';
		tpl += '  </div>';
		tpl += '  <div class="px2-modal__body"><div class="px2-modal__body-inner"></div></div>';
		tpl += '  <div class="px2-modal__footer"><div class="px2-modal__footer-primary"></div><div class="px2-modal__footer-secondary"></div></div>';
		tpl += '  <div class="px2-modal__close"><button></button></div>';
		tpl += ' </article>';
		if(options.form){
			tpl += '</form>';
		}
		tpl += '</div>';

		var $modal = $('<div>')
			.css({
				'display': 'flex',
				'position': 'absolute',
				'top': 0,
				'left': 0,
				'width': '100%',
				'height': '100%',
				'z-index': 1000000,
			})
		;

		var additionalClassName = this.getConfig('additionalClassName');
		if( additionalClassName ){
			$modal.addClass(additionalClassName);
		}
		$modal.append(tpl);

		if(options.form){
			$modal.find('form').attr({
				'action': options.form.action || 'javascript:;',
				'method': options.form.method || 'post'
			}).on('submit', options.form.submit || function(){
				_this.closeModal();
			});
		}

		var $title = $modal.find('.px2-modal__title');
		$title.append( options.title );

		var $closeBtn = $modal.find('.px2-modal__close button');
		$closeBtn.on('click', function(){
			_this.closeModal();
		});

		var $body = $modal.find('.px2-modal__body-inner');
		$body.append( options.body );

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

		var objModal = new classModal(_this, $modal, options);
		modalLayers.push(objModal);

		callback( objModal );

		return;
	}

	function classModal(_this, $modal, options){
		this.$modal = $modal;
		this.options = options;
		this.focusBackTo = document.activeElement;

		var isClosable = true;
		var $target = $(this.options.target);
		$target.append($modal);

		if( $target.get(0).tagName.toLowerCase() == 'body' ){
			// body に挿入する場合は、 fixed に。
			this.$modal.css({
				"position": "fixed"
			});
		}else{
			this.$modal.css({
				"height": $target.outerHeight()
			});
		}

		if( this.options.width ){
			this.$modal.find('.px2-modal__dialog').css({
				"max-width": this.options.width
			});
		}

		if(!modalLayers.length){
			$(window).on('resize.px2-modal', function(){
				onWindowResize();
			});
			$(window).on('keydown.px2-modal', function(e){
				if( e.keyCode == 27 ){ // ESC
					_this.closeModal(function(){});
				}
			});
		}

		onWindowResize();
		tabkeyControl(this.$modal);


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
		}
		this.unlock = function(){
			var $formElms = this.$modal.find('[data-px2-modal-locked]');
			$formElms
				.removeAttr('data-px2-modal-locked')
				.removeAttr('disabled')
			;
		}


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
		this.isClosable = function(){
			return isClosable;
		}

		this.close = function(callback){
			callback = callback||function(){};
			try {
				this.focusBackTo.focus();
			} catch (e) {}
			try {
				this.$modal.remove();
			} catch (e) {}
			if(!modalLayers.length){
				$(window).off('resize.px2-modal');
				$(window).off('keydown.px2-modal');
			}
			callback(true);
			this.options.onclose();
			delete(this);
		}

	}

	/**
	 * Close modal dialog.
	 */
	Px2style.prototype.closeModal = function(callback){
		// console.log('---- px2style.closeModal() ----');
		callback = callback||function(){};
		var lastModal = modalLayers.pop();
		if( !lastModal.isClosable() ){
			modalLayers.push(lastModal);
			callback(false);
			return;
		}
		lastModal.close(callback);
		lastModal = undefined;
		return;
	}

	/**
	 * Window Resize Event
	 */
	function onWindowResize(){
		// console.log('---- resize.px2-modal ----');
	}

	/**
	 * タブキーの操作を制御する
	 */
	function tabkeyControl($target){

		var $tabTargets = $target.find('a, input, textarea, select, button');
		var $start = $tabTargets.eq(0);
		var $end = $tabTargets.eq(-1);
		$start
			.on('keydown', function(e){
				if (e.keyCode == 9 && e.originalEvent.shiftKey) {
					$end.focus();
					e.preventDefault();
					e.stopPropagation();
					return false;
				}
			})
		;
		$end
			.on('keydown', function(e){
				if (e.keyCode == 9 && !e.originalEvent.shiftKey) {
					$start.focus();
					e.preventDefault();
					e.stopPropagation();
					return false;
				}
			})
		;
		$start.focus();
	}
}
