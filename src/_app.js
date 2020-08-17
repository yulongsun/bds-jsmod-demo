


const Koa = require('koa');
const childprocess = require('child_process');
const Json = require('koa-json');
const Router = require('koa-router');

const api = require('../lib/jsdemo.module');
const helper = require('../lib/helper');

const app = new Koa()
const router = new Router()
const json = new Json()

//app.use(koaBody())


app.use(json)




//路由
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


let Ips = helper.getLocalIP();
let regist_address =Ips[0];    // '127.0.0.1'

//起动侦听
app.listenPort = function (port) {
	const address = regist_address;
	app.listen(port, () => {
		//注册服务
		api.register(address, port).then(x => {
			console.log(`Koa is listening in ${port}`);
		})
	})
}



app.deregister = function (ports) {
	const address = regist_address;

	ports.forEach(port => {
		api.deregister(address, port).then(x => {
			console.log(`consul is deregister in ${port}`);
		});
	});

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