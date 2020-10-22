let conf = require('config');
console.log(conf);

let path = require('path');
let gulp = require('gulp');
let sass = require('gulp-sass');//CSSコンパイラ
let base64 = require('gulp-base64');//CSS中のurlをbase64+dataschemeに置き換える
let inline_base64 = require('gulp-inline-base64')
let autoprefixer = require("gulp-autoprefixer");//CSSにベンダープレフィックスを付与してくれる
let uglify = require("gulp-uglify");//JavaScriptファイルの圧縮ツール
let concat = require('gulp-concat');//ファイルの結合ツール
let plumber = require("gulp-plumber");//コンパイルエラーが起きても watch を抜けないようになる
let rename = require("gulp-rename");//ファイル名の置き換えを行う
let twig = require("gulp-twig");//Twigテンプレートエンジン
let browserify = require("gulp-browserify");//NodeJSのコードをブラウザ向けコードに変換
let styleguide = require('sc5-styleguide');//generating styleguide
let packageJson = require(__dirname+'/package.json');


// コピーするだけのファイルを処理
gulp.task('copy', function(){
	return gulp.src(["src/**/*.svg"])
		.pipe(gulp.dest( './dist/' ))
		.pipe(gulp.dest( './styleguide/dist/' ))
	;
});

// src 中の *.css.scss を処理
gulp.task('.css.scss', function(){
	return gulp.src(["src/**/*.css.scss", "!src/**/_*.css.scss", ])
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
	return gulp.src("src/**/*.css")
		.pipe(plumber())
		.pipe(gulp.dest( './dist/' ))
		.pipe(gulp.dest( './styleguide/dist/' ))
	;
});

// *.js を処理
gulp.task(".js", function() {
	return gulp.src(["src/**/*.js", "!src/**/_*.js"])
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
	return gulp.src(["src/**/*.html", "src/**/*.htm"])
		.pipe(plumber())
		.pipe(gulp.dest( './dist/' ))
		.pipe(gulp.dest( './styleguide/dist/' ))
	;
});

// *.html.twig を処理
gulp.task(".html.twig", function() {
	return gulp.src(["src/**/*.html.twig"])
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
	return gulp.src(['src/**/*.css.scss'])
		.pipe(styleguide.generate({
			title: 'Pickles 2 CSS Components.',
			server: true,
			port: 3000,
			rootPath: 'styleguide',
			overviewPath: 'README.md',
			extraHead: [
				'<script src="/dist/px2style.js"></script>',
				'<link rel="stylesheet" href="/dist/px2style.css" />'
			],
		}))
		.pipe(gulp.dest('styleguide'))
	;
});

gulp.task('styleguide:applystyles', function() {
	return gulp.src('src/**/*.css.scss')
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

// ブラウザでプレビュー
gulp.task("preview", function(callback) {
	require('child_process').spawn('open',['http://127.0.0.1:3000/']);
	callback();
});


let _tasks = [
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

// src 中のすべての拡張子を監視して処理
gulp.task("watch", function() {
	return gulp.watch(["src/**/*"], _tasks);
});

// src 中のすべての拡張子を処理(default)
gulp.task("default", _tasks);
