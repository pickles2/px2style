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
	.js('./src_mix/fields/cssMarginPadding/cssMarginPadding.js', './fields/cssMarginPadding/frontend/')
	.sass('src_mix/fields/cssMarginPadding/cssMarginPadding.css.scss', './fields/cssMarginPadding/frontend/cssMarginPadding.css')

	// --------------------------------------
	// px2style
	.js('./src_px2style/_src/main.js', './px2style/px2style.js')
	.sass('src_px2style/px2style.css.scss', './px2style/px2style.css')

;
