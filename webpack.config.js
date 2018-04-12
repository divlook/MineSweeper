const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const resolve = pathname => path.resolve(__dirname, pathname)

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: {
    app: [resolve('./src/main.js')],
  },
  output: {
    path: resolve('./build'),
    filename: '[name].[chunkhash].js',
    publicPath: './',
  },
  module: {},
  plugins: [
    new CleanWebpackPlugin(['build']),
    new HtmlWebpackPlugin({
      title: 'Minesweeper',
      inject: true,
      template: resolve('./public/index.html'),
    }),
  ],
  optimization: {},
  resolve: {
    modules: ['node_modules'],
  },
}
