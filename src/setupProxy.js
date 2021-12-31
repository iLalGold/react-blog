const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/muP', {
      target: 'http://124.71.83.165:3000',
      changeOrigin: true,
      pathRewrite: { '^/muP': '' },
    })
  )
}
