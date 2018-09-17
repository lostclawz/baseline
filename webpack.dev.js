const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const WebpackNotifierPlugin = require('webpack-notifier');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path');
const PACKAGE = require('./package.json');
const WEBPACK_DEV_SERVER_PORT = PACKAGE['app-ports']['webpack-port'];


const SITE_TITLE = `${PACKAGE.name} [dev ${PACKAGE.version}]`;

module.exports = merge.smart(common, {
   mode: 'development',
   entry: {
      'app': [
         'react-hot-loader/patch',
         path.resolve(__dirname, 'src', 'index.js')
      ]
   },
   output: {
      filename: "js/[name].js"
   },
   module: {
      rules: [
         {
            test: /.jsx?$/,
            exclude: /node_modules/,
            use: [{
               loader: 'babel-loader',
               options: {cacheDirectory: true}
            }]
         },
         {
            test: /\.scss$/,
            use: [
               {loader: "style-loader"},
               {
                  loader: "css-loader",
                  options: {
                     sourceMap: true,
                     url: false
                  }
               },
               {
                  loader: "postcss-loader",
                  options: {
                     sourceMap: true,
                     plugins: function () {
                        return [require('autoprefixer')];
                     }
                  }
               },
               {loader: "resolve-url-loader", options: {sourceMap: true}},
               {loader: "sass-loader", options: {sourceMap: true}}
            ]
         }
      ]
   },
   plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
         "title": SITE_TITLE,
         template: __dirname + "/src/index.html",
         chunksSortMode: "none"
      }),
      new webpack.DefinePlugin({
         PRODUCTION: JSON.stringify(false),
         VERSION: JSON.stringify(PACKAGE.version)
      }),
      new WebpackNotifierPlugin({
         title: SITE_TITLE,
         contentImage: ""
      })
   ],
   devServer: {
      host: 'localhost',
      port: WEBPACK_DEV_SERVER_PORT,
      hot: true,
      publicPath: '/',
      contentBase: './public',
      historyApiFallback: true,
      open: true, // to open the local server in browser
   },
   devtool: "cheap-module-source-map",
   watch: true
})
