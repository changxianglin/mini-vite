const moduleREG = /^\/@modules\//
const fs = require('fs').promises
const path = require('path')

function resolveVue(root) {
  //  vue3 runtime-dom runtime-core compiler-sfc shared

  // commonjs
  const compilerPkgPath = path.join(root, 'node_modules', '@vue/compiler-sfc/package.json')

  const compilerPkg = require(compilerPkgPath)

  const compilerPath = path.join(path.dirname(compilerPkgPath), compilerPkg.main)

  const resovePath = (name) => path.resolve(root, 'node_modules', `@vue/${name}/dist/${name}.esm-bundler.js`)

  const runtimeDomPath = resovePath('runtime-dom')
  const runtimeCorePath = resovePath('runtime-core')
  const reactivityPath = resovePath('reactivity')
  const sharedPath = resovePath('shared')

  return {
    compiler: compilerPath,
    '@vue/runtime-dom': runtimeDomPath,
    '@vue/runtime-core': runtimeCorePath,
    '@vue/reactivity': reactivityPath,
    '@vue/shared': sharedPath,
    vue: runtimeDomPath,
  }
}

function moduleResolvePlugin({app, root}) {
  const vueResolved = resolveVue(root) // run vite anliys files tables

  app.use(async (ctx, next) => {
    console.log('get path', ctx.path)
    if(!moduleREG.test(ctx.path)) { // /@modules start path
      return next()
    }
    // remove /@modules
    const id = ctx.path.replace(moduleREG, '')
    ctx.type = 'js'

    // load vue
    console.log('每次添加的 id', id)
    const content = await fs.readFile(vueResolved[id], 'utf8')

    ctx.body = content // back 
  })
}

exports.moduleResolvePlugin = moduleResolvePlugin