/**
 * loading.js
 */
module.exports = function(Px2style){
	var $ = require('jquery');
	var $loading,
		$message,
		$target;

	/**
	 * Open loading dialog.
	 */
	Px2style.prototype.loading = function(options, callback){
		var _this = this;
		callback = callback||function(){};

		this.closeLoading(function(){
			options = options||{};
			options.target = options.target||$('body');

			var tpl = '';
			tpl += '<div>';
			tpl += ' <div class="px2-loading"></div>';
			tpl += '</div>';

			$loading = $(tpl);
			$message = $('<div>');
			$message.css({
				"clear": "both",
				"font-size": "0.8rem",
				"text-align": "center",
				"color": "#999"
			});

			$target = $(options.target);
			$target.append($loading);
			$loading.append($message);

			if( $target.get(0).tagName.toLowerCase() == 'body' ){
				// body に挿入する場合は、 fixed に。
				$loading.css({
					"position": "fixed",
					"left": 0,
					"top": 0
				});
			}
			$loading.css({
				"width": '100%',
				"height": '100%',
				"display": "flex",
				"justify-content": "center",
				"flex-direction": "column",
				"align-items": "center",
				"z-index": 1000000
			});

			$(window).on('resize.px2-loading', function(){
				onWindowResize();
			});
			onWindowResize();

			callback();
		});

		return;
	}

	/**
	 * Update loading message.
	 */
	Px2style.prototype.loadingMessage = function(message){
		$message.text(message);
		return;
	}

	/**
	 * Close loading dialog.
	 */
	Px2style.prototype.closeLoading = function(callback){
		callback = callback||function(){};
		try {
			$loading.remove();
		} catch (e) {}
		$(window).off('resize.px2-loading');
		callback();
		return;
	}

	/**
	 * Window Resize Event
	 */
	function onWindowResize(){
		console.log('---- resize.px2-loading ----');
	}

}
