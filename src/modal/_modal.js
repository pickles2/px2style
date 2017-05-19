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
				$('<button class="px2-btn px2-btn--primary">')
					.text('OK')
					.on('click', function(e){
						_this.closeModal();
					})
			];
			options.target = options.target||$('body');

			var tpl = '';
			tpl += '<div class="px2-modal">';
			tpl += ' <div class="px2-modal__dialog">';
			tpl += '  <div class="px2-modal__header">';
			tpl += '      <div class="px2-modal__title"></div>';
			tpl += '  </div>';
			tpl += '  <div class="px2-modal__body"><div class="px2-modal__body-inner"></div></div>';
			tpl += '  <div class="px2-modal__footer"></div>';
			tpl += ' </div>';
			tpl += '</div>';

			$modal = $(tpl);

			var $title = $modal.find('.px2-modal__title');
			$title.append( options.title );

			var $body = $modal.find('.px2-modal__body-inner');
			$body.append( options.body );

			var $footer = $modal.find('.px2-modal__footer');
			var $footerUl = $('<ul>');
			for( var i in options.buttons ){
				var $li = $('<li>').append(options.buttons[i]);
				$footerUl.append( $li );
			}
			$footer.append($footerUl);

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
		callback();
		return;
	}

	/**
	 * Window Resize Event
	 */
	$(window).on('resize', function(){
		try {
			if( $target.get(0).tagName.toLowerCase() != 'body' ){
				$modal.css({
					"height": $target.outerHeight()
				});
			}
			var $header = $modal.find('.px2-modal__header');
			var $footer = $modal.find('.px2-modal__footer');
			$modal.find('.px2-modal__body').css({
				"height": $modal.outerHeight() - $header.outerHeight() - $footer.outerHeight()
			});
		} catch (e) {}
	});
}
