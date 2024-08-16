(function(){
	if( !window.px2style ){
		return;
	}

	const $ = require('jquery');
	const KeenSlider = require('keen-slider').default;

	window.px2style.registerInitFunction('px2-image-slider', function(){
		const $imageSlider = $('.px2-image-slider');
		$imageSlider.each((index, module)=>{
			initSlider($(module));
		});
	});

	/**
	 * スライダーを初期化する
	 * @param {*} $module 
	 * @returns 
	 */
	function initSlider($module){
		if( $module.data('slider') ){
			// 2重に初期化させない。
			return;
		}
		const $slideNumber = $module.find('.px2-image-slider__slide-number');
		const $sliderContainer = $module.find('.px2-image-slider__container');

		const isLoop = !!$module.hasClass('px2-image-slider--is-loop');

		$sliderContainer.find('>li').addClass('px2-image-slider__slide');

		const slider = new KeenSlider(
			$sliderContainer.get(0),
			{
				loop: isLoop,
				selector: "li",
				slides: {
					origin: "center",
					perView: "auto",
					spacing: 10,
				},
				slideChanged: (slide) => {
					updateSlideInfo(slide.track.details.rel, slide.slides.length);
				},
				created: () => {
				},
			}
		);
		$module.data('slider', slider);
		$module.find('.px2-image-slider__btn-prev').on('click', function(event){
			slider.prev();
		});
		$module.find('.px2-image-slider__btn-next').on('click', function(event){
			slider.next();
		});

		$module.find('[data-px2-slider-rel="caption-link"] a').closest('.px2-image-slider__slide')
			.addClass('px2-image-slider__slide--clickable')
			.on('click', function(event){
				event.stopPropagation();
				event.preventDefault();
				const $link = $(this).find('[data-px2-slider-rel="caption-link"] a');
				window.open($link.prop('href'), $link.prop('target') || '_self');
			});

		function updateSlideInfo(currentSlide, totalSlides) {
			const content = `${currentSlide%totalSlides + 1} / ${totalSlides}`;
			$slideNumber.text(content);

			if( !isLoop ){
				const $btnPrev = $module.find('.px2-image-slider__btn-prev');
				const $btnNext = $module.find('.px2-image-slider__btn-next');
				$btnPrev.prop('disabled', true);
				$btnNext.prop('disabled', true);
				if( currentSlide > 0 ){
					$btnPrev.prop('disabled', false);
				}
				if( currentSlide + 1 < totalSlides ){
					$btnNext.prop('disabled', false);
				}
			}
		}

		slider.emit('slideChanged');
	}
})();
