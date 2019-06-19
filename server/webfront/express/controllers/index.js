//后台配置
var config=require('../config');

module.exports=function(app){
    //管理员
    app.use(config.apiCtx+'/admin',require('./admin'));
    //用户
    app.use(config.apiCtx+'/user',require('./user'));
}

