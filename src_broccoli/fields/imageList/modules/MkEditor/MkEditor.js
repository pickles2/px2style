/**
 * mkEditor
 */
module.exports = function(broccoli, _resMgr, _imgDummy){
	const $ = require('jquery');
	const it79 = require('iterate79');
	const utils79 = require('utils79');
	const urlParse = require('url-parse');
	const md5 = require('md5');

	const KeenSlider = require('keen-slider').default;

	const SlideEditor = require('./SlideEditor.js');

	/**
	 * エディタUIを生成
	 */
	this.mkEditor = async function( mod, data, elm, callback ){
		const _this = this;

		const $rtn = $(broccoli.bindTwig(
			require('-!text-loader!./templates/mkEditor.twig'),
			{
				broccoli: broccoli,
				mod: mod,
				lb: broccoli.lb,
				fncTypeOf: function(val){
					return typeof(val);
				},
			}
		));

		const $slider = $rtn.find('.broccoli-module-px2style-image-list__slider');
		$(elm).html($rtn);

		const keenslider = new KeenSlider(
			$slider.get(0),
			{
				loop: false,
				mode: "free",
				selector: ".broccoli-module-px2style-image-list__slider-slide",
				slides: {
					perView: "auto",
				},
				created: () => {
					console.log('Keen slider: created');
				},
			},
			[
				// add plugins here
			]
		);

		/**
		 * スライドを作成する
		 */
		async function mkSlide(item, resourceInfo){
			return new Promise((resolve, reject)=>{
				const $slideRow = $(broccoli.bindTwig(
					require('-!text-loader!./templates/mkEditor_slideRow.twig'),
					{
						broccoli: broccoli,
						mod: mod,
						item: item ,
						resourceInfo: resourceInfo,
						lb: broccoli.lb,
						dummyImage: _imgDummy,
						fncTypeOf: function(val){
							return typeof(val);
						},
					}
				));

				$slideRow.find('.broccoli-module-px2style-image-list__slider-btn-edit-slide')
					.on('click', function(event){
						const $btn = $(this);
						const $li = $btn.closest('.broccoli-module-px2style-image-list__slider-slide');
						const slideEditor = new SlideEditor(broccoli, mod, _resMgr, _imgDummy);
						slideEditor.openSlideEditor({
							path: $li.attr('data-path'),
							resKey: $li.attr('data-res-key'),
							resType: $li.attr('data-res-type'),
							webUrl: $li.attr('data-web-url'),
						}, function(data, resInfo){
							console.log('=-=-=-=-=-= result data:', data, resInfo); // TODO: 受け取った値をスライドに保存する
						});
					});

				$slideRow.find('.broccoli-module-px2style-image-list__slider-btn-delete-slide')
					.on('click', function(event){
						const $btn = $(this);
						const $li = $btn.closest('.broccoli-module-px2style-image-list__slider-slide');
						$li.remove();
						keenslider.update();
					});
				resolve($slideRow);
			});
		}

		new Promise((resolve, reject)=>{

			it79.ary(
				data.slides,
				function(it, item, index){
					_resMgr.getResource( item.resKey, async function(resourceInfo){
						const $slideRow = await mkSlide(item, resourceInfo);
						$slider.find('.broccoli-module-px2style-image-list__slider-slide:last-child').before($slideRow);
						it.next();
					});
				},
				function(){
					$slider.find('.broccoli-module-px2style-image-list__slider-btn-add')
						.on('click', async function(event){
							const $btn = $(this);
							const $li = $btn.closest('.broccoli-module-px2style-image-list__slider-slide');
							const $slideRow = await mkSlide({
                                "resKey": "",
                                "path": "about:blank",
                                "resType": "",
                                "webUrl": ""
							}, {});

							switch($btn.attr('data-trig')){
								case 'slide-suppend':
									$li.after($slideRow);
									break;
								case 'slide-append':
									$li.before($slideRow);
									break;
							}
							keenslider.update();
						});
					resolve();
				}
			);

		}).then(()=>{
			return new Promise((resolve, reject)=>{
				setTimeout(()=>{
					keenslider.update();
					resolve();
				}, 10);
			});
		}).then(()=>{
			callback();
		});
		return;
	}

}
