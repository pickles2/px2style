const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix
	.webpackConfig({
		module: {
			rules:[
				{
					test: /\.txt$/i,
					use: ['raw-loader'],
				},
				{
					test: /\.csv$/i,
					loader: 'csv-loader',
					options: {
						dynamicTyping: true,
						header: false,
						skipEmptyLines: false,
					},
				},
				{
					test:/\.twig$/,
					use:['twig-loader']
				},
				{
					test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
					type: "asset/inline"
				}
			]
		},
		resolve: {
			fallback: {
				"fs": false,
				"path": false,
				"crypto": false,
				"stream": false,
			}
		}
	})
	.sourceMaps(true, 'inline-source-map')


	// --------------------------------------
	// fields: cssMarginPadding
	.js('./src_broccoli/fields/cssMarginPadding/cssMarginPadding.js', './fields/cssMarginPadding/frontend/')
	.sass('src_broccoli/fields/cssMarginPadding/cssMarginPadding.css.scss', './fields/cssMarginPadding/frontend/cssMarginPadding.css')

	// --------------------------------------
	// fields: image
	.js('./src_broccoli/fields/image/image.js', './fields/image/frontend/')
	.sass('src_broccoli/fields/image/image.css.scss', './fields/image/frontend/image.css')

	// --------------------------------------
	// fields: imageList
	.js('./src_broccoli/fields/imageList/image-list.js', './fields/imageList/frontend/')
	.sass('src_broccoli/fields/imageList/image-list.css.scss', './fields/imageList/frontend/image-list.css')

	// --------------------------------------
	// modules: basics/_
	.js('./src_broccoli/modules/basics/basics/_/module.js', './broccoli_modules/basics/basics/_/module.js')
	.sass('./src_broccoli/modules/basics/basics/_/module.css.scss', './broccoli_modules/basics/basics/_/module.css')

	// --------------------------------------
	// modules: interactives/image-slider
	.js('./src_broccoli/modules/basics/interactives/image-slider/module.js', './broccoli_modules/basics/interactives/image-slider/module.js')

	// --------------------------------------
	// px2style
	.js('./src_px2style/px2style.js', './dist/px2style.js')
	.sass('./src_px2style/px2style.css.scss', './dist/px2style.css')

	// px2style - Theme
	.sass('./src_px2style/_src/themes/auto/auto.css.scss', './dist/themes/auto.css')
	.copy('./dist/themes/auto.css', './src_px2/px-files/themes/auto/theme_files/styles/px2style-theme-auto.css')
	.sass('./src_px2style/_src/themes/default/default.css.scss', './dist/themes/default.css')
	.copy('./dist/themes/default.css', './src_px2/px-files/themes/default/theme_files/styles/px2style-theme-default.css')
	.sass('./src_px2style/_src/themes/darkmode/darkmode.css.scss', './dist/themes/darkmode.css')
	.copy('./dist/themes/darkmode.css', './src_px2/px-files/themes/darkmode/theme_files/styles/px2style-theme-darkmode.css')
;
