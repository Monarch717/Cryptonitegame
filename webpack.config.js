const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
const webpack = require('webpack')

module.exports = {
  entry: ['babel-polyfill', path.resolve(__dirname, './src/index.js')],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.bmp$|\.png$|\.gif|\.svg$|\.mp4/,
        loader: 'file-loader',
        include: [path.resolve(__dirname, './src/Components')],
        options: {
          name: '[name].[ext]'
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js',
    publicPath: '/'
  },
  devServer: {
    static: [
      path.join(__dirname, '/public'),
      path.join(__dirname, '/dist')
    ],
    host: '127.0.0.1',
    port: 8082
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: 'static/', to: '.' }
      ]
    }),
    new NodePolyfillPlugin(),
  ],
  optimization: {
    minimizer: [new TerserPlugin({
      extractComments: true
    })]
  }
}
