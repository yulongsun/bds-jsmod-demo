

const Consul = require('consul')
const dc = require('./def')
const help = require('./helper')


/*
export interface ApiMethodDef{
    name?:string;
    method?:string;
    params?:any[];
}
export interface ApiDef{

    name?:string;
    version:string;
    apis:ApiMethodDef[];
}
*/


const consul = Consul(dc.node_config);


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

function getServerName(name, port) {
    return name + '服务演示用例' + port;
}

//可以通过web页或 gulp命令调用apis实现
function postApis_version1() {
    const config = getModuleConfig();
    const apis = this._getApis();

    help.writekv_version1(config, apis);
}

function getApis_version1(fcCall) {

    let keys=[
        'v1/apis',

    ];
    let len=keys.length;


    let catlog = {};
    //大小写敏感
    keys.forEach((x, i) => {
        consul.kv.get(serviceName + '/' + x).then(xx => {
            catlog[x] = xx;
            console.log(`-----key  ` + x);
            if (i == len - 1) {
                if (fcCall) {
                    fcCall(catlog);
                }
            }
        });
    })

}



//程序退出时调用，或可以通过web页或 gulp命令调用
function deregister(address, port) {
    let name = getModuleConfig().name;
    let serviceName = getServerName(name, port);
    let aa = consul.agent.service.deregister(serviceName);
    return aa;
}


/**
 * 服务注册,程序起动时自注册，或通过web页调用实现
 */
function register(address, port) {
    let name = getModuleConfig().name;
    let serviceName = getServerName(name, port);
    let opt = {
        name: serviceName,
        address: address,//????
        port: port,
        tags: [name, '' + port, 'demo'],// 服务可以分布在不同的 address，不应将地址作为 tag
        check: {
            http: 'http://' + address + ':' + port + '/health',    //随变调用任一函数时 系统有返回
            interval: '10s',
        }
    }
    let aa = consul.agent.service.register(opt);
    return aa;
}


function _getApis()  /*:ApiDef*/ {
    //todo:  对列表进行预处理，直接发布到服务器上
    return {

            apis: [{  //如果没子目录，采用apis 作为子目录 
                name: 'method_1',
                method: 'Get',
                params: [],
            },
            {
                name: 'method_1',
                method: 'Get',
                params: [],
            }]
      
    }

}


/**
 * 模型的 apis集合，用于在外部调用时写入到数据中心
 */
async function apis(ctx, next) {
    return _getApis();

}

/**
 * 键康检查，用于数据中心的调用
 */
async function health(ctx, next) {
    ctx.body = 'ok';
}



async function index(ctx, next) {
    ctx.body = 'jsdemo服务演示用例 ';
}



/**
 *  jsdemo 服务模块
 * @module module
 */
module.exports = {
    index: index,
    apis: apis,
    health: health,
    register: register,
    deregister: deregister,
getApis_version1:getApis_version1,
    postApis_version1: postApis_version1,
}