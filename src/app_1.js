
/**
 * 起动实例1,本机需要起动 consul并且 join 到服务中心
 */

const app =  require('./_app');

app.listenPort(6788)
module.exports = app;

