(function(){
    if( !window.px2style ){
        return;
    }

	const $ = require('jquery');
	const KeenSlider = require('keen-slider').default;

	window.px2style.registerInitFunction('px2-image-slider', function(){
        const $container = $('.px2-image-slider .keen-slider');
        $container.find('>li').addClass('keen-slider__slide');

        const slider = new KeenSlider(
            $container.get(0),
            {
                loop: true,
                created: () => {
                    console.log('created')
                },
            },
            [
                // add plugins here
            ]
        );
	});

})();
