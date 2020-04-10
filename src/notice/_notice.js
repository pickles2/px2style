/**
 * notice.js
 */
module.exports = function(Px2style){
	var $ = require('jquery');
	var $flashmessage,
		$target;

	/**
	 * Flash Message.
	 */
	Px2style.prototype.flashMessage = function(message, callback){
		var _this = this;
		callback = callback||function(){};

		var options = {};
		if( typeof(message) == typeof({}) ){
			options = message;
		}else{
			options.message = message;
		}
		options.message = options.message||'';
		options.target = options.target||$('body');

		alert(options.message);callback();return;

		var tpl = '';
		tpl += '<div class="px2-modal">';
		if(options.form){
			tpl += '<form>';
		}
		tpl += ' <article class="px2-modal__dialog">';
		tpl += '  <div class="px2-modal__header">';
		tpl += '      <h1 class="px2-modal__title"></h1>';
		tpl += '  </div>';
		tpl += '  <div class="px2-modal__body"><div class="px2-modal__body-inner"></div></div>';
		tpl += '  <div class="px2-modal__footer"><div class="px2-modal__footer-primary"></div><div class="px2-modal__footer-secondary"></div></div>';
		tpl += ' </article>';
		if(options.form){
			tpl += '</form>';
		}
		tpl += '</div>';

		$flashmessage = $(tpl);

		if(options.form){
			$flashmessage.find('form').attr({
				'action': options.form.action || 'javascript:;',
				'method': options.form.method || 'post'
			}).on('submit', options.form.submit || function(){
				_this.closeModal();
			});
		}

		var $title = $flashmessage.find('.px2-modal__title');
		$title.append( options.title );

		var $body = $flashmessage.find('.px2-modal__body-inner');
		$body.append( options.body );

		function generateBtn(btnSetting){
			btnSetting = btnSetting || {};
			var $li = $('<li>');
			var $btn = $(btnSetting);
			$li.append($btn);
			if( !$btn.attr('class') ){
				$btn.attr({'class':'px2-btn'});
			}
			if( !$btn.text() ){
				$btn.text('button');
			}
			return $li;
		}

		var $footer = $flashmessage.find('.px2-modal__footer-primary');
		var $footerUl = $('<ul>');
		for( var i in options.buttons ){
			$footerUl.append( generateBtn(options.buttons[i]) );
		}
		$footer.append($footerUl);

		var $footer2 = $flashmessage.find('.px2-modal__footer-secondary');
		var $footer2Ul = $('<ul>');
		for( var i in options.buttonsSecondary ){
			$footer2Ul.append( generateBtn(options.buttonsSecondary[i]) );
		}
		$footer2.append($footer2Ul);

		$target = $(options.target);
		$target.append($flashmessage);


		if( $target.get(0).tagName.toLowerCase() == 'body' ){
			// body に挿入する場合は、 fixed に。
			$flashmessage.css({
				"position": "fixed"
			});
		}else{
			$flashmessage.css({
				"height": $target.outerHeight()
			});
		}

		if( options.width ){
			$flashmessage.find('.px2-modal__dialog').css({
				"max-width": options.width
			});
		}

		$(window).on('resize.px2-modal', function(){
			onWindowResize();
		});
		onWindowResize();

		callback();

		return;
	}

}
