var conf = require('config');
console.log(conf);

var path = require('path');
var gulp = require('gulp');
var sass = require('gulp-sass');//CSSコンパイラ
var base64 = require('gulp-base64');//CSS中のurlをbase64+dataschemeに置き換える
var inline_base64 = require('gulp-inline-base64')
var autoprefixer = require("gulp-autoprefixer");//CSSにベンダープレフィックスを付与してくれる
var uglify = require("gulp-uglify");//JavaScriptファイルの圧縮ツール
var concat = require('gulp-concat');//ファイルの結合ツール
var plumber = require("gulp-plumber");//コンパイルエラーが起きても watch を抜けないようになる
var rename = require("gulp-rename");//ファイル名の置き換えを行う
var twig = require("gulp-twig");//Twigテンプレートエンジン
var browserify = require("gulp-browserify");//NodeJSのコードをブラウザ向けコードに変換
var styleguide = require('sc5-styleguide');//generating styleguide
var packageJson = require(__dirname+'/package.json');
var _tasks = [
	'.html',
	'.html.twig',
	'.css',
	'.css.scss',
	'.js',
	'copy',
	'styleguide:generate',
	'styleguide:applystyles',
	'styleguide:applyimages'
];


// コピーするだけのファイルを処理
gulp.task('copy', function(){
	gulp.src(["src/**/*.svg"])
		.pipe(gulp.dest( './dist/' ))
		.pipe(gulp.dest( './styleguide/dist/' ))
	;
});

// src 中の *.css.scss を処理
gulp.task('.css.scss', function(){
	gulp.src(["src/**/*.css.scss", "!src/**/_*.css.scss", ])
		.pipe(plumber())
		.pipe(sass())
		.pipe(inline_base64({
			baseDir: 'src/',
			debug: true
		}))
		.pipe(autoprefixer())
		.pipe(rename({extname: ''}))
		.pipe(gulp.dest( './dist/' ))
		.pipe(gulp.dest( './styleguide/dist/' ))
	;
});

// src 中の *.css を処理
gulp.task('.css', function(){
	gulp.src("src/**/*.css")
		.pipe(plumber())
		.pipe(gulp.dest( './dist/' ))
		.pipe(gulp.dest( './styleguide/dist/' ))
	;
});

// *.js を処理
gulp.task(".js", function() {
	gulp.src(["src/**/*.js", "!src/**/_*.js"])
		.pipe(plumber())
		.pipe(browserify({
		}))
		// .pipe(uglify())
		.pipe(gulp.dest( './dist/' ))
		.pipe(gulp.dest( './styleguide/dist/' ))
	;
});

// *.html を処理
gulp.task(".html", function() {
	gulp.src(["src/**/*.html", "src/**/*.htm"])
		.pipe(plumber())
		.pipe(gulp.dest( './dist/' ))
		.pipe(gulp.dest( './styleguide/dist/' ))
	;
});

// *.html.twig を処理
gulp.task(".html.twig", function() {
	gulp.src(["src/**/*.html.twig"])
		.pipe(plumber())
		.pipe(twig({
			data: {
				packageJson: packageJson,
				conf: conf
			}
		}))
		.pipe(rename({extname: ''}))
		.pipe(gulp.dest( './dist/' ))
		.pipe(gulp.dest( './styleguide/dist/' ))
	;
});


gulp.task('styleguide:generate', function() {
	gulp.src(['src/**/*.css.scss'])
		.pipe(styleguide.generate({
			title: 'Pickles 2 CSS Components.',
			server: true,
			port: 3000,
			rootPath: 'styleguide',
			overviewPath: 'README.md',
			extraHead: [
				'<script src="/dist/scripts.js"></script>',
				'<link rel="stylesheet" href="/dist/styles.css" />'
			],
		}))
		.pipe(gulp.dest('styleguide'))
	;
});

gulp.task('styleguide:applystyles', function() {
	gulp.src('src/**/*.css.scss')
		.pipe(sass({
			errLogToConsole: true
		}))
		.pipe(inline_base64({
			baseDir: 'src/',
			debug: true
		}))
		.pipe(styleguide.applyStyles())
		.pipe(gulp.dest('styleguide'))
	;
});

gulp.task('styleguide:applyimages', function() {
  return gulp.src('src/images/**/*')
	.pipe(gulp.dest('styleguide/images'));
});

// src 中のすべての拡張子を監視して処理
gulp.task("watch", function() {
	gulp.watch(["src/**/*"], _tasks);
});

// ブラウザでプレビュー
gulp.task("preview", function() {
	require('child_process').spawn('open',['http://127.0.0.1:3000/']);
});

// src 中のすべての拡張子を処理(default)
gulp.task("default", _tasks);
