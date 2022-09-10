/**
 * px2style.js - base
 */
if( !window.px2style ){
    window.px2style = new (function(){
        this.version = "3.0.0";
    })();

    // px2style
    require('./../src_px2style/_src/config/_config.js')(module.exports);
    require('./../src_px2style/_src/header/_header.js')(module.exports);
    require('./../src_px2style/_src/modal/_modal.js')(module.exports);
    require('./../src_px2style/_src/notice/_notice.js')(module.exports);
    require('./../src_px2style/_src/styles/_loading.js')(module.exports);
}
if( !window.px2style.$ ){
    window.px2style.$ = require('jquery');
}
