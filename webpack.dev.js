const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(common, {
  output: {
    filename: 'js/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          }
        ]
      },
      {
        test: /\.scss$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './app/src/index.html',
      inject: true
    })
  ],
  devtool: 'eval-source-map',
  devServer: {
    contentBase: './app/dist',
    historyApiFallback: true,
    hot: true,
    compress: true,
    host: '0.0.0.0',
    port: 8083,
    autoOpenBrowser: true,
    proxy: {}
  }
})