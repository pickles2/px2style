/**
 * config.js
 */
(function(){

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
