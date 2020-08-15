﻿


const Koa = require('koa');
const  childprocess =require( 'child_process');
const  Json =require( 'koa-json');
const serve =require(  'koa-static');
const Router =require(  'koa-router');

const api = require ('../lib/module');


const app = new Koa()
const router =new   Router()
const json =   new Json()

//app.use(koaBody())
// 使用./static下的静态文件，决定了客户端起动在是在目录位置的index.html

//app.use(serve(__dirname + '/static'));

app.use(json)

const port = process.env.PORT || 6789

router.get('/', api.index)
router.get('/index', api.index)
router.get('/health', api.health)

app.use(router.routes());

// 日志中间件
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})


app.listenPort = function (port) {
  const address = '10.0.0.135';
  app.listen(port, () => {
    api.register(address, port).then(x => {
      console.log(`Koa is listening in ${port}`);
    })

  })

}

//disconnect' 事件
//如果使用 IPC 通道衍生 Node.js 进程（参见子进程和集群文档），则在 IPC 通道关闭时将触发 'disconnect' 事件。
//通过界面使其退出
process.on('beforeExit', (code) => {
  console.log('进程 beforeExit 事件的代码: ', code);
});

process.on('exit', (code) => {
  console.log('进程 exit 事件的代码: ', code);
});

//childprocess.exec('start http://127.0.0.1:'+  port +'/index');



module.exports = app;