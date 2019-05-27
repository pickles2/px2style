(function(){
    var Px2style = function(){};
    var px2style = window.px2style = new Px2style;
    var modal = require('./modal/_modal.js')(Px2style);
    var loading = require('./styles/_loading.js')(Px2style);
    var header = require('./header/_header.js')(Px2style);
})();
