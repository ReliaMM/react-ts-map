const proxy = require('http-proxy-middleware')
module.exports = function(app) {
  app.use(proxy('/mock', { 
    target: 'http://127.0.0.1:3001',
    secure: false,
    changeOrigin: true,
    pathRewrite: {
    '^/mock': ''
    }
  }))
  app.use(proxy('/api', { 
    target: 'http://127.0.0.1:7001',
    secure: false,
    changeOrigin: true,
    pathRewrite: {
    '^/api': ''
    }
  }))
}