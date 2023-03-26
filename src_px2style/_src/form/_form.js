/**
 * form.js
 */
(function(){
	if( window.px2style.form ){
		return;
	}

	var $ = window.px2style.$;

	/**
	 * Form setup.
	 */
	window.px2style.form = function(container){
		var $container = $(container);

		var objForm = new ClassForm(window.px2style, $container);

		return objForm;
	}

	/**
	 * フォームクラス
	 */
	function ClassForm(px2style, $container){
		var self = this;
		this.$container = $container;


		this.$container.find('input, textarea, select')
			.on('change', function(){
				var $li = $(this).closest(`.px2-form-input-list__li`);
				$li.removeClass(`px2-form-input-list__li--error`);
				$li.find('.px2-error').remove();
				$li.find('.px2-input').removeClass(`px2-input--error`);
			});

		/**
		 * バリデーションエラー内容を表示する
		 * @param {*} validationResult 
		 */
		this.reportValidationError = function( validationResult ){
			this.$container.find('.px2-form-input-list__li').removeClass(`px2-form-input-list__li--error`);
			this.$container.find('.px2-error').remove();
			Object.keys(validationResult.errors).forEach(function(key){
				var $li = self.$container.find(`.px2-form-input-list__li[data-name=${key}]`);
				var $inputContainer = $li.find('.px2-form-input-list__input');
				$li.addClass(`px2-form-input-list__li--error`);
				$inputContainer.prepend( $('<p class="px2-error">').text(validationResult.errors[key]) );
				$li.find('.px2-input').addClass(`px2-input--error`);
			});
		}


		/**
		 * 未解決のバリデーションエラーがあるか調べる
		 */
		this.hasValidationError = function(){
			var $erroredField = this.$container.find('.px2-form-input-list__li.px2-form-input-list__li--error');
			return !!$erroredField.length;
		}
	}
})();
