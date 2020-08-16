


//从服务发现中
const dc_config =  {
    host: '127.0.0.1', //本机需要起动 consul并且 join 到服务中心
    port: '8500',
    promisify: true,
};


module.exports={
    dc_config:dc_config,

}