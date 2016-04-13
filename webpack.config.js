'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

// connect to different projects depending on path
const mainPath = 'basic_example/';

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    path.join(__dirname, mainPath+'/src/main.js')
  ],
  output: {
    path: path.join(__dirname, mainPath+'/dist/'),
    filename: '[name].js',
    publicPath: '/'
  },
  resolve: {
    src:path.join(__dirname, mainPath+'/src/'),
    extensions: ['', '.js', '.jsx', '.json']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: mainPath+'src/index.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    // new webpack.DefinePlugin({
    //   'process.env.NODE_ENV': JSON.stringify('development')
    // })
  ],
  module: {
    loaders: [{
      test: /\.js?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        cacheDirectory: true,
        presets: ["es2015", "react", "stage-0"],
        env: {
          development: {
            plugins: [
              ['react-transform', {
                transforms: [{
                  transform: 'react-transform-hmr',
                  imports: ['react'],
                  locals: ['module']
                }, {
                  transform: 'react-transform-catch-errors',
                  imports: ['react', 'redbox-react']
                }]
              }]
            ]
          }
        }
      }
    }, {
      test: /\.json?$/,
      loader: 'json'
    }, {
      test: /\.css$/,
      loader: 'style!css?modules&localIdentName=[name]---[local]---[hash:base64:5]'
    }]
  }
};
