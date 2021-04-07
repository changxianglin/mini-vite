const Koa = require('koa')
const {　serveStaticPlugin　} = require('./plugins/serverPluginServerStatic')
function createServer() {
  const app = new Koa() // create koa instance
  const root = process.cwd() // current project path
  console.log(root)
  const context = {
    app,
    root,
  }

  // pulgins
  const resolvePlugins = [
    // 1. static server
    serveStaticPlugin
  ]

  resolvePlugins.forEach(plugin =>　plugin(context))

  return app
}

module.exports = createServer