window.broccoliModuleStdDocumentCssMarginPadding = function(broccoli){
	var $ = require('jquery');

	/**
	 * データを正規化する (Client Side)
	 * このメソッドは、同期的に振る舞います。
	 */
	this.normalizeData = function( fieldData, mode ){
		// 編集画面用にデータを初期化。
		var rtn = fieldData;
		if(!rtn || typeof(rtn) != typeof({})){
			rtn = {};
		}
		// margin
		if(typeof(rtn.marginTop) != typeof('')){
			rtn.marginTop = '';
		}
		if(typeof(rtn.marginRight) != typeof('')){
			rtn.marginRight = '';
		}
		if(typeof(rtn.marginBottom) != typeof('')){
			rtn.marginBottom = '';
		}
		if(typeof(rtn.marginLeft) != typeof('')){
			rtn.marginLeft = '';
		}
		// padding
		if(typeof(rtn.paddingTop) != typeof('')){
			rtn.paddingTop = '';
		}
		if(typeof(rtn.paddingRight) != typeof('')){
			rtn.paddingRight = '';
		}
		if(typeof(rtn.paddingBottom) != typeof('')){
			rtn.paddingBottom = '';
		}
		if(typeof(rtn.paddingLeft) != typeof('')){
			rtn.paddingLeft = '';
		}
		return rtn;
	}

	/**
	 * プレビュー用の簡易なHTMLを生成する (Client Side)
	 * InstanceTreeViewで利用する。
	 */
	this.mkPreviewHtml = function( fieldData, mod, callback ){
		var rtn = '';
		new Promise(function(rlv){rlv();})
			.then(function(){ return new Promise(function(rlv, rjt){
				// サーバーサイドの bind() に相当する処理
				if(typeof(fieldData) == typeof({})){
					rtn += 'margin: '+(fieldData.marginTop||'-');
					rtn += ' '+(fieldData.marginRight||'-');
					rtn += ' '+(fieldData.marginBottom||'-');
					rtn += ' '+(fieldData.marginLeft||'-')+'; ';

					rtn += 'padding: '+(fieldData.paddingTop||'-');
					rtn += ' '+(fieldData.paddingRight||'-');
					rtn += ' '+(fieldData.paddingBottom||'-');
					rtn += ' '+(fieldData.paddingLeft||'-')+';';
				}else{
					rtn = 'no data';
				}
				rlv();

			}); })
			.then(function(){ return new Promise(function(rlv, rjt){
				callback( rtn );
			}); })
		;
		return this;
	}

	/**
	 * エディタUIを生成 (Client Side)
	 */
	this.mkEditor = function( mod, data, elm, callback ){
		if(!data || typeof(data) != typeof({})){
			data = {};
		}

		// margin
		if(typeof(data.marginTop) != typeof('')){
			data.marginTop = '';
		}
		if(typeof(data.marginRight) != typeof('')){
			data.marginRight = '';
		}
		if(typeof(data.marginBottom) != typeof('')){
			data.marginBottom = '';
		}
		if(typeof(data.marginLeft) != typeof('')){
			data.marginLeft = '';
		}

		// padding
		if(typeof(data.marginTop) != typeof('')){
			data.marginTop = '';
		}
		if(typeof(data.marginRight) != typeof('')){
			data.marginRight = '';
		}
		if(typeof(data.marginBottom) != typeof('')){
			data.marginBottom = '';
		}
		if(typeof(data.marginLeft) != typeof('')){
			data.marginLeft = '';
		}

		var $rtn = $('<div>');
		$rtn.append(
			'<p>ボックスの内側、外側のスペースを設定します。単位を含めて入力してください。</p>'
		);
		$rtn.append(
			'<table class="broccoli-module-std-document-css-margin-padding__table">'+
				'<tr>'+
					'<td class="broccoli-module-std-document-css-margin-padding__margin">margin</td>'+
					'<td class="broccoli-module-std-document-css-margin-padding__margin"></td>'+
					'<td class="broccoli-module-std-document-css-margin-padding__margin"><input type="text" class="form-control" name="'+mod.name+'__margin-top" value="" style="width: 5em;" /></td>'+
					'<td class="broccoli-module-std-document-css-margin-padding__margin"></td>'+
					'<td class="broccoli-module-std-document-css-margin-padding__margin"></td>'+
				'</tr>'+
				'<tr>'+
					'<td class="broccoli-module-std-document-css-margin-padding__margin"></td>'+
					'<td class="broccoli-module-std-document-css-margin-padding__padding" style="border-top-width: 1px; border-left-width: 1px;">padding</td>'+
					'<td class="broccoli-module-std-document-css-margin-padding__padding" style="border-top-width: 1px;"><input type="text" class="form-control" name="'+mod.name+'__padding-top" value="" style="width: 5em;" /></td>'+
					'<td class="broccoli-module-std-document-css-margin-padding__padding" style="border-top-width: 1px; border-right-width: 1px;"></td>'+
					'<td class="broccoli-module-std-document-css-margin-padding__margin"></td>'+
				'</tr>'+
				'<tr>'+
					'<td class="broccoli-module-std-document-css-margin-padding__margin"><input type="text" class="form-control" name="'+mod.name+'__margin-left" value="" style="width: 5em;" /></td>'+
					'<td class="broccoli-module-std-document-css-margin-padding__padding" style="border-left-width: 1px;"><input type="text" class="form-control" name="'+mod.name+'__padding-left" value="" style="width: 5em;" /></td>'+
					'<td></td>'+
					'<td class="broccoli-module-std-document-css-margin-padding__padding" style="border-right-width: 1px;"><input type="text" class="form-control" name="'+mod.name+'__padding-right" value="" style="width: 5em;" /></td>'+
					'<td class="broccoli-module-std-document-css-margin-padding__margin"><input type="text" class="form-control" name="'+mod.name+'__margin-right" value="" style="width: 5em;" /></td>'+
				'</tr>'+
				'<tr>'+
					'<td class="broccoli-module-std-document-css-margin-padding__margin"></td>'+
					'<td class="broccoli-module-std-document-css-margin-padding__padding" style="border-bottom-width: 1px; border-left-width: 1px;"></td>'+
					'<td class="broccoli-module-std-document-css-margin-padding__padding" style="border-bottom-width: 1px;"><input type="text" class="form-control" name="'+mod.name+'__padding-bottom" value="" style="width: 5em;" /></td>'+
					'<td class="broccoli-module-std-document-css-margin-padding__padding" style="border-bottom-width: 1px; border-right-width: 1px;"></td>'+
					'<td class="broccoli-module-std-document-css-margin-padding__margin"></td>'+
				'</tr>'+
				'<tr>'+
					'<td class="broccoli-module-std-document-css-margin-padding__margin"></td>'+
					'<td class="broccoli-module-std-document-css-margin-padding__margin"></td>'+
					'<td class="broccoli-module-std-document-css-margin-padding__margin"><input type="text" class="form-control" name="'+mod.name+'__margin-bottom" value="" style="width: 5em;" /></td>'+
					'<td class="broccoli-module-std-document-css-margin-padding__margin"></td>'+
					'<td class="broccoli-module-std-document-css-margin-padding__margin"></td>'+
				'</tr>'+
			'</table>'
		);

		// margin
		$rtn.find( 'input[name='+(mod.name)+'__margin-top]' )
			.val(data.marginTop || '')
		;
		$rtn.find( 'input[name='+(mod.name)+'__margin-right]' )
			.val(data.marginRight || '')
		;
		$rtn.find( 'input[name='+(mod.name)+'__margin-bottom]' )
			.val(data.marginBottom || '')
		;
		$rtn.find( 'input[name='+(mod.name)+'__margin-left]' )
			.val(data.marginLeft || '')
		;

		// padding
		$rtn.find( 'input[name='+(mod.name)+'__padding-top]' )
			.val(data.paddingTop || '')
		;
		$rtn.find( 'input[name='+(mod.name)+'__padding-right]' )
			.val(data.paddingRight || '')
		;
		$rtn.find( 'input[name='+(mod.name)+'__padding-bottom]' )
			.val(data.paddingBottom || '')
		;
		$rtn.find( 'input[name='+(mod.name)+'__padding-left]' )
			.val(data.paddingLeft || '')
		;

		$(elm).html($rtn);

		new Promise(function(rlv){rlv();}).then(function(){ return new Promise(function(rlv, rjt){
			callback();
		}); });
		return this;
	}

	/**
	 * エディタUIで編集した内容を検証する (Client Side)
	 */
	this.validateEditorContent = function( elm, mod, callback ){
		var errorMsgs = [];
		// errorMsgs.push('エラーがあります。');
		new Promise(function(rlv){rlv();}).then(function(){ return new Promise(function(rlv, rjt){
			callback( errorMsgs );
		}); });
		return this;
	}

	/**
	 * エディタUIで編集した内容を保存 (Client Side)
	 */
	this.saveEditorContent = function( elm, data, mod, callback, options ){
		options = options || {};
		options.message = options.message || function(msg){};//ユーザーへのメッセージテキストを送信
		var $dom = $(elm);
		var rtn = {};

		// margin
		rtn.marginTop = $dom.find('input[name='+mod.name+'__margin-top]').val();
		rtn.marginRight = $dom.find('input[name='+mod.name+'__margin-right]').val();
		rtn.marginBottom = $dom.find('input[name='+mod.name+'__margin-bottom]').val();
		rtn.marginLeft = $dom.find('input[name='+mod.name+'__margin-left]').val();

		// padding
		rtn.paddingTop = $dom.find('input[name='+mod.name+'__padding-top]').val();
		rtn.paddingRight = $dom.find('input[name='+mod.name+'__padding-right]').val();
		rtn.paddingBottom = $dom.find('input[name='+mod.name+'__padding-bottom]').val();
		rtn.paddingLeft = $dom.find('input[name='+mod.name+'__padding-left]').val();

		rtn = JSON.parse( JSON.stringify(rtn) );

		new Promise(function(rlv){rlv();}).then(function(){ return new Promise(function(rlv, rjt){
			callback(rtn);
		}); });
		return this;
	}

}
