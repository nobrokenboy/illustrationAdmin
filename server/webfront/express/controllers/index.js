//后台配置
var config=require('../config');

module.exports=function(app){
    //管理员
    app.use(config.apiCtx+'/admin',require('./admin'));
    //用户
    app.use(config.apiCtx+'/user',require('./user'));
    //活动列表
    app.use(config.apiCtx+'/activity',require('./activity'));
    //大神列表
    app.use(config.apiCtx+'/god',require('./god'));
    //绘本列表
    app.use(config.apiCtx+'/book',require('./book'));
    //插画圈发布的记录
    app.use(config.apiCtx+'/record',require('./record'));
    //上传文件
    app.use(config.apiCtx+'/upload',require('./upload'));
}

