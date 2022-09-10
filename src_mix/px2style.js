/**
 * px2style.js - base
 */
if( !window.px2style ){
    window.px2style = new (function(){
        this.version = "3.0.0";
    })();
}
if( !window.px2style.$ ){
    window.px2style.$ = require('jquery');
}
if( window.px2style ){
    // px2style
    require('./../src_px2style/_src/config/_config.js');
    require('./../src_px2style/_src/modal/_modal.js');
    require('./../src_px2style/_src/notice/_notice.js');
    require('./../src_px2style/_src/loading/_loading.js');
}
