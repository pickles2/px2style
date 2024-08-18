/**
 * utils
 */
module.exports = function(broccoli){
	const LangBank = require('langbank');
	const languageCsv = require('./language.csv');

	/**
	 * LangBankオブジェクトを生成する
	 */
	this.createLb = async function(){
		return new Promise((resolve, reject)=>{
			const lb = new LangBank(languageCsv, ()=>{
				lb.setLang( broccoli.lb.getLang() );
				resolve(lb);
			});
		});
	}
}
