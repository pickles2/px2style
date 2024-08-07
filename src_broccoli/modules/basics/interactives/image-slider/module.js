(function(){
    if( !window.px2style ){
        return;
    }

	const $ = require('jquery');
	const KeenSlider = require('keen-slider').default;

	window.px2style.registerInitFunction('px2-image-slider', function(){
        const $imageSlider = $('.px2-image-slider');
        $imageSlider.each((index, item)=>{
            const $module = $(item);
            if( $module.data('slider') ){
                // 2重に初期化させない。
                return;
            }
            const $slideNumber = $module.find('.px2-image-slider__slide-number');
            const $container = $module.find('.px2-image-slider__container');
            $container.find('>li').addClass('px2-image-slider__slide');

            const isLoop = !!$module.hasClass('px2-image-slider--is-loop');

            const slider = new KeenSlider(
                $container.get(0),
                {
                    loop: isLoop,
                    selector: "li",
                    slides: {
                        origin: "center",
                        perView: "auto",
                        spacing: 10,
                    },
                    slideChanged: (slide) => {
                        updateSlideInfo(slide.track.details.abs, slide.slides.length);
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

            function updateSlideInfo(currentSlide, totalSlides) {
                const content = `${currentSlide%totalSlides + 1} / ${totalSlides}`;
                $slideNumber.text(content);
            }

            slider.emit('slideChanged');
        });
	});

})();
