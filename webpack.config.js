var webpack = require('webpack')

module.exports = {
  module: {
    rules: [
      {test: /\.js$/, exclude: /node_modules\/(?!(dom7|swiper)\/).*/, loader: 'babel-loader'}
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    })
  ]
}