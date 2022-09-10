<?php
namespace tomk79\broccoliModuleStdDocument\fields\cssMarginPadding;
class backend extends \broccoliHtmlEditor\fieldBase{

    private $broccoli;

    /**
     * constructor
     */
    public function __construct($broccoli){
        $this->broccoli = $broccoli;
        parent::__construct($broccoli);
    }

	/**
	 * データをバインドする (Server Side)
	 */
	public function bind( $fieldData, $mode, $mod ){
		$rtn = '';
		if( is_array($fieldData) ){
			// margin
			if( is_string(@$fieldData['marginTop']) && strlen(''.@$fieldData['marginTop']) ){
				$rtn .= 'margin-top:'.trim($fieldData['marginTop']).';';
			}
			if( is_string(@$fieldData['marginRight']) && strlen(''.@$fieldData['marginRight']) ){
				$rtn .= 'margin-right:'.trim($fieldData['marginRight']).';';
			}
			if( is_string(@$fieldData['marginBottom']) && strlen(''.@$fieldData['marginBottom']) ){
				$rtn .= 'margin-bottom:'.trim($fieldData['marginBottom']).';';
			}
			if( is_string(@$fieldData['marginLeft']) && strlen(''.@$fieldData['marginLeft']) ){
				$rtn .= 'margin-left:'.trim($fieldData['marginLeft']).';';
			}

			// padding
			if( is_string(@$fieldData['paddingTop']) && strlen(''.@$fieldData['paddingTop']) ){
				$rtn .= 'padding-top:'.trim($fieldData['paddingTop']).';';
			}
			if( is_string(@$fieldData['paddingRight']) && strlen(''.@$fieldData['paddingRight']) ){
				$rtn .= 'padding-right:'.trim($fieldData['paddingRight']).';';
			}
			if( is_string(@$fieldData['paddingBottom']) && strlen(''.@$fieldData['paddingBottom']) ){
				$rtn .= 'padding-bottom:'.trim($fieldData['paddingBottom']).';';
			}
			if( is_string(@$fieldData['paddingLeft']) && strlen(''.@$fieldData['paddingLeft']) ){
				$rtn .= 'padding-left:'.trim($fieldData['paddingLeft']).';';
			}
		}
		return $rtn;
	}

}