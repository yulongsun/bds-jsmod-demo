

const Consul =  require('consul')
const dc =  require('./dc')
const help =  require('./consulhelper')



const consul =  Consul(dc.dc_config);


/**
 * 模型配置，用于配置服务的基础数据，在服务注册时使用
 */
function getModuleConfig() {
    return {
        name: 'jsdemo',
        check: {
            interval: '10s',

        }
    }
}





//可以通过web页或 gulp命令调用apis实现
function postApis() {
    const config =getModuleConfig();
    const apis=this.getApis();
    help.writekv(config,apis);
}



//程序退出时调用，或可以通过web页或 gulp命令调用
function deregister(){

}


/**
 * 服务注册,程序起动时自注册，或通过web页调用实现
 */
function register(address, port){
    let name= getModuleConfig().name;
    let serviceName = 'jsdemo 服务实例'+ port;
    let opt = {
        name: serviceName,
        address: address,//????
        port: port,
        tags:[''+port,address],
        check: {
            http: 'http://'  +address + ':'+  port  +'/health',    //随变调用任一函数时 系统有返回
            interval: '10s',

        }
    }
   let aa=  consul.agent.service.register(opt);
   return aa;

}


function getApis() {
    //todo:  对列表进行预处理，直接发布到服务器上
    return  {
            'method_1': 'description method_1',
            'method_2': 'description method_2'
        }
    
}


/**
 * 模型的 apis集合，用于在外部调用时写入到数据中心
 */
async function apis(ctx, next) {
    return getApis();

}

/**
 * 键康检查，用于数据中心的调用
 */
async function health(ctx, next) {
     ctx.body='ok';
}



async function index(ctx, next) {
     ctx.body='jsdemo 服务实例 演示';
}



/**
 *  jsdemo 服务模块
 * @module module
 */
module.exports={
    index:index,
    apis:apis,
    health:health,
    register:register,
    getApis:getApis,
    postApis:postApis,
}