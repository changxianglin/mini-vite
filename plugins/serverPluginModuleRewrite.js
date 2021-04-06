const { readBody } = require('./utils')
const { parse } = require('es-module-lexer')
const MagicString = require('magic-string')

function rewriteImport(source) {
  let imports = parse(source)[0]
  let magicString = new MagicString(source)

  if(imports.length) {

    for(var i = 0; i < imports.length; i++) {
      let {s, e} = imports[i]
      let id = source.substring(s, e)

      if(/^[^\/\.]/.test(id)) {
        id = `/@modules/${id}`
        magicString.overwrite(s, e, id)
      }
    }
  }

  return magicString.toString()
}


function moduleRewritePlugin({app, root}) {
  app.use(async (ctx, next) => {
    await next()

    if(ctx.body && ctx.response.is('js')) {
      let content = await readBody(ctx.body)
      const result = rewriteImport(content)

      ctx.body = result
    }
  })
}

exports.moduleRewritePlugin = moduleRewritePlugin