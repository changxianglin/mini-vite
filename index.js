const Koa = require('koa')
const { serverStaticPlugin } = require('./plugins/serverPluginServerStatic')
const { moduleRewritePlugin } = require('./plugins/serverPluginModuleRewrite.js')
function createServer() {
  const app = new Koa()
  const root = process.cwd()

  const context = {
    app, 
    root,
  }

  const resolvedPlugins = [
    
    // 2.anliys import add path
    moduleRewritePlugin,

    // 1.static server
    serverStaticPlugin,
  ]

  resolvedPlugins.forEach(plugin => plugin(context))

  return app
}

module.exports = createServer