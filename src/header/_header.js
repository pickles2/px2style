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
	window.addEventListener('resize', function(){
		window.px2style.header.init(options);
	});

	Header.prototype.init = function(_options){
		options = _options || {};
		options.current = options.current || '';
		$header = $('.px2-header__inner');
		$shoulderMenu = $('.px2-header__shoulder-menu');

		$shoulderMenuUl = $shoulderMenu.find('>ul');
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
				'height': $header.height()
			})
		;
		$shoulderMenuUl.css({
			'top': $header.height() ,
			'height': $(window).height()-$header.height()
		});

		$shoulderMenuUl.find('*').removeClass('px2-header__shoulder-menu-group');
		$shoulderMenuUl.find('li:has(>ul)').addClass('px2-header__shoulder-menu-group')
		$shoulderMenuUl.find('li:has(>ul) > a').off().on('click', function(e){
			e.stopPropagation();
			var $ul = $(this).parent().find('>ul');
			if( $ul.css('display') == 'block' ){
				$ul.hide();
				$(this).parent().removeClass('px2-header__shoulder-menu-group-opened');
			}else{
				$ul.show();
				$(this).parent().addClass('px2-header__shoulder-menu-group-opened');
			}
		})

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
			$header.find('.px2-header__px2logo').css({
				"min-width": 70,
				"width": 70
			});
			$header.find('.px2-header__px2logo a').css({
				"width": 70,
				"height": 70
			});
		}else{
			$header.find('.px2-header__px2logo').css({
				"min-width": 45,
				"width": 45
			});
			$header.find('.px2-header__px2logo a').css({
				"width": 45,
				"height": 45
			});
		}

		$header.find('[data-name]').removeClass('current');
		$header.find('[data-name="'+options.current+'"]').addClass('current');
		$('.px2-header').css({"height":$header.outerHeight()});

	}

}
