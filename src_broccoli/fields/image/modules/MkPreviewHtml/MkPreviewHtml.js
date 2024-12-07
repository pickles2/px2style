/**
 * mkPreviewHtml
 */
module.exports = function(broccoli, _resMgr, imgDummy){
	const $ = require('jquery');

	/**
	 * プレビュー用の簡易なHTMLを生成する
	 */
	this.mkPreviewHtml = function( fieldData, mod, callback, lb ){
		var rtn = '';
		if( typeof(fieldData) !== typeof({}) ){
			fieldData = {};
		}

		new Promise(function(rlv){rlv();})
			.then(function(){ return new Promise(function(rlv, rjt){

				if( fieldData.resType == 'web' ){
					var $img = $('<img>')
						.attr({'src': fieldData.webUrl})
						.css({
							'max-width': '80px',
							'max-height': '80px',
							'display': 'block',
							'margin': '0 auto',
						})
					;
					rtn = $img.prop("outerHTML");
					rlv();
					return;
				}else if( fieldData.resType == 'none' ){
					rtn = '<p>No File</p>';
					rlv();
					return;
				}else{
					_resMgr.getResourceDb( function(resDb){
						var res, imagePath;
						try {
							res = resDb[fieldData.resKey];
							if( res.type.match(/^image\//) ){
								imagePath = 'data:'+res.type+';base64,' + '{broccoli-html-editor-resource-baser64:{'+fieldData.resKey+'}}';

								if( !imagePath || !res.base64 ){
									// ↓ ダミーの Sample Image
									imagePath = imgDummy();
								}
								var $img = $('<img>')
									.attr({'src': imagePath})
									.css({
										'max-width': '80px',
										'max-height': '80px',
										'display': 'block',
										'margin': '0 auto',
									})
								;
								rtn = $img.prop("outerHTML");
							}else{
								rtn = '<p>.'+res.ext+'</p>';
							}
						} catch (e) {
							var $img = $('<img>')
								.attr({'src': imgDummy()})
								.css({
									'max-width': '80px',
									'max-height': '80px',
									'display': 'block',
									'margin': '0 auto',
								})
							;
							rtn = $img.prop("outerHTML");
						}
						rlv();
					} );
					return;
				}
				return;
			}); })
			.then(function(){ return new Promise(function(rlv, rjt){
				rtn = '<div style="display: block; max-height: none; margin: 1em auto; padding: 10px; border: 1px solid #888; border-radius: 5px;">'+rtn+'</div>';
				rlv();
				return;
			}); })
			.then(function(){ return new Promise(function(rlv, rjt){
				callback( rtn );
				return;
			}); })
		;
		return;
	}
}
