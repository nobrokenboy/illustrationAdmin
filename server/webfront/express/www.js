var express=require('express');
var app=express();

// var crypto=require('./controllers/common/crypto');
// console.log(crypto.aesEncrypt('126373737','我是谁'));
// console.log(crypto.aesDecrypt('4a39364928ca23995174c3d8fa5d476a','我是谁'));

//全局判断session
require('./common/session')(app);

//请求体解析
var bodyParser=require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var path=require('path');



var port=process.env.PORT||3000;

const dbTools=require('./common/db');
//引入路由器，接口,控制器
var ctl=require('./controllers')(app);



//设置视图
// app.set('views','./views');
// //设置模板引擎
// app.set('view engine','jade')
// //设置静态资源
// app.use(express.static(path.join(__dirname,'public')));



//监听
app.listen(port,function(){
    console.log('监听的端口：'+port);
});

