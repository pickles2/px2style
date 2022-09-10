<?php
/**
 * broccoli-html-editor fields
 */
namespace pickles2\px2style;

/**
 * Utilities
 *
 * @author Tomoya Koyanagi <tomk79@gmail.com>
 */
class utils{

	/**
	 * Dropped File Operator
	 */
	static function droppedFileOperator( $type, $options = array() ){
		if( is_array($options) || is_object( $options ) ){
			$options = (array) $options;
		}else{
			$options = array();
		}

		if( !strlen(''.$type) ){
			return null;
		}

		$rtn = null;
		switch( $type ){
			case 'image':
				$rtn = array();
				$rtn['file'] = __DIR__.'/../broccoliHelper/broccoliModulePx2StyleDroppedFileOperatorGen.js';
				$rtn['function'] = 'window.broccoliModulePx2StyleDroppedFileOperatorGen({})';
				break;
		}
		return $rtn;
	}

}
