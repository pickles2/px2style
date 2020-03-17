/**
 * modal.js
 */
module.exports = function(Px2style){
	var $ = require('jquery');
	var $modal,
		$target;

	/**
	 * Open modal dialog.
	 */
	Px2style.prototype.modal = function(options, callback){
		var _this = this;
		callback = callback||function(){};

		this.closeModal(function(){
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
			tpl += ' </article>';
			if(options.form){
				tpl += '</form>';
			}
			tpl += '</div>';

			$modal = $(tpl);

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

			$target = $(options.target);
			$target.append($modal);


			if( $target.get(0).tagName.toLowerCase() == 'body' ){
				// body に挿入する場合は、 fixed に。
				$modal.css({
					"position": "fixed"
				});
			}else{
				$modal.css({
					"height": $target.outerHeight()
				});
			}

			if( options.width ){
				$modal.find('.px2-modal__dialog').css({
					"max-width": options.width
				});
			}

			$(window).on('resize.px2-modal', function(){
				onWindowResize();
			});
			onWindowResize();

			callback();
		});

		return;
	}

	/**
	 * Close modal dialog.
	 */
	Px2style.prototype.closeModal = function(callback){
		callback = callback||function(){};
		try {
			$modal.remove();
		} catch (e) {}
		$(window).off('resize.px2-modal');
		callback();
		return;
	}

	/**
	 * Window Resize Event
	 */
	function onWindowResize(){
		console.log('---- resize.px2-modal ----');
		try {
			// if( $target.get(0).tagName.toLowerCase() != 'body' ){
			// 	$modal.css({
			// 		"height": $target.outerHeight()
			// 	});
			// }
			// var $header = $modal.find('.px2-modal__header');
			// var $footer = $modal.find('.px2-modal__footer');
			// $modal.find('.px2-modal__body').css({
			// 	"height": $modal.outerHeight() - $header.outerHeight() - $footer.outerHeight()
			// });
		} catch (e) {}
	}

}
