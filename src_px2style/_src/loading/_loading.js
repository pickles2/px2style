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
			tpl += '<div class="px2-loading">';
			tpl += ' <div class="px2-loading__sign"></div>';
			tpl += '</div>';

			if( additionalClassName ){
				$loading = $('<div>')
					.addClass(additionalClassName)
					.append(tpl);
			}else{
				$loading = $(tpl);
			}

			$message = $('<div class="px2-loading__message">');

			$target = $(options.target);
			$target.append($loading);
			$loading.append($message);

			if( $target.get(0).tagName.toLowerCase() != 'body' ){
				// body に挿入する場合は、 fixed に。
				$loading.css({
					"position": "absolute",
				});
			}

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