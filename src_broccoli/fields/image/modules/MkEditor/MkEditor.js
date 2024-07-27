/**
 * mkEditor
 */
module.exports = function(broccoli, _resMgr, _imgDummy){
	const $ = require('jquery');
	const it79 = require('iterate79');
	const utils79 = require('utils79');
	const urlParse = require('url-parse');
	const md5 = require('md5');
	const ImageResizer = require('../ImageResizer.js');
	const imageResizer = new ImageResizer();

	/**
	 * エディタUIを生成
	 */
	this.mkEditor = function( mod, data, elm, callback ){
		const _this = this;

		const $rtn = $(broccoli.bindTwig(
			require('-!text-loader!./templates/mkEditor.twig'),
			{
				broccoli: broccoli,
				mod: mod,
				data: data,
				lb: broccoli.lb,
				fncTypeOf: function(val){
					return typeof(val);
				},
			}
		));

		const $uiImageResource = $rtn.find('.broccoli-module-px2style-image__ui-image-resource');
		const $uiWebResource = $rtn.find('.broccoli-module-px2style-image__ui-web-resource');
		const $uiNoImage = $rtn.find('.broccoli-module-px2style-image__ui-no-image');
		const $imagePreviewArea = $rtn.find('.broccoli-module-px2style-image__image-preview-area');
		const $img = $rtn.find('.broccoli-module-px2style-image__image-preview');
		const $imgNotImage = $rtn.find('.broccoli-module-px2style-image__no-image-preview');
		const $inputImageName = $rtn.find('input[name='+mod.name+'-publicFilename]');

		const $displayExtension = $rtn.find('.broccoli-module-px2style-image__ui-image-resource-display-extension');
		const $inputWebUrl = $rtn.find('input.px2-input[name="'+mod.name+'-webUrl"]');
		const $fileNameDisplay = $rtn.find('.broccoli-module-px2style-image__file-name-display');

		const confFilenameAutoSetter = mod.filenameAutoSetter || 'ifEmpty';

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
						if( !mod.format ){
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
							mod.format || {},
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
						var mimeType = (mod.format && mod.format.mimeType ? mod.format.mimeType : fileInfo.type);
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
				fileSrc = _imgDummy;
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

		_resMgr.getResource( data.resKey, function(res){
			if(res.ext){
				$displayExtension.text( '.'+res.ext );
			}
			var path = 'data:'+res.type+';base64,' + res.base64;
			if( !res.base64 ){
				// ↓ ダミーの Sample Image
				path = _imgDummy;
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

			$img.attr({
				"src": path ,
				"data-size": res.size ,
				"data-extension": res.ext,
				"data-mime-type": res.type,
				"data-base64": res.base64,
				"data-is-updated": 'no'
			});
			$imgNotImage.hide();

			setImagePreview({
				'src': path,
				'size': res.size,
				'ext': res.ext,
				'mimeType': res.type,
				'base64': res.base64,
			});

			$uiImageResource.find('input[type=file][name='+mod.name+']')
				.on('change', function(e){
					var fileInfo = e.target.files[0];
					var realpathSelected = $(this).val();

					if( realpathSelected ){
						applyFile(fileInfo);
					}
				});

			$uiImageResource.find('.broccoli-module-px2style-image__trg-get-image-from-url')
				.on('click', function(){
					var url = prompt('指定のURLから画像ファイルを取得して保存します。'+"\n"+'画像ファイルのURLを入力してください。');
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

			$uiImageResource.find('.broccoli-module-px2style-image__trg-save-file-as')
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

			$(elm).html($rtn);
			refleshSelectedResourceType();
		} );

		new Promise(function(rlv){rlv();}).then(function(){ return new Promise(function(rlv, rjt){
			callback();
		}); });
		return;
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
}
