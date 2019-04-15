/**
 * header.js
 */
module.exports = function(Px2style){
	var $ = require('jquery');
	var $header,
		$shoulderMenu,
		$shoulderMenuUl;
	var options = {};
	var Header = function(){};

	Px2style.prototype.header = new Header();

	Header.prototype.init = function(_options){
		options = _options || {};
		options.current = options.current || '';
		$header = $('.px2-header__inner');
		$shoulderMenu = $('.px2-header__shoulder-menu');

		$shoulderMenuUl = $shoulderMenu.find('ul');
		$shoulderMenu
			.css({
				'width': 50,
				'height': $header.height()
			})
			.off()
			.on('click', function(){
				if( $shoulderMenuUl.css('display') == 'block' ){
					$shoulderMenuUl.hide();
					$shoulderMenu
						.css({
							'width':50 ,
							'height':$header.height()
						})
					;
				}
			}
		);
		$shoulderMenu.find('button')
			.off()
			.on('click', function(e){
				e.stopPropagation();
				if( $shoulderMenuUl.css('display') == 'block' ){
					$shoulderMenuUl.hide();
					$shoulderMenu
						.css({
							'width':50 ,
							'height':$header.height()
						})
					;

				}else{
					$shoulderMenuUl.show().height( $(window).height()-$header.height() );
					$shoulderMenu
						.css({
							'width':'100%' ,
							'height':$(window).height()
						})
					;

				}
			})
		;



		$shoulderMenu.find('button')
			.css({
				'height': $header.outerHeight()
			})
		;
		$shoulderMenuUl.css({
			'top': $header.height() ,
			'height': $(window).height()-$header.outerHeight()
		});



		if( $shoulderMenuUl.css('display') == 'block' ){
			$shoulderMenu.css({
				width: '100%' ,
				height: $(window).height()
			});
		}else{
			$shoulderMenu
				.css({
					'height': $header.outerHeight()
				})
			;
		}

		if( options.current === '' ){
			$('.px2-header__px2logo').css({
				"width": 70,
				"height": 70
			});
		}else{
			$('.px2-header__px2logo').css({
				"width": 45,
				"height": 45
			});
		}

		$header.find('[data-name]').removeClass('current');
		$header.find('[data-name="'+options.current+'"]').addClass('current');

	}

}
