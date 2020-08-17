

const Consul =  require('consul')
const dc =  require('./def')
const consul =  Consul(dc.node_config);
const os=require('os');



function getLocalIP(){

        const osType = os.type(); //系统类型
        const netInfo = os.networkInterfaces(); //网络信息
        let ips = [];
        if (osType === 'Windows_NT') {
            for (let dev in netInfo) {
                //win7的网络信息中显示为本地连接，win10显示为以太网
                //  if (dev === '本地连接' || dev === '以太网' || dev.indexOf('本地连接*')==0 ) {
                if (dev === 'WLAN' || dev ===  'NIC1'||dev === '本地连接' || dev === '以太网') {
                    for (let j = 0; j < netInfo[dev].length; j++) {
                        if (netInfo[dev][j].family === 'IPv4') {
                            ips.push(netInfo[dev][j].address);
                            //如果有多个，将多个一起加入到配置中

                        }
                    }
                }
            }

        } else if (osType === 'Linux') {
            ips.push(netInfo.eth0[0].address);
        }

        return ips;
    }


function writekv(Config, apis) {
    let name = Config.name;
    let keys = Object.keys(apis);
    let aa = consul.kv.set(name + '/apis' , JSON.stringify(apis));
}


module.exports={
    getLocalIP:getLocalIP,
    writekv:writekv,

}