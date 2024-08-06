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
            const $container = $module.find('.px2-image-slider__container');
            $container.find('>li').addClass('px2-image-slider__slide');

            const slider = new KeenSlider(
                $container.get(0),
                {
                    loop: true,
                    selector: "li",
                    slides: {
                        origin: "center",
                        perView: "auto",
                    },
                    created: () => {
                        console.log('created')
                    },
                },
                [
                    // add plugins here
                ]
            );
            $module.find('.px2-image-slider__btn-prev').on('click', function(event){
                slider.prev();
            });
            $module.find('.px2-image-slider__btn-next').on('click', function(event){
                slider.next();
            });
        });
	});

})();
