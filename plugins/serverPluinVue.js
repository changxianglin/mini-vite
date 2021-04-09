const path = require('path')
const fs = require('fs').promises
const { resolveVue } = require('./utils.js')
const defaultExportRE = /((?:^|\n|;)\s*)export default/

function vuePlugin({ app, root }) { // ast tree
  app.use(async (ctx, next) => {
    if (!ctx.path.endsWith('.vue')) {
      return next()
    }
    // vue file 
    const filePath = path.join(root, ctx.path)
    const content = await fs.readFile(filePath, 'utf-8')

    // file content template
    let { parse, compileTemplate } = require(resolveVue(root).compiler)
    let { descriptor } = parse(content) // analyse file content
    if (!ctx.query.type) {
      let code = ``
      if (descriptor.script) {
        let content = descriptor.script.content
        let replaced = content.replace(defaultExportRE, '$1const __script =')
        code += replaced
      }
      if (descriptor.template) {
        const templateRequest = ctx.path + `?type=template`
        code += `\nimport { render as __render } from ${JSON.stringify(
          templateRequest
        )}`
        code += `\n__script.render = __render`
      }
      ctx.type = 'js'
      code += `\nexport default __script`
      ctx.body = code
    }

    if (ctx.query.type == 'template') {
          // file content
      console.log('这里需要转义东西')
      ctx.type = 'js'
      let contentv = descriptor.template.content
      const { code } = compileTemplate({ source: contentv })
      ctx.body = code
    }
  })
}

exports.vuePlugin = vuePlugin