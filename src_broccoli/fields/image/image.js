window.broccoliModulePx2StyleImage = function(broccoli){

	const $ = require('jquery');
	const it79 = require('iterate79');
	const _resMgr = broccoli.resourceMgr;
	const _imgDummy = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAAGQCAYAAACAvzbMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpiZTdmZmNiZS1lMTgwLTQwZGUtOTA3My1lNjk2MDk5YmYyNDkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MzlGNUUyODQ5NzU4MTFFNTg0MTBGRkY3MEQzOTdDQTQiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MzlGNUUyODM5NzU4MTFFNTg0MTBGRkY3MEQzOTdDQTQiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDphMDI5NWE5YS05YzRkLTQzNjYtYjhjOS05NWQ1MjM0ZThhNDgiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6YmU3ZmZjYmUtZTE4MC00MGRlLTkwNzMtZTY5NjA5OWJmMjQ5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';
	const Utils = require('./modules/Utils.js'),
		  utils = new Utils(broccoli);
	const MkEditor = require('./modules/MkEditor/MkEditor.js'),
		  mkEditor = new MkEditor(broccoli, _resMgr, _imgDummy);
	const MkPreviewHtml = require('./modules/MkPreviewHtml/MkPreviewHtml.js'),
		  mkPreviewHtml = new MkPreviewHtml(broccoli, _resMgr, _imgDummy);

	/**
	 * プレビュー用の簡易なHTMLを生成する
	 */
	this.mkPreviewHtml = async function( fieldData, mod, callback ){
		this.lb = await utils.createLb();
		return mkPreviewHtml.mkPreviewHtml( fieldData, mod, callback, this.lb );
	}

	/**
	 * エディタUIを生成
	 */
	this.mkEditor = async function( mod, data, elm, callback ){
		this.lb = await utils.createLb();
		return mkEditor.mkEditor( mod, data, elm, callback, this.lb );
	}

	/**
	 * データを正規化する
	 */
	this.normalizeData = function( fieldData, mode ){
		var rtn = fieldData;
		if( typeof(fieldData) !== typeof({}) ){
			rtn = {
				"resKey":'',
				"path":'about:blank',
				"resType":'',
				"webUrl":''
			};
		}
		return rtn;
	}

	/**
	 * データを複製する (Client Side)
	 */
	this.duplicateData = function( data, callback, resources ){
		data = JSON.parse( JSON.stringify( data ) );
		it79.fnc(
			data,
			[
				function(it1, data){
					_resMgr.addNewResource( resources[data.resKey], function(result){
						data.resKey = result.newResourceKey;
						data.path = result.publicPath;
						it1.next(data);
					} );
				} ,
				function(it1, data){
					callback(data);
					it1.next(data);
				}
			]
		);
		return;
	}

	/**
	 * データから使用するリソースのリソースIDを抽出する (Client Side)
	 */
	this.extractResourceId = function( data, callback ){
		callback = callback||function(){};
		resourceIdList = [];
		resourceIdList.push(data.resKey);
		new Promise(function(rlv){rlv();}).then(function(){ return new Promise(function(rlv, rjt){
			callback(resourceIdList);
		}); });
		return;
	}

	/**
	 * エディタUIで編集した内容を検証する (Client Side)
	 */
	this.validateEditorContent = function( elm, mod, callback ){
		var $dom = $(elm);
		var errorMsgs = [];
		var resourceDb = null;
		var $img = $dom.find('img');
		var resType = $dom.find('[name='+mod.name+'-resourceType]:checked').val();
		var resKey = $dom.find('[name='+mod.name+'-resKey]').val();
		var filename = $dom.find('[name='+mod.name+'-publicFilename]').val();
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
						if($img.get(0).src == _imgDummy){
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
			.then(function(){ return new Promise(function(rlv, rjt){
				_resMgr.getResourceDb(function(res){
					resourceDb = res;
					rlv();
				});
			}); })
			.then(function(){ return new Promise(function(rlv, rjt){
				var isImageUpdated = false;
				if( $img.attr('data-is-updated') == 'yes' ){
					isImageUpdated = true;
				}
				var isFilenameChanged = false;
				if( !resourceDb[resKey] || resourceDb[resKey].publicFilename !== filename ){
					isFilenameChanged = true;
				}
				for( var idx in resourceDb ){
					if( resourceDb[idx].isPrivateMaterial ){
						// 非公開リソースにファイル名は与えられない
						continue;
					}
					if( idx == resKey ){
						// 自分
						continue;
					}
					if( !isImageUpdated && !isFilenameChanged ){
						// 画像もファイル名も変更されていなければ、重複チェックをスキップ
						continue;
					}
					if( resType === '' && filename !== '' && resourceDb[idx].publicFilename == filename ){
						errorMsgs.push( broccoli.lb.get('ui_message.duplicate_image_file_name') );
						continue;
					}
				}
				rlv();
			}); })
			.then(function(){ return new Promise(function(rlv, rjt){
				callback( errorMsgs );
			}); })
		;
		return;
	}

	/**
	 * エディタUIで編集した内容を保存
	 */
	this.saveEditorContent = function( elm, data, mod, callback, options ){
		options = options || {};
		options.message = options.message || function(msg){}; // ユーザーへのメッセージテキストを送信

		var resInfo;
		var $dom = $(elm);
		if( typeof(data) !== typeof({}) || typeof(data.length) !== typeof({}.length) ){
			data = {};
		}
		if( typeof(data.resKey) !== typeof('') ){
			data.resKey = '';
		}

		it79.fnc(
			data,
			[
				function(it1, data){
					data.resType = $dom.find('[name='+mod.name+'-resourceType]:checked').val();
					data.webUrl = $dom.find('[name='+mod.name+'-webUrl]').val();
					it1.next(data);
					return;
				} ,
				function(it1, data){
					options.message( broccoli.lb.get('ui_message.initializing_resource_storage') );
					_resMgr.getResource(data.resKey, function(result){
						if( result === false ){
							_resMgr.addResource(function(newResKey){
								data.resKey = newResKey;
								it1.next(data);
							});
							return;
						}
						it1.next(data);
						return;
					});
				} ,
				function(it1, data){
					options.message( broccoli.lb.get('ui_message.initializing_resource_storage') + ' '+data.resKey);
					_resMgr.getResource(data.resKey, function(res){
						resInfo = res;
						it1.next(data);
					});
					return;
				} ,
				function(it1, data){
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

					options.message( broccoli.lb.get('ui_message.updating_resources') );
					_resMgr.updateResource( data.resKey, resInfo, function(result){
						options.message( broccoli.lb.get('ui_message.getting_public_path_for_resource') );
						_resMgr.getResourcePublicPath( data.resKey, function(publicPath){
							data.path = publicPath;
							it1.next(data);
						} );
					} );
					return;

				} ,
				function(it1, data){
					options.message( broccoli.lb.get('ui_message.completed_resource_processing') );
					callback(data);
					it1.next(data);
				}
			]
		);
		return;
	}
}
