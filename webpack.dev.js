const webpack = require('webpack');
var path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './app/index.js',
  devtool: 'source-map',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  externals: {
    $: 'jQuery',
    jquery: 'jQuery',
    'window.jQuery': 'jquery'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['source-map-loader'],
        enforce: 'pre'
      },
      {
        test: /bootstrap\/js\//,
        loader: 'imports?jQuery=jquery'
      },
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
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      'riot': 'riot',
      'riot-route': 'riot-route',
      'riotcontrol': 'riotcontrol'
    }),
    new ExtractTextPlugin('styles.css')

  ],
  devServer: {
    contentBase: './dist/',
    port: 1338,
    hot: true,
    inline: true
  }

};
