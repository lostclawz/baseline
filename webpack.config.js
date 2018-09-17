const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const WebpackNotifierPlugin = require('webpack-notifier');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CleanWebpackPlugin = require("clean-webpack-plugin");
const PACKAGE = require('./package.json');


const WEBPACK_DEV_SERVER_PORT = PACKAGE['app-ports']['webpack-port'];
let SITE_TITLE = PACKAGE.name;
const jsEntry = path.resolve(__dirname, 'src', 'index.js');
const distDir = path.resolve(__dirname, "public");


module.exports = function(env, argv){
	const  devMode = !env || !env.production;
	if (devMode){
		SITE_TITLE += ` [dev ${PACKAGE.version}]`;
	}
	return {
		mode: devMode ? 'development' : 'production',
		entry: {
			'app': devMode
				? ['react-hot-loader/patch', jsEntry]
				: [jsEntry]
		},
		output: {
			filename: devMode
				? "js/[name].js"
				: "js/[name].[chunkhash].js",
			path: __dirname + "/public",
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
						loader: 'babel-loader',
						options: {cacheDirectory: devMode ? true : false}
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
									let plugins = [
										require('autoprefixer')
									];
									if (!devMode){
										plugins.push(require('cssnano'))
									}
									return plugins;
								}
							}
						},
						{loader: "resolve-url-loader", options: {sourceMap: true}},
						{loader: "sass-loader", options: {sourceMap: true}}
					]
				}
			]
		},
		performance: {
			hints: false
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
			devMode
				? new webpack.HotModuleReplacementPlugin()
				: new BundleAnalyzerPlugin(),
			new HtmlWebpackPlugin({
				"title": SITE_TITLE,
				template: __dirname + "/src/index.html",
				chunksSortMode: "none"
			}),
			new CleanWebpackPlugin([
				path.join(distDir, 'js'),
				path.join(distDir, 'style')
			], {
				root: __dirname
			}),
			new webpack.DefinePlugin({
				PRODUCTION: JSON.stringify(!devMode),
				VERSION: JSON.stringify(PACKAGE.version),
				OFFLINE: JSON.stringify(true)
			}),
			new MiniCssExtractPlugin({
				filename: "./style/[name].[hash].css"
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
		watch: devMode ? true : false
	};
}