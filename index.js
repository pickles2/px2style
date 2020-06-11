/**
 * px2style/index.js
 */
module.exports = function(Px2style){
    var Px2style = function(){};
    var modal = require('./src/modal/_modal.js')(Px2style);
    var notice = require('./src/notice/_notice.js')(Px2style);
    var loading = require('./src/styles/_loading.js')(Px2style);
    var header = require('./src/header/_header.js')(Px2style);
    return Px2style;
}
