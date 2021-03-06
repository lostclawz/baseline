const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const merge = require('webpack-merge');
const dartSass = require('sass');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');

const common = require('./webpack.common.js');
const PACKAGE = require('./package.json');


const SITE_TITLE = PACKAGE.name;

module.exports = merge.smart(common, {
   mode: 'production',
   entry: {
      app: [path.resolve(__dirname, 'src', 'index.jsx')],
   },
   optimization: {
      splitChunks: {
         cacheGroups: {
            commons: {
               test: /[\\/]node_modules[\\/]/,
               name: 'vendor',
               chunks: 'all',
            },
         },
      },
   },
   module: {
      rules: [
         {
            test: /\.scss$/,
            use: [
               { loader: MiniCssExtractPlugin.loader },
               // { loader: 'style-loader' },
               {
                  loader: 'css-loader',
                  options: {
                     sourceMap: true,
                     url: false,
                     importLoaders: 1,
                  },
               },
               {
                  loader: 'postcss-loader',
                  options: {
                     sourceMap: true,
                     plugins: () => [autoprefixer, cssnano],
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
      new BundleAnalyzerPlugin(),
      new HtmlWebpackPlugin({
         title: SITE_TITLE,
         template: path.join(__dirname, 'src', 'index.html'),
         chunksSortMode: 'none',
      }),
      new webpack.DefinePlugin({
         PRODUCTION: JSON.stringify(true),
         VERSION: JSON.stringify(PACKAGE.version),
      }),
      new MiniCssExtractPlugin({
         filename: './style/[name].[hash].css',
      }),
      new CleanWebpackPlugin(),
   ],
});
