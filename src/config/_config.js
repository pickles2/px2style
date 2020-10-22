/**
 * config.js
 */
module.exports = function(Px2style){

	var config = {
		'additionalClassName': '',
	};

	/**
	 * Set config.
	 */
	Px2style.prototype.setConfig = function(key, val){
		config[key] = val;
		return true;
	}

	/**
	 * Get config.
	 */
	Px2style.prototype.getConfig = function(key){
		return config[key];
	}

}
