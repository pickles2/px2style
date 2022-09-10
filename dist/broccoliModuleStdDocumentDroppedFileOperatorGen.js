console.log('broccoliModuleStdDocumentDroppedFileOperatorGen() is loaded.');
window.broccoliModuleStdDocumentDroppedFileOperatorGen = function(options){
    options = options || {};
    options.packageId = options.packageId || 'std-document';

    return function(fileInfo, callback){
        console.log('broccoli-module-std-document: IMAGE Operator', fileInfo);
        var mimetype = fileInfo.type;
        var originalFileSize = fileInfo.size;
        var originalFileName = fileInfo.name;
        var originalFileFirstname = originalFileName;
        var originalFileExt = 'png';
        if( originalFileName.match( /^(.*)\.([a-zA-Z0-9\_]+)$/i ) ){
            originalFileFirstname = RegExp.$1;
            originalFileExt = RegExp.$2;
            originalFileExt = originalFileExt.toLowerCase();
        }

        var reader = new FileReader();
        reader.onload = function(evt) {
            // console.log(evt.target);
            var content = evt.target.result;
            // console.log(content);

            // --------------------------------------
            // 画像ファイルのドロップを処理
            // _sys/image に当てはめて挿入します。
            originalFileFirstname = originalFileFirstname.split(/[^a-zA-Z0-9]/).join('_');

            var base64 = content.replace(/^data\:[a-zA-Z0-9]+\/[a-zA-Z0-9]+\;base64\,/i, '');
            var clipContents = {
                'data': [
                    {
                        "modId": options.packageId + ":basics/image",
                        "fields": {
                            "image_src": {
                                "resKey": "___dropped_local_image___",
                                "path": "",
                                "resType": "",
                                "webUrl": ""
                            },
                            "alt_text": ""
                        }
                    }
                ],
                'resources': {
                    "___dropped_local_image___": {
                        "ext": originalFileExt,
                        "type": mimetype,
                        "size": originalFileSize,
                        "base64": base64,
                        "isPrivateMaterial": false,
                        "publicFilename": originalFileFirstname,
                        "md5": "",
                        "field": "image",
                        "fieldNote": {}
                    }
                }
            };
            callback(clipContents);
            return;
        }

        reader.readAsDataURL(fileInfo);
        return;
    }
}
