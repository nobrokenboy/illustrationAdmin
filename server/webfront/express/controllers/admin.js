var express=require('express');
var router=express.Router();
var models=require('../models');
var config=require('../config');
const crypto=require('../common/crypto');


router.post('/login',function(req,res){
    console.log('登录');
    console.log(req.session);
    var obj={
        userName:req.body.userName,
        password:crypto.aesEncrypt(req.body.password,config.passwordKey)
    };

    //进行数据库查询
    models.admin.findOne(obj,function(err,result){
        console.log(err);
        console.log(result);
        if(err) {
            console.log('有错误呢');
            return handleError(err)
        }

        if(result==null){
            res.json(config.setResponse(config.setCode.Error_Code,null,'账户或者密码不对',null));
        }else{
            //设置全局的session并写入前端
            console.log('登录成功');
            console.log(result.id);
            req.session.username=req.body.userName;
            req.session.sid=result.id;
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
    };

    var _params=null;
    if(obj.userName!==''){
        _params=obj;
    }
    models.admin.find(_params,function(err,result){
        console.log(err);
        console.log(result);
        if(err) return handleError(err);

        if(result.length==0){
            res.json(config.setResponse(config.setCode.Error_Code,null,'获取管理者列表失败',null));
        }else{
            //设置全局的session并写入前端
            res.json(config.setResponse(config.setCode.Success_Code,result,'获取管理者列表成功',null));
        }
    })
});

router.post('/add',function(req,res){


    //密码加密
    var obj={
        userName:req.body.userName,
        password:crypto.aesEncrypt(req.body.password,config.passwordKey)//出现乱码了
    };

    console.log(obj);
    //id自动加1
    models.admin.create(obj,function(err,result){
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
        password:crypto.aesEncrypt(req.body.password,config.passwordKey)
    };


    models.admin.where({id:req.body.id}).update(obj,function(err,result){
        console.log(err);
        console.log(result);
        if(err) return handleError(err);

        if(result.length==0){
            res.json(config.setResponse(config.setCode.Error_Code,null,'获取管理者列表失败',null));
        }else{
            //设置全局的session并写入前端
            res.json(config.setResponse(config.setCode.Success_Code,result,'获取管理者列表成功',null));
        }
    })
});
router.get('/detail',function(req,res){
    //需要先判断是否登录了
    var obj={
        id:parseInt(req.query.id),
    };
    console.log(obj);
    models.admin.findOne(obj,function(err,result){

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
    models.admin.deleteOne(obj,function(err,result){
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

