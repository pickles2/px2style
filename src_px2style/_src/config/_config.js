/**
 * config.js
 */
(function(){
	if( window.px2style.setConfig ){
		return;
	}

	var config = {
		'additionalClassName': '',
	};

	/**
	 * Set config.
	 */
	window.px2style.setConfig = function(key, val){
		config[key] = val;
		return true;
	}

	/**
	 * Get config.
	 */
	window.px2style.getConfig = function(key){
		return config[key];
	}

})();
