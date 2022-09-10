<?php
/**
 * broccoli-html-editor fields
 */
namespace tomk79\broccoliModuleStdDocument;

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
				$rtn['file'] = __DIR__.'/../dist/broccoliModuleStdDocumentDroppedFileOperatorGen.js';
				$rtn['function'] = 'window.broccoliModuleStdDocumentDroppedFileOperatorGen({})';
				break;
		}
		return $rtn;
	}

}
