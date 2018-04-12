const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const env = require('./config/env')

const resolve = pathname => path.resolve(__dirname, pathname)

module.exports = {
  mode: env.NODE_ENV,
  entry: {
    app: [resolve('./src/main.ts')],
  },
  output: {
    path: resolve('./build'),
    filename: '[name].[chunkhash].js',
    publicPath: env.PUBLIC_PATH,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new webpack.EnvironmentPlugin(env),
    new CleanWebpackPlugin(['build']),
    new HtmlWebpackPlugin({
      title: 'Minesweeper',
      inject: true,
      template: resolve('./src/index.html'),
    }),
  ],
  optimization: {},
  resolve: {
    modules: ['node_modules'],
    extensions: [ '.tsx', '.ts', '.js', '.json' ]
  },
}
