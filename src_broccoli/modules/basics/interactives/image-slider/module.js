(function(){
	if( !window.px2style ){
		return;
	}

	const $ = require('jquery');
	const KeenSlider = require('keen-slider').default;
	const prefix = 'px2-image-slider';
	const dataPrefix = 'data-px2-slider';

	window.px2style.registerInitFunction(`${prefix}`, function(){
		const $imageSlider = $(`.${prefix}`);
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
		const $slideNumber = $module.find(`.${prefix}__slide-number`);
		const $sliderContainer = $module.find(`.${prefix}__container`);

		const isLoop = !!$module.hasClass(`${prefix}--is-loop`);

		const $slides = $sliderContainer.find(`>li`);
		if( !$slides.length ){
			$sliderContainer.append(`<li><div class="${prefix}__no-image">NO IMAGE</div></li>`);
		}

		$slides.addClass(`${prefix}__slide`);

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
					updateSlideCondition(slide);
				},
				created: () => {
				},
			}
		);
		$module.data('slider', slider);
		$module.find(`.${prefix}__btn-prev`).on('click', function(event){
			slider.prev();
		});
		$module.find(`.${prefix}__btn-next`).on('click', function(event){
			slider.next();
		});

		$module.find(`[${dataPrefix}-rel="caption-link"] a`).closest(`.${prefix}__slide`)
			.addClass(`${prefix}__slide--clickable`)
			.on('click', function(event){
				event.stopPropagation();
				event.preventDefault();
				const $link = $(this).find(`[${dataPrefix}-rel="caption-link"] a`);
				window.open($link.prop('href'), $link.prop('target') || '_self');
			});

		function updateSlideCondition(slide) {
			const currentSlide = slide.track.details.rel;
			const totalSlides = slide.slides.length;
			const content = `${currentSlide % totalSlides + 1} / ${totalSlides}`;
			$slideNumber.text(content);

			if( !isLoop ){
				const $btnPrev = $module.find(`.${prefix}__btn-prev`);
				const $btnNext = $module.find(`.${prefix}__btn-next`);
				$btnPrev.prop('disabled', true);
				$btnNext.prop('disabled', true);
				if( currentSlide > 0 ){
					$btnPrev.prop('disabled', false);
				}
				if( currentSlide + 1 < totalSlides ){
					$btnNext.prop('disabled', false);
				}
			}

			slider.slides.forEach((slide, idx) => {
				if (idx === slider.track.details.rel) {
					slide.classList.remove(`${prefix}__slide--inactive`);
				} else {
					slide.classList.add(`${prefix}__slide--inactive`);
				}
			});
		}

		slider.emit('slideChanged');
	}
})();
