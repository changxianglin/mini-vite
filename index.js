const Koa = require('koa')
const { serverStaticPlugin } = require('./plugins/serverPluginServerStatic')
const { moduleRewritePlugin } = require('./plugins/serverPluginModuleRewrite.js')
const { moduleResolvePlugin } = require('./plugins/serverPluginModuleResolvePlugin.js')
const { htmlRewritePlugin } = require('./plugins/serverPluginHtml.js')
const { vuePlugin } = require('./plugins/serverPluinVue.js')

function createServer() {
  const app = new Koa()
  const root = process.cwd()

  const context = {
    app,
    root,
  }

  const resolvedPlugins = [

    htmlRewritePlugin,
    // 2.anliys import add path
    moduleRewritePlugin,

    // 3.anliys /@modules files start result
    moduleResolvePlugin,
    
    vuePlugin,
    // 1.static server
    serverStaticPlugin,
  ]

  resolvedPlugins.forEach(plugin => plugin(context))

  return app
}

module.exports = createServer