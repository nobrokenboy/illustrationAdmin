var express=require('express');
var router=express.Router();
var models=require('../models');
var config=require('../config');
const crypto=require('../common/crypto');

router.get('/list',function(req,res){
    //需要先判断是否登录了
    console.log(req.query);
    var obj={
        title:req.query.title
    };

    var _params=null;
    if(obj.title!==''){
        _params=obj;
    }
    models.activity.find(_params,function(err,result){
        console.log(err);
        console.log(result);
        if(err){
            res.json(config.setResponse(config.setCode.Error_Code,null,'获取活动列表失败',null));
        }else{
            if(result.length==0){
                res.json(config.setResponse(config.setCode.Success_Code,[],'获取活动列表成功',null));
            }else{
                res.json(config.setResponse(config.setCode.Success_Code,result,'获取活动列表成功',null));
            }
        }


    })
});

router.post('/add',function(req,res){
    console.log('进入这里1');
    //密码加密
    var obj={
        title:req.body.title,
        activityBrief:req.body.activityBrief,
        activityImage:req.body.activityImage,
        activityImageId:req.body.activityImageId,
        activityContent:req.body.activityContent,
    };

    console.log(obj);
    //id自动加1
    models.activity.create(obj,function(err,result){
        console.log(err);
        console.log(result);
        // if(err) return handleError(err);
        if(err) return console.log(err);

        if(result.length==0){
            res.json(config.setResponse(config.setCode.Error_Code,null,'新增活动失败',null));
        }else{
            res.json(config.setResponse(config.setCode.Success_Code,result,'新增活动成功',null));
        }
    })
});
router.post('/update',function(req,res){
    //需要先判断是否登录了
    var obj={
        title:req.body.title,
        activityBrief:req.body.activityBrief,
        activityImage:req.body.activityImage,
        activityContent:req.body.activityContent
    };
    console.log(req.body);
    console.log(obj);
    models.activity.where({id:req.body.id}).update(obj,function(err,result){
        console.log(err);
        console.log(result);
        if(err) return handleError(err);

        if(result.length==0){
            res.json(config.setResponse(config.setCode.Error_Code,null,'更新活动失败',null));
        }else{
            //设置全局的session并写入前端
            res.json(config.setResponse(config.setCode.Success_Code,result,'更新活动成功',null));
        }
    })
});
router.get('/detail',function(req,res){
    //需要先判断是否登录了
    var obj={
        id:parseInt(req.query.id),
    };
    console.log(obj);
    models.activity.findOne(obj,function(err,result){//联表

        if(err) return console.log(err);

        console.log(result);

        if(result.length==0){
            res.json(config.setResponse(config.setCode.Error_Code,null,'获取活动详情失败',null));
        }else{

            res.json(config.setResponse(config.setCode.Success_Code,result,'获取活动详情成功',null));
        }
    })
});

router.post('/delete',function(req,res){
    //需要先判断是否登录了
    var obj={
        id:req.body.id,
    };
    models.activity.deleteOne(obj,function(err,result){
        console.log(err);
        console.log(result);
        if(err) return handleError(err);

        if(result.length==0){
            res.json(config.setResponse(config.setCode.Error_Code,null,'删除活动失败',null));
        }else{
            //设置全局的session并写入前端
            res.json(config.setResponse(config.setCode.Success_Code,null,'删除活动成功',null));
        }
    })
});

module.exports=router;



