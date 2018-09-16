const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const WebpackNotifierPlugin = require('webpack-notifier');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CleanWebpackPlugin = require("clean-webpack-plugin");


// constants
var pkg = require('./package.json');
const WEBPACK_DEV_SERVER_PORT = pkg['app-ports']['webpack-port'];
let SITE_TITLE = pkg.name;
const jsEntry = "./src/index.js";


module.exports = function(env, argv){
   var outputPath = __dirname + "/public";
   var distDir = path.resolve(__dirname, "public");
   var mode = env && env.production ? "production" : "development";
	if (mode === 'development'){
		// ******************
		// DEVELOPMENT CONFIG
		// ******************npm 
		SITE_TITLE += ` [dev ${pkg.version}]`;
		return {
			mode,
			entry: {
            'app': [
               'react-hot-loader/patch',
               jsEntry
            ]
         },
			output: {
            filename: "js/[name].js",
            path: outputPath,
            globalObject: "this"
         },
			module: {
				rules: [
               {
                  test: /\.worker\.js$/,
                  use: {loader: 'worker-loader'}
               },
					{
						test: /.jsx?$/,
						exclude: /node_modules/,
						use: [{
							loader: 'babel-loader', options: {
								cacheDirectory: true
							}
						}]
					},
					{
						test: /\.(woff|woff2|eot|ttf|svg)$/,
						exclude: /node_modules/,
						use: 'file-loader?limit=1024&name=fonts/[name].[ext]'
					},
					{
						test: /\.scss$/,
						use: [
							{ loader: "style-loader" },
							{
								loader: "css-loader", options: {
									sourceMap: true,
									url: false
								}
							},
							{
								loader: "postcss-loader", options: {
									sourceMap: true,
									plugins: function () {
										return [
											require('autoprefixer')
										];
									}
								}
							},
							{ loader: "resolve-url-loader", options: { sourceMap: true } },
							{ loader: "sass-loader", options: { sourceMap: true } }
						]
					}
				]
			},
			performance: {
				hints: false
			},
			plugins: [
            new webpack.HotModuleReplacementPlugin(),
				new HtmlWebpackPlugin({
					"title": SITE_TITLE,
					// "favicon": FAV_ICON,
					template: __dirname + "/src/index.html",
					chunksSortMode: "none"
				}),
				new webpack.DefinePlugin({
					PRODUCTION: JSON.stringify(false),
               VERSION: JSON.stringify(require('./package.json').version),
               OFFLINE: JSON.stringify(true)
				}),
				new webpack.NamedModulesPlugin(),
            new WebpackNotifierPlugin({
               title: SITE_TITLE,
               contentImage: ""
            })
			],
			resolve: {
				extensions: ['.js', '.jsx', '.es6', '.ts', '.tsx']
			},
			devServer: {
				host: 'localhost',
				port: WEBPACK_DEV_SERVER_PORT,
				hot: true,
            publicPath: '/',
				contentBase: './public',
				historyApiFallback: true,
				open: false, // to open the local server in browser
			},
         devtool: "cheap-module-source-map",
			watch: true
		};
	}
	else{
		// *****************
		// PRODUCTION CONFIG
		// *****************
		return {
			mode,
			entry: {"app": [jsEntry]},
			output: {
            filename: "js/[name].[chunkhash].js",
            path: __dirname + "/public"
         },
			resolve: {
				extensions: ['.js', '.jsx', '.es6', '.ts', '.tsx']
			},
			module: {
				rules: [
               {
                  test: /\.worker\.js$/,
                  use: { loader: 'worker-loader' }
               },
					{
						test: /\.jsx?$/,
						use: ['babel-loader'],
						exclude: /node_modules/
					},
					{
						test: /\.(woff|woff2|eot|ttf|svg)$/,
						exclude: /node_modules/,
						use: 'file-loader?limit=1024&name=public/fonts/[name].[ext]'
					},
					{
						test: /\.scss$/,
						use: [
							{ loader: MiniCssExtractPlugin.loader },
							{
								loader: "css-loader",
								options: {
									sourceMap: true,
									url: false,
									minimize: true
								}
							},
							{
								loader: "postcss-loader",
								options: {
									sourceMap: true,
									plugins: function () {
										return [
											require('autoprefixer'),
											require('cssnano')
										];
									}
								}
							},
							{ loader: "resolve-url-loader", options: { sourceMap: true } },
							{ loader: "sass-loader", options: { sourceMap: true } }
						]
					}
				]
			},
         optimization: {
            splitChunks: {
               cacheGroups: {
                  commons: {
                     test: /[\\/]node_modules[\\/]/,
                     name: "vendor",
                     chunks: "all"
                  }
               }
            }
         },
			plugins: [
            new BundleAnalyzerPlugin(),
            new CleanWebpackPlugin([
               path.join(distDir, 'js'),
               path.join(distDir, 'style')
            ], {
               root: __dirname
            }),
				new HtmlWebpackPlugin({
					"template": "./src/index.html",
					"title": SITE_TITLE,
					chunksSortMode: "none"
            }),
				new webpack.DefinePlugin({
					PRODUCTION: JSON.stringify(true),
               VERSION: JSON.stringify(require('./package.json').version),
               OFFLINE: JSON.stringify(true)
				}),
				new webpack.NamedModulesPlugin(),
				new webpack.LoaderOptionsPlugin({ minimize: true }),
            new MiniCssExtractPlugin({
					filename: "./style/[name].[hash].css"
				}),
            new WebpackNotifierPlugin({ title: SITE_TITLE })
			]
		}
	}
}