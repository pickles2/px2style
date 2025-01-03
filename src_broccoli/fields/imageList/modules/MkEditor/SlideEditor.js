/**
 * mkEditor
 */
module.exports = function(broccoli, mod, imgDummy, lb){
	const $ = require('jquery');
	const it79 = require('iterate79');
	const utils79 = require('utils79');
	const urlParse = require('url-parse');
	const md5 = require('md5');

	const ImageResizer = require('../../../_shared/ImageResizer.js');
	const imageResizer = new ImageResizer();


	/**
	 * エディタを開く
	 */
	this.openSlideEditor = async function(presetData, callback){
		let data = presetData.data;
		const res = presetData.resourceInfo;
		if( typeof(data) !== typeof({}) ){ data = {}; }
		if( typeof(data.resKey) !== typeof('') ){
			data.resKey = '';
		}
		if( typeof(data.resType) !== typeof('') ){
			data.resType = '';
		}
		if( typeof(data.webUrl) !== typeof('') ){
			data.webUrl = '';
		}

		const $rtn = $(broccoli.bindTwig(
			require('-!text-loader!./templates/mkEditor_slideEdit.twig'),
			{
				broccoli: broccoli,
				mod: mod,
				data: data,
				res: res,
				lb: lb,
				fncTypeOf: function(val){
					return typeof(val);
				},
			}
		));

		const $uiImageResource = $rtn.find('.broccoli-module-px2style-image-list__ui-image-resource');
		const $uiWebResource = $rtn.find('.broccoli-module-px2style-image-list__ui-web-resource');
		const $uiNoImage = $rtn.find('.broccoli-module-px2style-image-list__ui-no-image');
		const $imagePreviewArea = $rtn.find('.broccoli-module-px2style-image-list__image-preview-area');
		const $img = $rtn.find('.broccoli-module-px2style-image-list__image-preview');
		const $imgNotImage = $rtn.find('.broccoli-module-px2style-image-list__no-image-preview');
		const $inputImageName = $rtn.find('input[name='+mod.name+'-publicFilename]');

		const $displayExtension = $rtn.find('.broccoli-module-px2style-image-list__ui-image-resource-display-extension');
		const $inputWebUrl = $rtn.find('input.px2-input[name="'+mod.name+'-webUrl"]');
		const $fileNameDisplay = $rtn.find('.broccoli-module-px2style-image-list__file-name-display');

		/**
		 * ファイル名自動設定の設定
		 * - `random` : ランダムなファイル名を生成する (デフォルト)
		 * - `always` : 選択したファイル名でファイル名を更新する
		 * - `ifEmpty` : 画像名が空の場合のみ、選択したファイル名でファイル名を更新する
		 * @type {string}
		 */
		const confFilenameAutoSetter = mod.filenameAutoSetter || 'random';

		/**
		 * 画像のフォーマット変換設定
		 * - Boolean `false` または String `pass` : フォーマット変換を行わない
		 * - `{object}` : フォーマット変換の設定
		 *  - `maxWidth` : 最大幅
		 *  - `maxHeight` : 最大高さ
		 *  - `mimeType` : MIME Type
		 *  - `quality` : 画質
		 * @type {object}
		 */
		const confFormat = (function(){
			if( mod.format === false || mod.format === 'pass' ){
				return false;
			}
			return mod.format || {
				maxWidth: 1600,
				maxHeight: 1600,
				mimeType: 'image/webp',
				quality: 0.5,
			};
		})();

		/**
		 * リソースタイプの選択を反映する
		 */
		function refleshSelectedResourceType(){
			var val = $rtn.find('[name='+mod.name+'-resourceType]:checked').val();
			$uiWebResource.hide();
			$uiNoImage.hide();
			$uiImageResource.hide();
			if(val == 'web'){
				$uiWebResource.show();
			}else if(val == 'none'){
				$uiNoImage.show();
			}else{
				$uiImageResource.show();
			}
		}

		/**
		 * fileAPIからファイルを取り出して反映する
		 */
		function applyFile(fileInfo){
			function readSelectedLocalFile(fileInfo, callback){
				var reader = new FileReader();
				reader.onload = function(evt) {
					callback( evt.target.result );
				}
				reader.readAsDataURL(fileInfo);
			}

			// 画像名をセット
			if( confFilenameAutoSetter == 'random' ){
				// 自動的に生成したファイル名を適用する
				var fname = generateRandomFileName();
				$inputImageName.val(fname);
			}else{
				// アップした画像名から取得する
				// ただし、 `mod.filenameAutoSetter` オプションが `ifEmpty` で、
				// かつ既に名前がセットされている場合は更新しない。
				// `mod.filenameAutoSetter` オプションが `always` の場合、画像を選択し直すたびに更新する。
				if( !$inputImageName.val() || confFilenameAutoSetter == 'always' ){
					var fname = fileInfo.name;
					fname = fname.replace(/\.[a-zA-Z0-9]*$/, '');
					fname = fname.split(/[^0-9a-zA-Z\-\_\.]/).join('_');
					$inputImageName.val(fname);
				}
			}

			// mod.filename
			readSelectedLocalFile(fileInfo, function(dataUri){
				var fileSize = fileInfo.size;
				var fileExt = getExtension( fileInfo.name );
				it79.fnc({}, [
					function(it){
						if( !confFormat ){
							// formatオプションの指定がなければ、
							// リサイズを通さずそのまま使う
							it.next();
							return;
						}
						if( fileInfo.type == 'image/gif' ){
							// 元画像が GIF の場合はそのまま使う
							// (アニメーションGIFだった場合に、スライドが失われるため)
							it.next();
							return;
						}

						imageResizer.resizeImage(
							dataUri,
							confFormat,
							function(result){
								dataUri = result.dataUri;
								fileSize = result.size;
								fileExt = result.ext;
								it.next();
							}
						);
					},
					function(it){
						$displayExtension.text('.'+fileExt);
						var mimeType = (confFormat && confFormat.mimeType ? confFormat.mimeType : fileInfo.type);
						setImagePreview({
							'src': dataUri,
							'size': fileSize,
							'ext': fileExt,
							'mimeType': mimeType,
							'base64': (function(dataUri){
								dataUri = dataUri.replace(new RegExp('^data\\:[^\\;]*\\;base64\\,'), '');
								return dataUri;
							})(dataUri),
						});
						it.next();
					},
				]);
			});
		}

		/**
		 * 画像プレビューを更新する
		 */
		function setImagePreview(fileInfo){
			var fileSrc = fileInfo.src;
			var fileMimeType = fileInfo.mimeType;
			if( !fileInfo.src || !fileInfo.ext || !fileInfo.size){
				fileSrc = imgDummy();
				fileMimeType = 'image/png';
			}
			$img
				.attr({
					"src": fileSrc ,
					"data-size": fileInfo.size ,
					"data-extension": fileInfo.ext,
					"data-mime-type": fileMimeType ,
					"data-base64": fileInfo.base64,
					"data-is-updated": 'yes'
				})
			;
			$imgNotImage.text( fileInfo.ext );
			if( canPreviewAsImage(fileMimeType, fileInfo.ext) ){
				$img.show();
				$imgNotImage.hide();
			}else{
				$img.hide();
				$imgNotImage.show();
			}
			return;
		}

		return new Promise((resolve, reject)=>{
			let data = false;
			let resInfo = false;
			const $modal = px2style.modal({
				"title": lb.get('ui_label.edit_slide'),
				"body": $rtn,
				"buttons": [
					$('<button type="submit" class="px2-btn px2-btn--primary"></button>')
						.text(lb.get('ui_label.save')),
				],
				"form": {
					"action": "javascript:void(0);",
					"method": "post",
					"submit": function(e){
						e.preventDefault();
						validateEditorContent( $rtn, function(errorMsgs){
							if( errorMsgs.length ){
								alert('入力エラーがあります。');
								return;
							}
							saveEditorContent( $rtn, function(_data, _resInfo){
								data = _data;
								resInfo = _resInfo;
								$modal.close();
							} );
						} );
					},
				},
				"width": 650,
				"onclose": function(){
					callback(data, resInfo);
				},
			});
			resolve();
		}).then(()=>{
			return new Promise((resolve, reject)=>{
				if(res.ext){
					$displayExtension.text( '.'+res.ext );
				}
				var path = 'data:'+res.type+';base64,' + res.base64;
				if( !res.base64 ){
					// ↓ ダミーの Sample Image
					path = imgDummy();
				}

				$rtn.find('input[type=radio][name='+mod.name+'-resourceType]')
					.on('change', refleshSelectedResourceType);

				$imagePreviewArea
					.on('paste', function(e){
						var items = e.originalEvent.clipboardData.items;
						for (var i = 0 ; i < items.length ; i++) {
							var item = items[i];
							if(item.type.indexOf("image") != -1){
								var file = item.getAsFile();
								file.name = file.name||'clipboard.'+(function(type){
									if(type.match(/png$/i)){return 'png';}
									if(type.match(/gif$/i)){return 'gif';}
									if(type.match(/(?:jpeg|jpg|jpe)$/i)){return 'jpg';}
									if(type.match(/webp$/i)){return 'webp';}
									if(type.match(/svg/i)){return 'svg';}
									return 'txt';
								})(file.type);
								applyFile(file);
							}
						}
					})
					.on('focus', function(e){
						$(this).css({'background': '#eee'});
					})
					.on('blur', function(e){
						$(this).css({'background': '#fff'});
					})
					.on('dragleave', function(e){
						e.stopPropagation();
						e.preventDefault();
						$(this).css({'background': '#fff'});
					})
					.on('dragover', function(e){
						e.stopPropagation();
						e.preventDefault();
						$(this).css({'background': '#eee'});
					})
					.on('drop', function(e){
						e.stopPropagation();
						e.preventDefault();
						var event = e.originalEvent;
						var fileInfo = event.dataTransfer.files[0];
						applyFile(fileInfo);
					});

				setImagePreview({
					'src': path,
					'size': res.size,
					'ext': res.ext,
					'mimeType': res.type,
					'base64': res.base64,
				});

				$img.attr({
					"data-is-updated": 'no'
				});

				$uiImageResource.find('input[type=file][name='+mod.name+']')
					.on('change', function(e){
						var fileInfo = e.target.files[0];
						var realpathSelected = $(this).val();

						if( realpathSelected ){
							applyFile(fileInfo);
						}
					});

				$uiImageResource.find('.broccoli-module-px2style-image-list__trg-get-image-from-url')
					.on('click', function(){
						var url = prompt(lb.get('ui_message.get_from_url'));
						if( !url ){
							return;
						}
						var params = {
							'url': url
						}
						_this.callGpi(
							{
								'api': 'getImageByUrl',
								'data': params
							} ,
							function(result){
								var dataUri = 'data:'+result.responseHeaders['content-type']+';base64,' + result.base64;
								switch(result.status){
									case 200:
									case 301:
									case 302:
									case 304:
										// 成功
										break;
									case 404:
										alert('画像が見つかりません。 ('+result.status+')');
										return; // この場合は反映させない
										break;
									case 400:
									case 405:
										alert('不正なリクエストです。 ('+result.status+')');
										return; // この場合は反映させない
										break;
									case 401:
									case 402:
									case 403:
										alert('アクセスが許可されていません。 ('+result.status+')');
										return; // この場合は反映させない
										break;
									case 0:
										// おそらくURLの形式としてリクエストできない値が送られた。
										alert('画像の取得に失敗しました。 ('+result.status+')');
										return; // この場合は反映させない
										break;
									default:
										alert('画像の取得に失敗しました。 ('+result.status+')');
										// とれたデータが画像ではないとも限らないので、
										// 失敗を伝えるが、反映はしてみることにする。
										break;
								}

								setImagePreview({
									'src': dataUri,
									'size': result.responseHeaders['content-length'],
									'ext': getExtension( params.url ),
									'mimeType': result.responseHeaders['content-type'],
									'base64': (function(dataUri){
										dataUri = dataUri.replace(new RegExp('^data\\:[^\\;]*\\;base64\\,'), '');
										return dataUri;
									})(dataUri),
								});

								if( !$inputImageName.val() ){
									// アップした画像名をプリセット
									// ただし、既に名前がセットされている場合は変更しない
									var fname = utils79.basename( params.url );
									fname = fname.replace(new RegExp('\\.[a-zA-Z0-9]*$'), '');
									$inputImageName.val(fname);
								}

								return;
							}
						);
					});

				$uiImageResource.find('.broccoli-module-px2style-image-list__trg-save-file-as')
					.on('click', function(){
						var base64 = $img.attr('data-base64');
						var ext = $img.attr('data-extension');
						if( !base64 || !ext ){
							alert( broccoli.lb.get('ui_message.file_is_not_set') );
							return;
						}
						var anchor = document.createElement("a");
						anchor.href = 'data:application/octet-stream;base64,'+base64;
						anchor.download = "bin."+ext;
						anchor.click();
						return;
					});

				if( confFilenameAutoSetter == 'random' ){
					$fileNameDisplay.css({'display': 'none'});
				}

				refleshSelectedResourceType();

				resolve();
			});
		}).then(()=>{
			return new Promise((resolve, reject)=>{
				resolve();
			});
		});
	}

	/**
	 * パスから拡張子を取り出して返す
	 */
	function getExtension(path){
		var ext = '';
		try {
			var ext = path.replace( new RegExp('^.*?\.([a-zA-Z0-9\_\-]+)$'), '$1' );
			ext = ext.toLowerCase();
		} catch (e) {
			ext = false;
		}
		return ext;
	}

	/**
	 * ランダムなファイル名を自動生成する
	 */
	function generateRandomFileName(){
		// Dateオブジェクトを作成
		var date = new Date();

		// UNIXタイムスタンプを取得する (ミリ秒単位)
		var a = date.getTime();

		var S = "abcdefghijklmnopqrstuvwxyz0123456789";
		var N = 16;
		var randomFileName = Array.from(
			crypto
				.getRandomValues(new Uint16Array(N)))
				.map(function(n){
					return S[n%S.length];
				})
				.join('')
		;
		randomFileName += '-' + md5(a);
		return randomFileName;
	}

	/**
	 * 画像としてプレビューできる種類か評価する
	 */
	function canPreviewAsImage(mimetype, ext){
		if( mimetype ){
			if( mimetype.match(/^image\//) ){
				return true;
			}
		}else if( ext ){
			switch( ext ){
				case 'jpg':
				case 'jpeg':
				case 'jpe':
				case 'png':
				case 'gif':
				case 'webp':
					return true;
					break;
			}
		}
		return false;
	}

	/**
	 * エディタUIで編集した内容をバリデーションする
	 */
	function validateEditorContent( $dom, callback ){
		var errorMsgs = [];
		var $img = $dom.find('img');
		var resType = $dom.find('[name='+mod.name+'-resourceType]:checked').val();
		var webUrl = $dom.find('[name='+mod.name+'-webUrl]').val();
		var rules = mod.validate || [];
		if(typeof(rules) == typeof('')){rules = [rules];}
		var rulesIsRequired = false;
		var rulesMaxHeight = null;
		var rulesMinHeight = 0;
		var rulesMaxWidth = null;
		var rulesMinWidth = 0;
		var rulesMaxFileSize = null;
		var rulesMinFileSize = 0;
		for(var idx in rules){
			if(rules[idx] == 'required'){
				rulesIsRequired = true;
			}else if(rules[idx].match(/^max\-height\:([0-9]*)?$/)){
				rulesMaxHeight = Number(RegExp.$1);
			}else if(rules[idx].match(/^min\-height\:([0-9]*)?$/)){
				rulesMinHeight = Number(RegExp.$1);
			}else if(rules[idx].match(/^max\-width\:([0-9]*)?$/)){
				rulesMaxWidth = Number(RegExp.$1);
			}else if(rules[idx].match(/^min\-width\:([0-9]*)?$/)){
				rulesMinWidth = Number(RegExp.$1);
			}else if(rules[idx].match(/^max\-filesize\:([0-9]*)?$/)){
				rulesMaxFileSize = Number(RegExp.$1);
			}else if(rules[idx].match(/^min\-filesize\:([0-9]*)?$/)){
				rulesMinFileSize = Number(RegExp.$1);
			}
		}

		new Promise(function(rlv){rlv();})
			.then(function(){ return new Promise(function(rlv, rjt){
				// Validate required
				var msgRequired = '画像を必ず選択してください。';
				if(rulesIsRequired){
					if(resType == 'none'){
						errorMsgs.push(msgRequired);
					}else if(resType == 'web'){
						if(!webUrl){
							errorMsgs.push(msgRequired);
						}
					}else{
						if($img.get(0).src == imgDummy()){
							errorMsgs.push(msgRequired);
						}
					}
				}
				rlv();
			}); })
			.then(function(){ return new Promise(function(rlv, rjt){
				// Validate image src
				if(!$img.get(0)){
					errorMsgs.push('[FATAL] イメージを取得できませんでした。');
					rlv();
					return;
				}
				if(resType == 'none' || resType == 'web'){
					// 画像を登録しない場合、またはURL指定の場合は、画像の内容をバリデートできない。
					rlv();
					return;
				}

				var nH, nW;
				var filesize = Number($img.attr('data-size'));
				nH = $img.get(0).naturalHeight;
				nW = $img.get(0).naturalWidth;

				if( rulesMaxHeight && nH > rulesMaxHeight ){
					errorMsgs.push('高さが '+rulesMaxHeight+'px より小さい画像を選択してください。');
				}
				if( rulesMinHeight && nH < rulesMinHeight ){
					errorMsgs.push('高さが '+rulesMinHeight+'px より大きい画像を選択してください。');
				}
				if( rulesMaxWidth && nW > rulesMaxWidth ){
					errorMsgs.push('幅が '+rulesMaxWidth+'px より小さい画像を選択してください。');
				}
				if( rulesMinWidth && nW < rulesMinWidth ){
					errorMsgs.push('幅が '+rulesMinWidth+'px より大きい画像を選択してください。');
				}
				if( rulesMaxFileSize && filesize > rulesMaxFileSize ){
					errorMsgs.push('ファイルサイズが '+rulesMaxFileSize+'バイト より小さい画像を選択してください。');
				}
				if( rulesMinFileSize && filesize < rulesMinFileSize ){
					errorMsgs.push('ファイルサイズが '+rulesMinFileSize+'バイト より大きい画像を選択してください。');
				}

				rlv();
			}); })
			.then(function(){
				callback( errorMsgs );
			})
		;
		return;
	}

	/**
	 * エディタUIで編集した内容を保存する
	 */
	function saveEditorContent( $dom, callback ){
		let data = {};

		if( typeof(data.resKey) !== typeof('') ){
			data.resKey = '';
		}
		var resInfo = {};

		it79.fnc({},
			[
				function(it1){
					data.resType = $dom.find('[name='+mod.name+'-resourceType]:checked').val();
					data.webUrl = $dom.find('[name='+mod.name+'-webUrl]').val();
					it1.next();
					return;
				},
				function(it1){
					var $img = $dom.find('img');

					resInfo.field = resInfo.field || mod.type; // フィールド名をセット
					resInfo.fieldNote = resInfo.fieldNote || {}; // <= フィールド記録欄を初期化

					if( $img.attr('data-is-updated') == 'yes' ){
						resInfo.ext = $img.attr('data-extension');
						resInfo.type = $img.attr('data-mime-type');
						resInfo.size = parseInt($img.attr('data-size'));
						resInfo.base64 = $img.attr('data-base64');
						resInfo.field = mod.type;
						resInfo.fieldNote = {}; // <= フィールド記録欄をクリア
					}
					resInfo.isPrivateMaterial = (data.resType == 'web' ? true : false);
					resInfo.publicFilename = $dom.find('input[name='+mod.name+'-publicFilename]').val();

					it1.next();
					return;

				},
				function(it1){
					data.href = $dom.find('[name='+mod.name+'-href]').val();
					data.captionTitle = $dom.find('[name='+mod.name+'-caption-title]').val();
					data.captionBody = $dom.find('[name='+mod.name+'-caption-body]').val();
					it1.next();
					return;
				},
				function(){
					callback(data, resInfo);
				},
			]
		);
		return;
	}

}
