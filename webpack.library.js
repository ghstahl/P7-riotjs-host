/* global __dirname, require, module*/

const webpack = require('webpack');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const path = require('path');
const env = require('yargs').argv.env; // use --env with webpack 2

var libraryName = 'RiotHostCore';

var plugins = [

  ], outputFile;

outputFile = libraryName + '.js';

const config = {
  entry: __dirname + '/src/index.js',
  devtool: 'source-map',
  output: {
    path: __dirname + '/lib',
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  externals: {
    $: 'jQuery',
    jquery: 'jQuery',
    riot: 'riot',
    'riot-route': 'riot-route',
    'riotcontrol': 'riotcontrol'
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
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /(\.jsx|\.js|\.tag)$/,
        use: [
          'babel-loader'
        ],
        exclude: /(node_modules|bower_components)/
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

  plugins: plugins
};

module.exports = config;
