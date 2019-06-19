//cookie
var cookie=require('cookie-parser');
//session
var session=require('express-session');

module.exports=function(app){
    var hour=1000*60*10;//10分钟
    app.use(session({

        name:'SESSION',//设置cookie的值connect.sid
        resave:false,
        saveUninitialized:true,
        secret:'keyboard cat',
        cookie:{
            maxAge:hour,
            expires:new Date(Date.now()+hour)
        }
    }));

    //全局设置验证
    app.all('*',function(req,res,next){//这个跟vue的路由很像
        //设置允许跨域
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By",' 3.2.1')
        res.header("Content-Type", "application/json;charset=utf-8");
        // 获取浏览器中当前访问的nodejs路由地址
        var url = req.originalUrl;

        console.log('当前的路由');
        console.log(url);
        if (url === '/illustration/admin/login') {   
            next() 
        } else {   
            console.log('req.session.username', req.session.username) 
           if (req.session.username) {// 判断用户是否登录     
                next() 
           } else {     
                res.json({//登录失效
                    code: 4006,
                    msg: '登录已失效'
                })
                                  
            } 
        }

    });
};
