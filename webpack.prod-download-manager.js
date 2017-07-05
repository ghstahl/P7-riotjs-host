const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var CompressionPlugin = require('compression-webpack-plugin');

var path = require('path');

module.exports = {
  entry: './plugins/download_manager/index.js',
  output: {
    filename: 'bundle.min.js',
    path: path.resolve(__dirname, 'dist/externals/download_manager')
  },
  externals: {
    $: 'jQuery',
    jquery: 'jQuery',
    riot: 'riot'
  },
  module: {
    rules: [
      {
        test: /\.tag$/,
        exclude: /node_modules/,
        enforce: 'pre',
        use: [
              {loader: 'riot-tag-loader', options: {hot: false}}
        ]
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      },
      {
        test: /\.js|\.tag$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'es2015-riot']
          }
        }
      },
      {
        test: /(\.jsx|\.js)$/,
        use: [
          'eslint-loader'
        ],
        exclude: /(node_modules|bower_components)/
      }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true,
        // remove warnings
        warnings: false,

         // Drop console statements
        drop_console: true
      },
      comments: false
    }),
    new ExtractTextPlugin('styles.css'),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|html|css)$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ]
};
