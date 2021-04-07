#! /usr/bin/env node

// 可运行的命令行

// 创建一个 koa 服务
const createServer = require('../index.js')

createServer().listen(4000, () => {
  console.log('server start 4000 ', 'http://localhost:4000')
})