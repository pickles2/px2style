/**
 * loading.js
 */
module.exports = function(Px2style){
	var $ = require('jquery');
	var $loading,
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

			$target = $(options.target);
			$target.append($loading);

			if( $target.get(0).tagName.toLowerCase() == 'body' ){
				// body に挿入する場合は、 fixed に。
				$loading.css({
					"position": "fixed"
				});
			}
			$loading.css({
				"width": '100%',
				"height": '100%',
				"display": "flex",
				"justyify-content": "center",
				"align-items": "center"
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
