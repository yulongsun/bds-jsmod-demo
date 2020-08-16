/**
 * 反注册所有实列,本机需要起动 consul并且 join 到服务中心
 */



const app =  require('./_app');


app.deregister(   [6787,6788,6789] );



