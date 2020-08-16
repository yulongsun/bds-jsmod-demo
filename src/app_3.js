
/**
 * 起动实例3,本机需要起动 consul并且 join 到服务中心
 */

const app =  require('./_app');

app.listenPort(6787)
module.exports = app;