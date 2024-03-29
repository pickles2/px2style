/**
 * notice.js
 */
(function(){
	if( window.px2style.flashMessage ){
		return;
	}

	var $ = window.px2style.$;
	var $flashmessage,
		$target;

	/**
	 * Flash Message.
	 */
	window.px2style.flashMessage = function(message, callback){
		var _this = this;
		callback = callback||function(){};

		var options = {};
		if( typeof(message) == typeof({}) ){
			options = message;
		}else{
			options.message = message;
		}
		options.message = options.message||'';
		options.type = options.type||'';
		options.target = options.target||$('body');

		$target = options.target;

		var $notice = $('<div class="px2-notice">').append(options.message);
		if( options.type ){
			$notice.addClass('px2-notice--'+options.type);
		}

		$notice.hide();

		appendToFlashArea($notice);

		$notice
			.fadeIn('slow', function(){
				setTimeout(function(){

					$notice
						.animate({
							"font-size": 0 ,
							"opacity": 0.5 ,
							"width": '30%' ,
							"height": 0 ,
							'padding': 0,
							'margin-bottom': 0
						}, {
							duration: "slow",
							easing: "linear",
							complete: function(){
								$notice.remove();
								cleaningToFlashArea();
								callback();
							}
						})
					;

				}, 3000);
			});
		return;
	}

	function appendToFlashArea(elm){
		if( !$flashmessage ){
			$flashmessage = $('<div>');
			$flashmessage.css({
				'position': 'fixed',
				'left': 0,
				'top': 0,
				'width': '100%',
				'pointer-events': 'none',
				'padding': '5px 40px',
				'box-sizing': 'border-box',
				'z-index': 1000000
			});
			$target.append($flashmessage);
		}
		$flashmessage.append(elm);
	}

	function cleaningToFlashArea(){
		if( !$flashmessage.find('*').length ){
			$flashmessage.remove();
			$flashmessage = undefined;
		}
	}
})();
