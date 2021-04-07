const static = require('koa-static')
const path = require('path')

function serveStaticPlugin({ app, root }) {
  app.use(static(root))
  // public
  app.use(static(path.join(root, 'public')))
}

exports.serveStaticPlugin = serveStaticPlugin