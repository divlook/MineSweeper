const webpackDevServer = require('webpack-dev-server')
const webpack = require('webpack')
const config = require('../webpack.config.js')
const env = require('../config/env')

const HOST = env.HOST
const PORT = env.PORT

config.output.filename = '[name].[hash].js'
config.plugins.push(new webpack.HotModuleReplacementPlugin())

const options = {
  compress: true,
  hot: true,
  host: HOST,
  quiet: true,
  overlay: {
    warnings: true,
    errors: true
  },
}

webpackDevServer.addDevServerEntrypoints(config, options)
const compiler = webpack(config)
const server = new webpackDevServer(compiler, options)

server.listen(PORT, HOST, () => {
  console.log('\x1b[36m%s\x1b[0m', `\n  http://${HOST}:${PORT}\n`)
})
