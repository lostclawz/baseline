const path = require('path');

module.exports = {
   resolve: {
      extensions: ['.js', '.jsx', '.es6', '.ts', '.tsx'],
   },
   output: {
      filename: 'js/[name].[chunkhash].js',
      path: path.join(__dirname, '/public'),
      globalObject: 'this',
   },
   performance: {
      hints: false,
   },
   module: {
      rules: [
         {
            test: /.jsx?$/,
            exclude: /node_modules/,
            use: [{
               loader: 'babel-loader',
               options: { cacheDirectory: false },
            }],
         },
         {
            test: /\.(woff|woff2|eot|ttf|svg)$/,
            exclude: /node_modules/,
            use: 'file-loader?limit=1024&name=fonts/[name].[ext]',
         },
      ],
   },
};
