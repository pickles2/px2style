(function(){
    if( !window.px2style ){
        return;
    }

	const $ = require('jquery');
	const KeenSlider = require('keen-slider').default;

	window.px2style.registerInitFunction('px2-image-slider', function(){

        const slider = new KeenSlider(
            $('.px2-image-slider .keen-slider').get(0),
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
