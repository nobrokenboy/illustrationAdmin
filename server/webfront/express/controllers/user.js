var express=require('express');
var router=express.Router();
var models=require('../models');
var config=require('../config');
const crypto=require('../common/crypto');

//发送验证码
router.post('/checkCode',function (req,res) {
    var obj={
        phone:req.body.phone,
        code:req.body.code
    };

    //查询手机号是否已注册
    models.user.findOne({phone:obj.phone},function(err,result){
        if(err){
            console.log(err)
            return;
        }
        //
        if(result!=null){
            res.json(config.setResponse(config.setCode.Error_Code,null,'该手机号已注册过',null));
        }else{
            //发送手机验证码
        }

    });
});
//注册,账户，手机号，验证码
router.post('/register',function(req,res){
    console.log('进入这里');
    //密码加密
    var obj={
        // userName:req.body.userName,
        phone:req.body.phone,
        password:crypto.aesEncrypt(req.body.password,config.passwordKey),
        code:req.body.code
    };
    //先查询手机号是否已注册过
    models.user.findOne({phone:obj.phone},function(err,result){
        if(err) return console.log(err);
        if(result!=null){
            res.json(config.setResponse(config.setCode.Error_Code,null,'该手机号已注册过',null));
        }else{
            //验证验证码
            if(obj.code=='5658'){
                models.user.create(obj,function(err,result){
                    console.log(err);
                    console.log(result);

                    if(err) return console.log(err);

                    if(result.length==0){
                        res.json(config.setResponse(config.setCode.Error_Code,null,'获取管理者列表失败',null));
                    }else{
                        //设置全局的session并写入前端
                        res.json(config.setResponse(config.setCode.Success_Code,result,'获取管理者列表成功',null));
                    }
                })
            }
        }
    });


});


router.post('/login',function(req,res){
    var obj={
        // userName:req.body.userName,
        phone:req.body.phone,
        code:req.body.phone
    };

    if(obj.code!=='5856'){//先写死
        res.json(config.setResponse(config.setCode.Error_Code,null,'验证码不对',null));
        return;
    }

    //进行数据库查询
    models.user.findOne(obj,function(err,result){
        console.log(err);
        console.log(result);
        if(err) return handleError(err);

        if(result==null){
            res.json(config.setResponse(config.setCode.Error_Code,null,'账户或者密码不对',null));
        }else{
            //设置全局的session并写入前端
            console.log(req.session);
            req.session.username=req.body.userName;
            req.session.sid=req.body.userName;
            res.json(config.setResponse(config.setCode.Success_Code,result,'登录成功',null));
        }
    })


});
//退出登录


router.get('/logout',function(req,res){
    //退出登录，清除session
    req.session.destroy(function(err) {
        if(err){
            res.json(config.setResponse(config.setCode.Error_Code,'退出登录失败',null));
        }else{
            res.json(config.setResponse(config.setCode.Success_Code,'退出登录成功',null));
        }

    });
});

router.get('/list',function(req,res){
    //需要先判断是否登录了
    console.log(req.query);
    console.log(req.query.userName);
    var obj={
        userName:req.query.userName,
        phone:req.body.phone
    };

    var _params=null;
    if(obj.userName!==''&&obj.phone!==''){
        _params=obj;
    }
    models.user.find(_params,function(err,result){
        console.log(err);
        console.log(result);
        if(err){
            res.json(config.setResponse(config.setCode.Error_Code,null,'获取管理者列表失败',null));
        }else{
            if(result.length==0){
                res.json(config.setResponse(config.setCode.Success_Code,[],'获取管理者列表成功',null));
            }else{
                //设置全局的session并写入前端
                res.json(config.setResponse(config.setCode.Success_Code,result,'获取管理者列表成功',null));
            }
        }


    })
});

router.post('/add',function(req,res){
    console.log('进入这里');
    //密码加密
    var obj={
        userName:req.body.userName,
        phone:req.body.phone,
        password:crypto.aesEncrypt(req.body.password,config.passwordKey),//出现乱码了
        userBrief:req.body.userBrief,
        portrait:'https://dribbble.com/shots/6639386-Two-Dots-Treasure-Hunt-RPG-Overworld-Ice-Zone?utm_source=gold_browser_extension',
    };

    console.log(obj);
    //id自动加1
    models.user.create(obj,function(err,result){
        console.log(err);
        console.log(result);
        // if(err) return handleError(err);
        if(err) return console.log(err);

        if(result.length==0){
            res.json(config.setResponse(config.setCode.Error_Code,null,'获取管理者列表失败',null));
        }else{
            //设置全局的session并写入前端
            res.json(config.setResponse(config.setCode.Success_Code,result,'获取管理者列表成功',null));
        }
    })
});
router.post('/update',function(req,res){
    //需要先判断是否登录了
    var obj={
        userName:req.body.userName,
        phone:req.body.phone,
        password:crypto.aesEncrypt(req.body.password,config.passwordKey),
        userBrief:req.body.userBrief,
        portrait:'https://dribbble.com/shots/6639386-Two-Dots-Treasure-Hunt-RPG-Overworld-Ice-Zone?utm_source=gold_browser_extension',
    };
    console.log(req.body);
    console.log(obj);
    models.user.where({id:req.body.id}).update(obj,function(err,result){
        console.log(err);
        console.log(result);
        if(err) return handleError(err);

        if(result.length==0){
            res.json(config.setResponse(config.setCode.Error_Code,null,'更新用户失败',null));
        }else{
            //设置全局的session并写入前端
            res.json(config.setResponse(config.setCode.Success_Code,result,'更新用户成功',null));
        }
    })
});
router.get('/detail',function(req,res){
    //需要先判断是否登录了
    var obj={
        id:parseInt(req.query.id),
    };
    console.log(obj);
    models.user.findOne(obj,function(err,result){

        if(err) return console.log(err);

        if(result.length==0){
            res.json(config.setResponse(config.setCode.Error_Code,null,'获取管理者详情失败',null));
        }else{
            //设置全局的session并写入前端
            //需要解一下密码
            result.password=crypto.aesDecrypt(result.password,config.passwordKey);
            res.json(config.setResponse(config.setCode.Success_Code,result,'获取管理者详情成功',null));
        }
    })
});

router.post('/delete',function(req,res){
    //需要先判断是否登录了
    var obj={
        id:req.body.id,
    };
    models.user.deleteOne(obj,function(err,result){
        console.log(err);
        console.log(result);
        if(err) return handleError(err);

        if(result.length==0){
            res.json(config.setResponse(config.setCode.Error_Code,null,'删除管理者列表失败',null));
        }else{
            //设置全局的session并写入前端
            res.json(config.setResponse(config.setCode.Success_Code,null,'删除管理者列表成功',null));
        }
    })
});

module.exports=router;



