/**
 * loading.js
 */
(function(){
	if( window.px2style.loading ){
		return;
	}

	var $ = window.px2style.$;
	var $loading,
		$message,
		$target;

	/**
	 * Open loading dialog.
	 */
	window.px2style.loading = function(options, callback){
		var _this = this;
		var additionalClassName = this.getConfig('additionalClassName');
		callback = callback||function(){};

		this.closeLoading(function(){
			options = options||{};
			options.target = options.target||$('body');

			var tpl = '';
			tpl += '<div>';
			tpl += ' <div class="px2-loading"></div>';
			tpl += '</div>';

			$loading = $(tpl);
			if( additionalClassName ){
				$loading.addClass(additionalClassName);
			}
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
				"z-index": 1010000
			});

			callback();
		});

		return;
	}

	/**
	 * Update loading message.
	 */
	window.px2style.loadingMessage = function(message){
		$message.text(message);
		return;
	}

	/**
	 * Close loading dialog.
	 */
	window.px2style.closeLoading = function(callback){
		callback = callback||function(){};
		try {
			$loading.remove();
		} catch (e) {}
		callback();
		return;
	}

})();