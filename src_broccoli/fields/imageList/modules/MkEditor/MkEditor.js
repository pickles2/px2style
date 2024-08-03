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
			[]
		);


		/**
		 * スライダーを更新する
		 */
		function sliderUpdate(){
			keenslider.update();
			return;
		}

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
						const $img = $li.find('img');
						const slideEditor = new SlideEditor(broccoli, mod, _imgDummy);
						slideEditor.openSlideEditor({
							data: {
								path: $li.attr('data-path'),
								resKey: $li.attr('data-res-key'),
								resType: $li.attr('data-res-type'),
								webUrl: $li.attr('data-web-url'),
							},
							resourceInfo: {
								type: $img.attr('data-mime-type'),
								size: $img.attr('data-size'),
								base64: $img.attr('data-base64'),
								ext: $img.attr('data-extension'),
								publicFilename: $img.attr('data-public-filename'),
							},
						}, function(data, resInfo){
							// $li.attr('data-path', data.path);
							// $li.attr('data-res-key', data.resKey);
							$li.attr('data-res-type', data.resType);
							$li.attr('data-web-url', data.webUrl);

							if(resInfo.base64){
								$img.attr('src', (resInfo.base64 ? `data:${resInfo.type};base64,${resInfo.base64}` : `${_imgDummy}`));
								$img.attr('data-mime-type', resInfo.type);
								$img.attr('data-size', resInfo.size);
								$img.attr('data-base64', resInfo.base64);
								$img.attr('data-extension', resInfo.ext);
								$img.attr('data-public-filename', resInfo.publicFilename);
								$img.attr('data-is-updated', 'yes');
							}
						});
					});

				$slideRow.find('.broccoli-module-px2style-image-list__slider-btn-move-slide-prev')
					.on('click', function(event){
						const $btn = $(this);
						const $li = $btn.closest('.broccoli-module-px2style-image-list__slider-slide');
						const $prev = $li.prev();
						if( $prev.find('.broccoli-module-px2style-image-list__slider-btn-add').length ){
							return;
						}
						$prev.before($li);
						sliderUpdate();
					});

				$slideRow.find('.broccoli-module-px2style-image-list__slider-btn-move-slide-next')
					.on('click', function(event){
						const $btn = $(this);
						const $li = $btn.closest('.broccoli-module-px2style-image-list__slider-slide');
						const $next = $li.next();
						if( $next.find('.broccoli-module-px2style-image-list__slider-btn-add').length ){
							return;
						}
						$next.after($li);
						sliderUpdate();
					});

				$slideRow.find('.broccoli-module-px2style-image-list__slider-btn-delete-slide')
					.on('click', function(event){
						const $btn = $(this);
						const $li = $btn.closest('.broccoli-module-px2style-image-list__slider-slide');
						$li.remove();
						sliderUpdate();
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
							sliderUpdate();
						});
					resolve();
				}
			);

		}).then(()=>{
			return new Promise((resolve, reject)=>{
				setTimeout(()=>{
					sliderUpdate();
					resolve();
				}, 10);
			});
		}).then(()=>{
			callback();
		});
		return;
	}

}
