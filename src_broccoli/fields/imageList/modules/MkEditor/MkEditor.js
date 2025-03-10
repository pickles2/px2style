/**
 * mkEditor
 */
module.exports = function(broccoli, _resMgr, imgDummy){
	const $ = require('jquery');
	const it79 = require('iterate79');

	const KeenSlider = require('keen-slider').default;

	const SlideEditor = require('./SlideEditor.js');
	let currentSlideNumber = 0;

	/**
	 * エディタUIを生成
	 */
	this.mkEditor = async function( mod, data, elm, callback, lb ){
		const _this = this;

		const $rtn = $(broccoli.bindTwig(
			require('-!text-loader!./templates/mkEditor.twig'),
			{
				broccoli: broccoli,
				mod: mod,
				lb: lb,
				fncTypeOf: function(val){
					return typeof(val);
				},
			}
		));

		const $slider = $rtn.find('.broccoli-module-px2style-image-list__slider');
		$(elm).html($rtn);

		let keenslider = initializeSlider();

		/**
		 * スライダーを初期化する
		 */
		function initializeSlider(){
			return new KeenSlider(
				$slider.get(0),
				{
					loop: false,
					// mode: "free",
					selector: ".broccoli-module-px2style-image-list__slider-slide",
					slides: {
						origin: "center",
						perView: "auto",
						spacing: 10,
					},
					initial: currentSlideNumber,
					slideChanged: (slide) => {
						currentSlideNumber = slide.track.details.rel;
						updateSlideCtrlStatus(slide.track.details.rel, slide.slides.length);
					},
					created: () => {
					},
				},
				[]
			);
		}

		/**
		 * スライダーを更新する
		 */
		function sliderUpdate(){
			keenslider.update();
			return;
		}

		/**
		 * スライダーの状態を更新する
		 */
		function updateSlideCtrlStatus(currentSlide, totalSlides) {
			const $btnPrev = $rtn.find('.broccoli-module-px2style-image-list__slider-btn-prev');
			const $btnNext = $rtn.find('.broccoli-module-px2style-image-list__slider-btn-next');
			const $slides = $slider.find('> li');

			$btnPrev.prop('disabled', false);
			$btnNext.prop('disabled', false);

			if($slides.length){
				$slides.find('.broccoli-module-px2style-image-list__slider-btn-move-slide-prev').prop('disabled', false);
				$slides.find('.broccoli-module-px2style-image-list__slider-btn-move-slide-next').prop('disabled', false);
				$slides.eq(0).find('.broccoli-module-px2style-image-list__slider-btn-move-slide-prev').prop('disabled', true);
				$slides.eq($slides.length-1).find('.broccoli-module-px2style-image-list__slider-btn-move-slide-next').prop('disabled', true);
			}

			if(currentSlide <= 0){
				$btnPrev.prop('disabled', true);
			}
			if(currentSlide+1 >= totalSlides){
				$btnNext.prop('disabled', true);
			}
		}

		/**
		 * スライドを作成する
		 */
		async function mkSlide(item, resourceInfo){
			return new Promise(async (resolve, reject)=>{
				const $slideRow = $(broccoli.bindTwig(
					require('-!text-loader!./templates/mkEditor_slideRow.twig'),
					{
						broccoli: broccoli,
						mod: mod,
						item: item,
						resourceInfo: resourceInfo,
						lb: lb,
						dummyImage: imgDummy(),
						fncTypeOf: function(val){
							return typeof(val);
						},
					}
				));

				const $slideRowCaption = await mkSlideCaption(item);
				if( $slideRowCaption.length ){
					$slideRow.find('[data-px2-image-list-rel="caption"]').html('').append($slideRowCaption).show();
				}else{
					$slideRow.find('[data-px2-image-list-rel="caption"]').html('').hide();
				}

				const $btnSlide = $slideRow.find('.broccoli-module-px2style-image-list__slider-btn-slide');
				const $btnEditSlide = $slideRow.find('.broccoli-module-px2style-image-list__slider-btn-edit-slide');
				$btnSlide
					.on('click', function(event){
						$(this).closest('.broccoli-module-px2style-image-list__slider-slide').find('.broccoli-module-px2style-image-list__slider-btn-edit-slide').trigger('click');
					});

				$btnEditSlide
					.on('click', function(event){
						const $btn = $(this);
						$btn.prop('disabled', true);
						$btnSlide.prop('disabled', true);
						const $li = $btn.closest('.broccoli-module-px2style-image-list__slider-slide');
						const $img = $li.find('img');
						const slideEditor = new SlideEditor(broccoli, mod, imgDummy, lb);
						slideEditor.openSlideEditor({
							data: {
								path: $li.attr('data-path'),
								resKey: $li.attr('data-res-key'),
								resType: $li.attr('data-res-type'),
								webUrl: $li.attr('data-web-url'),
								href: $li.attr('data-href'),
								captionTitle: $li.attr('data-caption-title'),
								captionBody: $li.attr('data-caption-body'),
							},
							resourceInfo: {
								type: $img.attr('data-mime-type'),
								size: $img.attr('data-size'),
								base64: $img.attr('data-base64'),
								ext: $img.attr('data-extension'),
								publicFilename: $img.attr('data-public-filename'),
							},
						}, async function(data, resInfo){
							$btn.prop('disabled', false);
							$btnSlide.prop('disabled', false);
							if( data === false ){
								return;
							}

							$li.attr('data-res-type', data.resType);
							$li.attr('data-web-url', data.webUrl);
							$li.attr('data-href', data.href);
							$li.attr('data-caption-title', data.captionTitle);
							$li.attr('data-caption-body', data.captionBody);

							if(resInfo.base64){
								$img.attr('src', (resInfo.base64 ? `data:${resInfo.type};base64,${resInfo.base64}` : `${imgDummy()}`));
								$img.attr('data-mime-type', resInfo.type);
								$img.attr('data-size', resInfo.size);
								$img.attr('data-base64', resInfo.base64);
								$img.attr('data-extension', resInfo.ext);
								$img.attr('data-is-updated', 'yes');
							}
							if($img.attr('data-public-filename') != resInfo.publicFilename){
								$img.attr('data-public-filename', resInfo.publicFilename);
								$img.attr('data-is-updated', 'yes');
							}

							const $slideRowCaption = await mkSlideCaption(data);
							if( $slideRowCaption.length ){
								$li.find('[data-px2-image-list-rel="caption"]').html('').append($slideRowCaption).show();
							}else{
								$li.find('[data-px2-image-list-rel="caption"]').html('').hide();
							}
						});
					});

				$slideRow.find('.broccoli-module-px2style-image-list__slider-btn-move-slide-prev')
					.on('click', function(event){
						const $btn = $(this);
						const $li = $btn.closest('.broccoli-module-px2style-image-list__slider-slide');
						const $prev = $li.prev();
						if( !$prev.length ){
							return;
						}
						$prev.before($li);
						keenslider.destroy();
						keenslider = initializeSlider();
						keenslider.prev();
					});

				$slideRow.find('.broccoli-module-px2style-image-list__slider-btn-move-slide-next')
					.on('click', function(event){
						const $btn = $(this);
						const $li = $btn.closest('.broccoli-module-px2style-image-list__slider-slide');
						const $next = $li.next();
						if( !$next.length ){
							return;
						}
						$next.after($li);
						keenslider.destroy();
						keenslider = initializeSlider();
						keenslider.next();
					});

				$slideRow.find('.broccoli-module-px2style-image-list__slider-btn-delete-slide')
					.on('click', function(event){
						if( !confirm(lb.get('ui_message.are_you_sure_you_want_to_delete_it')) ){
							return;
						}
						const $btn = $(this);
						const $li = $btn.closest('.broccoli-module-px2style-image-list__slider-slide');
						$li.animate({opacity: 0}, 400, function(){
							$li.remove();
							sliderUpdate();
						});
					});
				resolve($slideRow);
			});
		}

		/**
		 * スライドを作成する
		 */
		async function mkSlideCaption(item){
			return new Promise((resolve, reject)=>{
				const $slideRowCaption = $(broccoli.bindTwig(
					require('-!text-loader!./templates/mkEditor_slideRowCaption.twig'),
					{
						item: item,
					}
				));

				resolve($slideRowCaption);
			});
		}

		new Promise((resolve, reject)=>{

			it79.ary(
				data.slides,
				function(it, item, index){
					_resMgr.getResource( item.resKey, async function(resourceInfo){
						const $slideRow = await mkSlide(item, resourceInfo);
						$slider.append($slideRow);
						it.next();
					});
				},
				function(){
					$rtn.find('.broccoli-module-px2style-image-list__btn-add')
						.on('click', async function(event){
							const $btn = $(this);
							const $slideRow = await mkSlide({
                                "resKey": "",
                                "path": "about:blank",
                                "resType": "",
                                "webUrl": ""
							}, {});

							switch($btn.attr('data-trig')){
								case 'slide-prepend':
									$slider.prepend($slideRow);
									sliderUpdate();
									keenslider.moveToIdx(0);
									break;$slider
								case 'slide-append':
									$slider.append($slideRow);
									sliderUpdate();
									keenslider.moveToIdx($slider.find('>li').length - 1);
									break;
							}
						});

					$rtn.find('.broccoli-module-px2style-image-list__slider-btn-prev')
						.on('click', function(){
							keenslider.prev();
							return;
						});

					$rtn.find('.broccoli-module-px2style-image-list__slider-btn-next')
						.on('click', function(){
							keenslider.next();
							return;
						});

					resolve();
				}
			);

		}).then(()=>{
			return new Promise((resolve, reject)=>{
				setTimeout(()=>{
					updateSlideCtrlStatus(0, data.slides.length);
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
