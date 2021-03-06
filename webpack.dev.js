const merge = require('webpack-merge');
const WebpackNotifierPlugin = require('webpack-notifier');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const WebpackShellPlugin = require('webpack-shell-plugin');
const autoprefixer = require('autoprefixer');
const dartSass = require('sass');

const common = require('./webpack.common.js');
const PACKAGE = require('./package.json');

const WEBPACK_DEV_SERVER_PORT = PACKAGE['app-ports']['webpack-port'];


const SITE_TITLE = `${PACKAGE.name} [dev ${PACKAGE.version}]`;

module.exports = merge.smart(common, {
   mode: 'development',
   entry: {
      app: [
         'react-hot-loader/patch',
         path.resolve(__dirname, 'src', 'index.jsx'),
      ],
   },
   output: {
      filename: 'js/[name].js',
   },
   resolve: {
      alias: {
         'react-dom': '@hot-loader/react-dom',
      },
   },
   module: {
      rules: [
         {
            test: /.jsx?$/,
            exclude: /node_modules/,
            use: [{
               loader: 'babel-loader',
               options: { cacheDirectory: true },
            }],
         },
         {
            test: /\.scss$/,
            use: [
               { loader: 'style-loader' },
               {
                  loader: 'css-loader',
                  options: {
                     sourceMap: true,
                     url: false,

                  },
               },
               {
                  loader: 'postcss-loader',
                  options: {
                     sourceMap: true,
                     plugins() {
                        return [autoprefixer];
                     },
                  },
               },
               { loader: 'resolve-url-loader', options: { sourceMap: true } },
               {
                  loader: 'sass-loader',
                  options: {
                     sourceMap: true,
                     implementation: dartSass,
                  },
               },
            ],
         },
      ],
   },
   plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
         title: SITE_TITLE,
         template: path.join(__dirname, 'src', 'index.html'),
         chunksSortMode: 'none',
      }),
      new webpack.DefinePlugin({
         PRODUCTION: JSON.stringify(false),
         VERSION: JSON.stringify(PACKAGE.version),
      }),
      new WebpackNotifierPlugin({
         title: SITE_TITLE,
         contentImage: '',
      }),
      new WebpackShellPlugin({
         onBuildEnd: ['nodemon --exec npx babel-node ./src/api/index.js'],
      }),
   ],
   devServer: {
      host: '0.0.0.0',
      port: WEBPACK_DEV_SERVER_PORT,
      hot: true,
      publicPath: '/',
      contentBase: './public',
      historyApiFallback: true,
      open: false, // to open the local server in browser
   },
   watchOptions: {
      ignored: /node_modules/,
      aggregateTimeout: 300,
      poll: 500,
   },
   devtool: 'cheap-module-source-map',
   watch: true,
});
