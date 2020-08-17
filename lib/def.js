


//注册节点配置
const node_config =  {
    host: '127.0.0.1', //本机需要起动 consul并且 join 到服务中心
    port: '8500',
    promisify: true,
};


module.exports={
    node_config:node_config,

}