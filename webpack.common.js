const webpack = require('webpack')
const path = require('path')


module.exports = {
  entry: {
    app: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.json', '.css', '.scss', '.html']
  },
  module: {
    rules: [
      {test: /\.js$/, exclude: /node_modules\/(?!(dom7|swiper)\/).*/, loader: 'babel-loader'},
      {
        test: /\.html$/,
        exclude: [/node_modules/],
        use: {
          loader: 'html-loader',
          options: {
            attrs: ['img:src', 'img:data-src', 'source:src'],
            root: path.resolve(__dirname, 'app/src')
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'media/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[hash:7].[ext]'
        }
      }

    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      _: 'lodash'
    }),

  ]
}