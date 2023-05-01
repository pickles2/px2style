/**
 * px2style.js - base
 */
var px2style = new (function(){
    var px2style = this;
    this.version = "3.2.0";
    this.$ = require('jquery');

    var initFunctions = {};
    this.registerInitFunction = function(name, func){
        initFunctions[name] = func;
    }
    var timerInit;
    this.init = function(){
        clearTimeout(timerInit);
        var px2style = this;
        timerInit = setTimeout(function(){
            Object.keys(initFunctions).forEach(function (key) {
                initFunctions[key](px2style);
            });
        }, 10);
    }

    // DOMの変更を監視する
    var observer = new MutationObserver(function(records){
        px2style.init();
    })
    observer.observe(window.document, {
        "childList": true,
        "subtree": true,
    });
})();

if( !window.px2style ){
    window.px2style = px2style;

    // px2style components
    require('./../src_px2style/_src/config/_config.js');
    require('./../src_px2style/_src/modal/_modal.js');
    require('./../src_px2style/_src/form/_form.js');
    require('./../src_px2style/_src/notice/_notice.js');
    require('./../src_px2style/_src/loading/_loading.js');
}

module.exports = px2style;
