

const Consul =  require('consul')
const dc =  require('./dc')
const consul =  Consul(dc.dc_config);



function writekv(Config, apis) {
    let name = Config.name;
    let keys = Object.keys(apis);
    let aa = consul.kv.set(name + '/apis' , JSON.stringify(apis));
}


module.exports={
    writekv:writekv,

}