window.broccoliModulePx2StyleImageList = function(broccoli){

	const imgDummy = function(){
		return (
			broccoli.getNoimagePlaceholder
			? broccoli.getNoimagePlaceholder()
			: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYyMCIgaGVpZ2h0PSIxMDgwIiB2aWV3Qm94PSIwIDAgMTYyMCAxMDgwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTYyMCIgaGVpZ2h0PSIxMDgwIiBmaWxsPSIjOTk5OTk5IiBmaWxsLW9wYWNpdHk9IjAuMyIvPgo8ZyBjbGlwLXBhdGg9InVybCgjY2xpcDBfMjExMF80NDYzKSI+CjxwYXRoIGQ9Ik03NzIuMjg4IDQ5Mi44MTJDNzcyLjI4OCA1MDAuMzIxIDc2OS4zMDUgNTA3LjUyMyA3NjMuOTk1IDUxMi44MzJDNzU4LjY4NiA1MTguMTQyIDc1MS40ODQgNTIxLjEyNSA3NDMuOTc1IDUyMS4xMjVDNzM2LjQ2NiA1MjEuMTI1IDcyOS4yNjUgNTE4LjE0MiA3MjMuOTU1IDUxMi44MzJDNzE4LjY0NiA1MDcuNTIzIDcxNS42NjMgNTAwLjMyMSA3MTUuNjYzIDQ5Mi44MTJDNzE1LjY2MyA0ODUuMzA0IDcxOC42NDYgNDc4LjEwMiA3MjMuOTU1IDQ3Mi43OTNDNzI5LjI2NSA0NjcuNDgzIDczNi40NjYgNDY0LjUgNzQzLjk3NSA0NjQuNUM3NTEuNDg0IDQ2NC41IDc1OC42ODYgNDY3LjQ4MyA3NjMuOTk1IDQ3Mi43OTNDNzY5LjMwNSA0NzguMTAyIDc3Mi4yODggNDg1LjMwNCA3NzIuMjg4IDQ5Mi44MTJaIiBmaWxsPSIjQUFBQUFBIiBmaWxsLW9wYWNpdHk9IjAuNyIvPgo8cGF0aCBkPSJNNjk2Ljc4OCA0MDcuODc1QzY4Ni43NzYgNDA3Ljg3NSA2NzcuMTc0IDQxMS44NTIgNjcwLjA5NCA0MTguOTMyQzY2My4wMTUgNDI2LjAxMSA2NTkuMDM4IDQzNS42MTMgNjU5LjAzOCA0NDUuNjI1VjYzNC4zNzVDNjU5LjAzOCA2NDQuMzg3IDY2My4wMTUgNjUzLjk4OSA2NzAuMDk0IDY2MS4wNjhDNjc3LjE3NCA2NjguMTQ4IDY4Ni43NzYgNjcyLjEyNSA2OTYuNzg4IDY3Mi4xMjVIOTIzLjI4OEM5MzMuMyA2NzIuMTI1IDk0Mi45MDIgNjY4LjE0OCA5NDkuOTgxIDY2MS4wNjhDOTU3LjA2MSA2NTMuOTg5IDk2MS4wMzggNjQ0LjM4NyA5NjEuMDM4IDYzNC4zNzVWNDQ1LjYyNUM5NjEuMDM4IDQzNS42MTMgOTU3LjA2MSA0MjYuMDExIDk0OS45ODEgNDE4LjkzMkM5NDIuOTAyIDQxMS44NTIgOTMzLjMgNDA3Ljg3NSA5MjMuMjg4IDQwNy44NzVINjk2Ljc4OFpNOTIzLjI4OCA0MjYuNzVDOTI4LjI5NCA0MjYuNzUgOTMzLjA5NSA0MjguNzM5IDkzNi42MzQgNDMyLjI3OEM5NDAuMTc0IDQzNS44MTggOTQyLjE2MyA0NDAuNjE5IDk0Mi4xNjMgNDQ1LjYyNVY1NjguMzEyTDg3MC44NzIgNTMxLjU2M0M4NjkuMTAyIDUzMC42NzYgODY3LjA5OCA1MzAuMzY5IDg2NS4xNDMgNTMwLjY4NEM4NjMuMTg5IDUzMC45OTkgODYxLjM4MyA1MzEuOTIgODU5Ljk4MSA1MzMuMzE4TDc4OS45NTUgNjAzLjM0NEw3MzkuNzQ3IDU2OS44OThDNzM3LjkzNCA1NjguNjkxIDczNS43NiA1NjguMTQ4IDczMy41OTMgNTY4LjM2MkM3MzEuNDI2IDU2OC41NzUgNzI5LjM5OSA1NjkuNTMxIDcyNy44NTYgNTcxLjA2OEw2NzcuOTEzIDYxNS41VjQ0NS42MjVDNjc3LjkxMyA0NDAuNjE5IDY3OS45MDEgNDM1LjgxOCA2ODMuNDQxIDQzMi4yNzhDNjg2Ljk4MSA0MjguNzM5IDY5MS43ODIgNDI2Ljc1IDY5Ni43ODggNDI2Ljc1SDkyMy4yODhaIiBmaWxsPSIjQUFBQUFBIiBmaWxsLW9wYWNpdHk9IjAuNyIvPgo8L2c+CjxkZWZzPgo8Y2xpcFBhdGggaWQ9ImNsaXAwXzIxMTBfNDQ2MyI+CjxyZWN0IHdpZHRoPSIzMDIiIGhlaWdodD0iMzAyIiBmaWxsPSJ3aGl0ZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNjU5IDM4OSkiLz4KPC9jbGlwUGF0aD4KPC9kZWZzPgo8L3N2Zz4K'
		);
	}

	const $ = require('jquery');
	const it79 = require('iterate79');
	const _resMgr = broccoli.resourceMgr;
	const Utils = require('./modules/Utils.js'),
		  utils = new Utils(broccoli);
	const MkEditor = require('./modules/MkEditor/MkEditor.js'),
		  mkEditor = new MkEditor(broccoli, _resMgr, imgDummy);
	const MkPreviewHtml = require('./modules/MkPreviewHtml/MkPreviewHtml.js'),
		  mkPreviewHtml = new MkPreviewHtml(broccoli, _resMgr, imgDummy);

	this.lb;

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
				"slides": [
					{
						"resKey": "",
						"path": "about:blank",
						"resType": "",
						"webUrl": ""
					},
					{
						"resKey": "",
						"path": "about:blank",
						"resType": "",
						"webUrl": ""
					},
					{
						"resKey": "",
						"path": "about:blank",
						"resType": "",
						"webUrl": ""
					},
				],
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

		const $tmp_slides = $dom.find('.broccoli-module-px2style-image-list__slider .broccoli-module-px2style-image-list__slider-slide');
		const $slides = [];
		$tmp_slides.each((index, item)=>{
			$slides.push(item);
		});

		_resMgr.getResourceDb(function(resourceDb){

			let duplicatedFilename = {};

			it79.ary(
				$slides,
				function(it, row, index){
					const $item = $(row);
					if( $item.find('.broccoli-module-px2style-image-list__slider-btn-add').length ){
						// スライドではない
						it.next();
						return;
					}

					var $img = $item.find('img');
					var resType = $item.attr('data-res-type');
					var resKey = $item.attr('data-res-key');
					var webUrl = $item.attr('data-web-url');
					var filename = $img.attr('data-public-filename');
					var isUpdated = $img.attr('data-is-updated');

					var isImageUpdated = false;
					if( isUpdated == 'yes' ){
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
						if( duplicatedFilename[filename] ){
							// すでにチェック済みエラー報告済みの場合はスキップ
							continue;
						}
						if( resType === '' && filename !== '' && resourceDb[idx].publicFilename == filename ){
							errorMsgs.push( broccoli.lb.get('ui_message.duplicate_image_file_name') );
							duplicatedFilename[filename] = true;
							continue;
						}
					}

					for( var idx in $slides ){
						const $slide = $($slides[idx]);
						if( $slide.find('.broccoli-module-px2style-image-list__slider-btn-add').length ){
							// スライドではない
							continue;
						}
						if( idx == index ){
							// 自分
							continue;
						}
						if( duplicatedFilename[filename] ){
							// すでにチェック済みエラー報告済みの場合はスキップ
							continue;
						}

						var $targetImg = $slide.find('img');
						var targetFilename = $targetImg.attr('data-public-filename');
						if( resType === '' && filename !== '' && targetFilename == filename ){
							errorMsgs.push( broccoli.lb.get('ui_message.duplicate_image_file_name') );
							duplicatedFilename[filename] = true;
							continue;
						}
					}
					it.next();
				},
				function(){
					callback( errorMsgs );
				}
			);
		});

		return;
	}

	/**
	 * エディタUIで編集した内容を保存
	 */
	this.saveEditorContent = function( elm, data, mod, callback, options ){
		options = options || {};
		options.message = options.message || function(msg){}; // ユーザーへのメッセージテキストを送信

		var $dom = $(elm);
		if( typeof(data) !== typeof({}) || typeof(data.length) !== typeof({}.length)  ){
			data = {
				"slides": [],
			};
		}
		data.slides = [];

		const $tmp_slides = $dom.find('.broccoli-module-px2style-image-list__slider .broccoli-module-px2style-image-list__slider-slide');
		const $slides = [];
		$tmp_slides.each((index, item)=>{
			$slides.push(item);
		});

		it79.ary(
			$slides,
			async function(it, $slide, index){
				const $item = $($slide);
				if( $item.find('.broccoli-module-px2style-image-list__slider-btn-add').length ){
					it.next();
					return;
				}

				var resInfo;
				const rowData = {
					path: $item.attr('data-path'),
					resKey: $item.attr('data-res-key'),
					resType: $item.attr('data-res-type'),
					webUrl: $item.attr('data-web-url'),
					href: $item.attr('data-href'),
					captionTitle: $item.attr('data-caption-title'),
					captionBody: $item.attr('data-caption-body'),
				};

				it79.fnc({}, [
					function(it1){
						_resMgr.getResource(rowData.resKey, function(result){
							if( result === false ){
								_resMgr.addResource(function(newResKey){
									rowData.resKey = newResKey;
									it1.next();
								});
								return;
							}
							it1.next();
							return;
						});
					} ,
					function(it1){
						_resMgr.getResource(rowData.resKey, function(res){
							resInfo = res;
							it1.next();
						});
						return;
					} ,
					function(it1){
						var $img = $item.find('img');

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
						resInfo.isPrivateMaterial = (rowData.resType == 'web' ? true : false);
						resInfo.publicFilename = $img.attr('data-public-filename') || "";

						_resMgr.updateResource( rowData.resKey, resInfo, function(result){
							_resMgr.getResourcePublicPath( rowData.resKey, function(publicPath){
								rowData.path = publicPath;
								it1.next();
							} );
						} );
						return;

					} ,
					function(){
						data.slides.push(rowData);
						it.next();
					}
				]);
			},
			function(){
				options.message( broccoli.lb.get('ui_message.completed_resource_processing') );
				callback(data);
			}
		);
		return;
	}
}
