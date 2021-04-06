#! /usr/bin/env node

// 可运行脚本

//  create a server

const createServer = require('../index')

createServer().listen(4000, () => {
  console.log('server start 4000 port ', 'http://localhost:4000')
})