const Stream = require('stream')

async function readBody(stream) {
  if(stream instanceof Stream) { // carful buffer
    return new Promise((resolve, reject) => {
      let res = ''
      stream.on('data', data => {
        res += data
      })
  
      stream.on('end', () => {
        resolve(res)
      })
    })
  } else {
    return stream.toString()
  }
}

exports.readBody = readBody