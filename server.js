
const http = require('http')
const https = require('https')
const next = require('next')
const routes = require('./routes')

// 判断生产环境
const dev = process.env.NODE_ENV !== 'production'

const app = next({ dev })

const handler = routes.getRequestHandler(app, ({req, res, route, query}) => {
  app.render(req, res, route.page, query)
})

app.prepare()
  .then(() => {

    // 端口配置
    const port = {
      http: process.env.NEXT_PORT_HTTP || 3000,
      https: process.env.NEXT_PORT_HTTPS || 3443
    }

    // 匹配处理
    const requestListener = (req, res) => {
      return handler(req, res)
    }

    // 监听返回
    const listenCallback = (portocal) => {
      return (err) => {
        if(err) throw err
        console.log(`> Ready on ${portocal}://localhost:${port[portocal]}`)
      }
    }
    
    // 创建服务
    http.createServer(requestListener).listen(port.http, listenCallback('http'))
  })