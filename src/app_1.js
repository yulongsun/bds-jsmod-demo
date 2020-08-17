
/**
 * 起动服务实例1,本机需要起动 consul 节点并且 join 到服务中心
 */

const app =  require('./_app');

app.listenPort(6788)
module.exports = app;

