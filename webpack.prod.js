const webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: './app/index.js',
  output: {
    filename: 'bundle.min.js',
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
        use: [ 'style-loader', 'css-loader' ]
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
        screw_ie8: true
      },
      comments: false
    }),
    new webpack.ProvidePlugin({
      riot: 'riot',
      'riot-route': 'riot-route',
      'riotcontrol': 'riotcontrol'
    })
  ]
};
