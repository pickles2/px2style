/**
 * px2style.js - base
 */
var Px2Style = function(){
    this.version = "3.0.0";
    this.$ = require('jquery');
}
var px2style = new Px2Style();

if( !window.px2style ){
    window.px2style = px2style;

    // px2style components
    require('./../src_px2style/_src/config/_config.js');
    require('./../src_px2style/_src/modal/_modal.js');
    require('./../src_px2style/_src/notice/_notice.js');
    require('./../src_px2style/_src/loading/_loading.js');
}
module.exports = px2style;
