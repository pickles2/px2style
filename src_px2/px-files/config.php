<?php
/**
 * config.php template
 */
return call_user_func( function(){

	if( is_file(__DIR__.'/../.env') ){
		$dotenv = \Dotenv\Dotenv::createImmutable( __DIR__.'/../' );
		$dotenv->load();
	}

	// initialize

	/** コンフィグオブジェクト */
	$conf = new stdClass;


	// project

	/** サイト名 */
	$conf->name = 'Pickles 2 CSS Modules';

	/** コピーライト表記 */
	$conf->copyright = 'Pickles Project';

	/**
	 * スキーマ
	 * 本番環境のスキーマ
	 * (例: http, https)
	 */
	$conf->scheme = 'https';

	/**
	 * ドメイン
	 * 本番環境のドメイン
	 * (例: www.example.com, 192.168.0.1, www.example.com:8080, etc...)
	 */
	$conf->domain = null;

	/** コンテンツルートディレクトリ */
	$conf->path_controot = '/';


	// paths

	/** トップページのパス(デフォルト "/") */
	$conf->path_top = '/';

	/** パブリッシュ先ディレクトリパス */
	$conf->path_publish_dir = '../docs/';

	/** 公開キャッシュディレクトリ */
	$conf->public_cache_dir = '/common/px_resources/';

	/**
	 * リソースディレクトリ(各コンテンツに対して1:1で関連付けられる)のパス
	 *
	 * 次の部品を組み合わせて、書き換え後のパスの構成規則を指定します。
	 * - `{$dirname}` = 変換前のパスの、ディレクトリ部分
	 * - `{$filename}` = 変換前のパスの、拡張子を除いたファイル名部分
	 * - `{$ext}` = 変換前のパスの、拡張子部分
	 *
	 * または次のように、コールバックメソッドを指定します。
	 * ```
	 * $conf->path_files = function($path){
	 * 	$path = preg_replace('/.html?$/s', '_files/', $path);
	 * 	return $path;
	 * };
	 * ```
	 * コールバックメソッドには、 引数 `$path` が渡されます。
	 * これを加工して、書き換え後のパスを返してください。
	 */
	$conf->path_files = '{$dirname}/{$filename}_files/';

	/** Contents Manifesto のパス */
	$conf->contents_manifesto = '/common/contents_manifesto.ignore.php';


	/**
	 * commands
	 *
	 * Pickles2 が認識するコマンドのパスを設定します。
	 * コマンドのパスが通っていない場合は、絶対パスで設定してください。
	 */
	$conf->commands = new stdClass;
	$conf->commands->php = 'php';

	/**
	 * php.ini のパス
	 *
	 * 主にパブリッシュ時のサブクエリで使用します。
	 */
	$conf->path_phpini = null;


	/**
	 * directory index
	 *
	 * `directory_index` は、省略できるファイル名のリストを設定します。
	 * 複数指定可能です。
	 *
	 * この一覧にリストされたファイル名に対するリンクは、ファイル名なしのURLと同一視されます。
	 * ファイル名が省略されたアクセス(末尾が `/` の場合)に対しては、
	 * 最初のファイル名と同じものとして処理します。
	 */
	$conf->directory_index = array(
		'index.html'
	);


	/**
	 * paths_proc_type
	 *
	 * パスのパターン別に処理方法を設定します。
	 *
	 * - ignore = 対象外パス。Pickles 2 のアクセス可能範囲から除外します。このパスへのアクセスは拒絶され、パブリッシュの対象からも外されます。
	 * - direct = 物理ファイルを、ファイルとして読み込んでから加工処理を通します。 (direct以外の通常の処理は、PHPファイルとして `include()` されます)
	 * - pass = 物理ファイルを、そのまま無加工で出力します。 (デフォルト)
	 * - その他 = extension名
	 *
	 * パターンは先頭から検索され、はじめにマッチした設定を採用します。
	 * ワイルドカードとして "*"(アスタリスク) が使用可能です。
	 * 部分一致ではなく、完全一致で評価されます。従って、ディレクトリ以下すべてを表現する場合は、 `/*` で終わるようにしてください。
	 *
	 * extensionは、 `$conf->funcs->processor` に設定し、設定した順に実行されます。
	 * 例えば、 '*.html' => 'html' にマッチしたリクエストは、
	 * $conf->funcs->processor->html に設定したプロセッサのリストに沿って、上から順に処理されます。
	 */
	$conf->paths_proc_type = array(
		'/.htaccess' => 'ignore' ,
		'/.px_execute.php' => 'ignore' ,
		'/px-files/*' => 'ignore' ,
		'*.ignore/*' => 'ignore' ,
		'*.ignore.*' => 'ignore' ,
		'/composer.json' => 'ignore' ,
		'/composer.lock' => 'ignore' ,
		'/README.md' => 'ignore' ,
		'/vendor/*' => 'ignore' ,
		'*/.DS_Store' => 'ignore' ,
		'*/Thumbs.db' => 'ignore' ,
		'*/.svn/*' => 'ignore' ,
		'*/.git/*' => 'ignore' ,
		'*/.gitignore' => 'ignore' ,

		'*.html' => 'html' ,
		'*.htm' => 'html' ,
		'*.css' => 'css' ,
		'*.js' => 'js' ,
		'*.png' => 'pass' ,
		'*.jpg' => 'pass' ,
		'*.gif' => 'pass' ,
		'*.svg' => 'pass' ,
	);


	/**
	 * paths_enable_sitemap
	 *
	 * サイトマップのロードを有効にするパスのパターンを設定します。
	 * ワイルドカードとして "*"(アスタリスク) が使用可能です。
	 *
	 * サイトマップ中のページ数が増えると、サイトマップのロード自体に時間を要する場合があります。
	 * サイトマップへのアクセスが必要ないファイルでは、この処理はスキップするほうがよいでしょう。
	 *
	 * 多くの場合では、 *.html と *.htm 以外ではロードする必要はありません。
	 */
	$conf->paths_enable_sitemap = array(
		'*.html',
		'*.htm',
	);


	// system

	/** ファイルに適用されるデフォルトのパーミッション */
	$conf->file_default_permission = '775';

	/** ディレクトリに適用されるデフォルトのパーミッション */
	$conf->dir_default_permission = '775';

	/** ファイルシステムの文字セット。ファイル名にマルチバイト文字を使う場合に参照されます。 */
	$conf->filesystem_encoding = 'UTF-8';

	/** 出力文字エンコーディング名 */
	$conf->output_encoding = 'UTF-8';

	/** 出力改行コード名 (cr|lf|crlf) */
	$conf->output_eol_coding = 'lf';

	/** セッション名 */
	$conf->session_name = 'PXSID';

	/** セッションの有効期間 */
	$conf->session_expire = 1800;

	/** タイムゾーン */
	$conf->default_timezone = 'Asia/Tokyo';

	/**
	 * PX Commands のウェブインターフェイスからの実行を許可
	 *
	 * ※ 注意 :
	 * PXコマンドは、Pickles 2 を便利に使うためのさまざまな機能を提供します。
	 * (例：パブリッシュ機能 `?PX=publish`)
	 * PXコマンドはサーバー内部の情報にアクセスしたり、
	 * サーバー上のデータを書き換えるインターフェイスを提供する場合があるため、
	 * 第3者にアクセスされると大変キケンです。
	 * 
	 * Pickles 2 をインターネット上のサーバーで動かす場合には、次のことに注意してください。
	 * 
	 * - ウェブ制作環境として利用する場合、利用基本認証やIP制限などの処理を施し、
	 *   一般のユーザーがアクセスできない場所に設置してください。
	 * - または、Pickles 2 上に構築したウェブアプリケーションをサービスとして公開する場合、
	 *   この値を 0 に設定し、PXコマンド機能を無効にしてください。(この場合でも、CLIからの実行は許可されます)
	 */
	$conf->allow_pxcommands = 1;



	// -------- functions --------

	$conf->funcs = new stdClass;

	/**
	 * funcs: Before sitemap
	 *
	 * サイトマップ読み込みの前に実行するプラグインを設定します。
	 */
	$conf->funcs->before_sitemap = array(
		// px2-clover
		\tomk79\pickles2\px2clover\register::clover(array(
			"protect_preview" => false, // プレビューに認証を要求するか？
		)),

		// PX=clearcache
		'picklesFramework2\commands\clearcache::register' ,

		// PX=config
		'picklesFramework2\commands\config::register' ,

		// PX=phpinfo
		'picklesFramework2\commands\phpinfo::register' ,

		// px2-serve
		\tomk79\pickles2\px2serve\serve::register(),

	);

	$devices = array();
	foreach( array('darkmode') as $theme_id ){
		array_push( $devices, array(
			'user_agent'=>'Mozilla/',$theme_id,
			'params' => array(
				'THEME' => $theme_id,
			),
			'path_publish_dir'=>'../docs/',
			'path_rewrite_rule'=>'/_'.$theme_id.'{$dirname}/{$filename}.{$ext}',
			'paths_target'=>array(
				'/*',
			),
			'paths_ignore'=>array(
				// '/common/*',
			),

			// リンクの書き換え方向
			// `origin2origin`、`origin2rewrited`、`rewrited2origin`、`rewrited2rewrited` のいずれかで指定します。
			// `origin` は変換前のパス、 `rewrited` は変換後のパスを意味します。
			// 変換前のパスから変換後のパスへのリンクとして書き換える場合は `origin2rewrited` のように指定します。
			'rewrite_direction'=>'rewrited2rewrited',
		) );
	}

	/**
	 * funcs: Before content
	 *
	 * サイトマップ読み込みの後、コンテンツ実行の前に実行するプラグインを設定します。
	 */
	$conf->funcs->before_content = array(
		// PX=api
		'picklesFramework2\commands\api::register' ,

		// PX=publish (px2-publish-ex)
		'tomk79\pickles2\publishEx\publish::register('.json_encode(array(
			'devices' => $devices,
			'enable_cache_buster' => true,
		)).')' ,

		// PX=px2dthelper
		'tomk79\pickles2\px2dthelper\main::register' ,
	);


	/**
	 * processor
	 *
	 * コンテンツの種類に応じた加工処理の設定を行います。
	 * `$conf->funcs->processor->{$paths_proc_typeに設定した処理名}` のように設定します。
	 * それぞれの処理は配列で、複数登録することができます。処理は上から順に実行されます。
	 *
	 * Tips: テーマは、html に対するプロセッサの1つとして実装されています。
	 */
	$conf->funcs->processor = new stdClass;

	$conf->funcs->processor->html = array(
		// ページ内目次を自動生成する
		\picklesFramework2\processors\autoindex\autoindex::exec(array(
			'class' => 'px2-index-list',
		)),

		// テーマ
		'theme'=>'tomk79\pickles2\multitheme\theme::exec('.json_encode(array(
			'param_theme_switch'=>'THEME',
			'cookie_theme_switch'=>'THEME',
			'path_theme_collection'=>'./px-files/themes/',
			'attr_bowl_name_by'=>'data-contents-area',
			'default_theme_id' => 'default',
		)).')' ,

		// Apache互換のSSIの記述を解決する
		'picklesFramework2\processors\ssi\ssi::exec' ,

		// broccoli-receive-message スクリプトを挿入
		'tomk79\pickles2\px2dthelper\broccoli_receive_message::apply('.json_encode( array(
			// 許可する接続元を指定
			'enabled_origin'=>array(
			)
		) ).')' ,

	);

	$conf->funcs->processor->css = array(
	);

	$conf->funcs->processor->js = array(
	);

	$conf->funcs->processor->md = array(
		// Markdown文法を処理する
		'picklesFramework2\processors\md\ext::exec' ,

		// html のデフォルトの処理を追加
		$conf->funcs->processor->html ,
	);

	$conf->funcs->processor->scss = array(
		// SCSS文法を処理する
		'picklesFramework2\processors\scss\ext::exec' ,

		// css のデフォルトの処理を追加
		$conf->funcs->processor->css ,
	);


	/**
	 * funcs: Before output
	 *
	 * 最終出力の直前で実行される処理を設定します。
	 * この処理は、拡張子によらずすべてのリクエストが対象です。
	 * (HTMLの場合は、テーマの処理の後のコードが対象になります)
	 */
	$conf->funcs->before_output = array(
		// px2-path-resolver - 相対パス・絶対パスを変換して出力する
		//   options
		//     string 'to':
		//       - relate: 相対パスへ変換
		//       - absolute: 絶対パスへ変換
		//       - pass: 変換を行わない(default)
		//     bool 'supply_index_filename':
		//       - true: 省略されたindexファイル名を補う
		//       - false: 省略できるindexファイル名を削除
		//       - null: そのまま (default)
		'tomk79\pickles2\pathResolver\main::exec('.json_encode(array(
			'to' => 'relate' ,
			'supply_index_filename' => false,
		)).')' ,

		// output_encoding, output_eol_coding の設定に従ってエンコード変換する。
		'picklesFramework2\processors\encodingconverter\encodingconverter::exec('.json_encode(array(
			'ext'=>array( // 対象の拡張子。省略時はすべてのリクエストが適用される。
				'html',
				'htm',
				'css',
				'js',
			),
		)).')' ,

	);


	// -------- config for Plugins. --------
	// その他のプラグインに対する設定を行います。
	$conf->plugins = new stdClass;

	/** config for Pickles 2 Desktop Tool. */
	$conf->plugins->px2dt = new stdClass;

	/**
	 * GUIエディタのエンジンの種類
	 * - `legacy` = 旧GUI編集ツール。(廃止)
	 * - `broccoli-html-editor` = NodeJSで実装された broccoli-html-editor を使用。
	 * - `broccoli-html-editor-php` = PHPで実装された broccoli-html-editor を使用。
	 */
	$conf->plugins->px2dt->guiEngine = 'broccoli-html-editor-php';

	/** broccoliモジュールセットの登録 */
	$conf->plugins->px2dt->paths_module_template = array(
		'px2style' => './../broccoli_modules/basics/',
	);

	/** プロジェクト固有のモジュールセットの格納ディレクトリ */
	$conf->plugins->px2dt->path_module_templates_dir = "./px-files/modules/";

	/** コンテンツエリアを識別するセレクタ(複数の要素がマッチしてもよい) */
	$conf->plugins->px2dt->contents_area_selector = '[data-contents-area]';

	/** コンテンツエリアのbowl名を指定する属性名 */
	$conf->plugins->px2dt->contents_bowl_name_by = 'data-contents-area';

	/** パブリッシュのパターンを登録 */
	$conf->plugins->px2dt->publish_patterns = array(
		array(
			'label'=>'すべて',
			'paths_region'=> array('/'),
			'paths_ignore'=> array(),
			'keep_cache'=>false
		),
		array(
			'label'=>'リソース類',
			'paths_region'=> array('/common/'),
			'paths_ignore'=> array(),
			'keep_cache'=>true
		),
		array(
			'label'=>'すべて(commonを除く)',
			'paths_region'=> array('/'),
			'paths_ignore'=> array('/common/'),
			'keep_cache'=>false
		),
	);

	/** config for GUI Editor. */
	$conf->plugins->px2dt->guieditor = new stdClass;

	/** GUI編集データディレクトリ */
	// $conf->plugins->px2dt->guieditor->path_data_dir = '{$dirname}/{$filename}_files/guieditor.ignore/';

	/** GUI編集リソース出力先ディレクトリ */
	// $conf->plugins->px2dt->guieditor->path_resource_dir = '{$dirname}/{$filename}_files/resources/';

	@$conf->plugins->px2dt->guieditor->custom_fields = array(
		'px2style__css-margin-padding'=>array(
			'backend'=>array(
				'class' => 'pickles2\\px2style\\fields\\cssMarginPadding\\backend',
				'require' => '../fields/cssMarginPadding/backend.js',
			),
			'frontend'=>array(
				'dir' => '../fields/cssMarginPadding/frontend/',
				'file' => array(
					'cssMarginPadding.css',
					'cssMarginPadding.js',
				),
				'function' => 'window.broccoliModulePx2StyleCssMarginPadding',
			),
		),
		'image'=>array(
			'backend'=>array(
				'class' => 'pickles2\\px2style\\fields\\image\\backend',
				'require' => '../fields/image/backend.js',
			),
			'frontend'=>array(
				'dir' => '../fields/image/frontend/',
				'file' => array(
					'image.css',
					'image.js',
				),
				'function' => 'window.broccoliModulePx2StyleImage',
			),
		),
		'px2style__image-list'=>array(
			'backend'=>array(
				'class' => 'pickles2\\px2style\\fields\\imageList\\backend',
				'require' => '../fields/imageList/backend.js',
			),
			'frontend'=>array(
				'dir' => '../fields/imageList/frontend/',
				'file' => array(
					'image-list.css',
					'image-list.js',
				),
				'function' => 'window.broccoliModulePx2StyleImageList',
			),
		),
	);

	$droppedImageOperator = \pickles2\px2style\utils::droppedFileOperator('image');
	@$conf->plugins->px2dt->guieditor->dropped_file_operator = array(
		'png' => $droppedImageOperator,
		'gif' => $droppedImageOperator,
		'jpg' => $droppedImageOperator,
		'webp' => $droppedImageOperator,
		'svg' => $droppedImageOperator,
		'application/svg+xml' => $droppedImageOperator,
	);

	$conf->plugins->px2dt->guieditor->field_config = array(
		// image フィールドを設定
		'image' => array(
			// 'filenameAutoSetter' => 'random', // random = 画像ファイル名をランダムに自動命名する。
			'format' => array(
				'maxWidth' => 1600,
				'quality' => 0.2,
				'mimeType' => 'image/webp',
			),
		),
	);


	// -------- PHP Setting --------

	/**
	 * `memory_limit`
	 *
	 * PHPのメモリの使用量の上限を設定します。
	 * 正の整数値で上限値(byte)を与えます。
	 *
	 *     例: 1000000 (1,000,000 bytes)
	 *     例: "128K" (128 kilo bytes)
	 *     例: "128M" (128 mega bytes)
	 *
	 * -1 を与えた場合、無限(システムリソースの上限まで)に設定されます。
	 * サイトマップやコンテンツなどで、容量の大きなデータを扱う場合に調整してください。
	 */
	@ini_set( 'memory_limit' , -1 );

	/**
	 * `display_errors`, `error_reporting`
	 *
	 * エラーを標準出力するための設定です。
	 *
	 * PHPの設定によっては、エラーが発生しても表示されない場合があります。
	 * もしも、「なんか挙動がおかしいな？」と感じたら、
	 * 必要に応じてこれらのコメントを外し、エラー出力を有効にしてみてください。
	 *
	 * エラーメッセージは問題解決の助けになります。
	 */
	@ini_set('display_errors', 1);
	@ini_set('error_reporting', E_ALL);


	return $conf;
} );
