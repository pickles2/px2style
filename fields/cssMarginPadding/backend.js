module.exports = function(broccoli){
	var utils79 = require('utils79');

	/**
	 * データをバインドする
	 */
	this.bind = function( fieldData, mode, mod, callback ){
		var rtn = '';
		if( typeof(fieldData)===typeof({}) ){
			// margin
			if( typeof(fieldData.marginTop)===typeof('') ){
				rtn += 'margin-top:'+utils79.toStr(fieldData.marginTop)+';';
			}
			if( typeof(fieldData.marginRight)===typeof('') ){
				rtn += 'margin-right:'+utils79.toStr(fieldData.marginRight)+';';
			}
			if( typeof(fieldData.marginBottom)===typeof('') ){
				rtn += 'margin-bottom:'+utils79.toStr(fieldData.marginBottom)+';';
			}
			if( typeof(fieldData.marginLeft)===typeof('') ){
				rtn += 'margin-left:'+utils79.toStr(fieldData.marginLeft)+';';
			}

			// padding
			if( typeof(fieldData.paddingTop)===typeof('') ){
				rtn += 'padding-top:'+utils79.toStr(fieldData.paddingTop)+';';
			}
			if( typeof(fieldData.paddingRight)===typeof('') ){
				rtn += 'padding-right:'+utils79.toStr(fieldData.paddingRight)+';';
			}
			if( typeof(fieldData.paddingBottom)===typeof('') ){
				rtn += 'padding-bottom:'+utils79.toStr(fieldData.paddingBottom)+';';
			}
			if( typeof(fieldData.paddingLeft)===typeof('') ){
				rtn += 'padding-left:'+utils79.toStr(fieldData.paddingLeft)+';';
			}
		}

		// setTimeout(function(){
			callback(rtn);
		// }, 0);
		return;
	}

}
