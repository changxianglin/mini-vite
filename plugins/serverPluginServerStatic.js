const static = require('koa-static')
const path = require('path')

function serverStaticPlugin({app, root}) {
  app.use(static('.'))
  app.use(static(path.join(root, 'public')))
}

exports.serverStaticPlugin = serverStaticPlugin