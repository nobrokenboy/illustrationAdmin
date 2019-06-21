var express=require('express');
var router=express.Router();
var models=require('../models');
var config=require('../config');
const crypto=require('../common/crypto');

router.get('/list',function(req,res){
    //需要先判断是否登录了
    var obj={
        username:req.query.username,
        content:req.query.content//模糊查询
    };

    var _params=null;
    if(obj.username!==''&&obj.content!==''){
        _params=obj;
    }
    console.log(_params)
    models.record.find(_params,function(err,result){
        console.log(err);
        console.log(result);
        if(err){
            res.json(config.setResponse(config.setCode.Error_Code,null,'获取记录列表失败',null));
        }else{
            if(result.length==0){
                res.json(config.setResponse(config.setCode.Success_Code,[],'获取记录列表成功',null));
            }else{
                res.json(config.setResponse(config.setCode.Success_Code,result,'获取记录列表失败',null));
            }
        }


    })
});

router.post('/add',function(req,res){
    console.log('进入这里1');
    var obj={
        content:req.body.content,
        location:req.body.location,
        image:req.body.location,
    };

    console.log(obj);
    //id自动加1
    models.record.create(obj,function(err,result){
        console.log(err);
        console.log(result);
        // if(err) return handleError(err);
        if(err) return console.log(err);

        if(result.length==0){
            res.json(config.setResponse(config.setCode.Error_Code,null,'新增记录失败',null));
        }else{
            res.json(config.setResponse(config.setCode.Success_Code,result,'新增记录成功',null));
        }
    })
});
router.post('/update',function(req,res){
    //需要先判断是否登录了
    var obj={
        content:req.body.content,
        location:req.body.location,
        image:req.body.location,
    };
    console.log(req.body);
    console.log(obj);
    models.record.where({id:req.body.id}).update(obj,function(err,result){
        console.log(err);
        console.log(result);
        if(err) return handleError(err);

        if(result.length==0){
            res.json(config.setResponse(config.setCode.Error_Code,null,'更新记录失败',null));
        }else{
            //设置全局的session并写入前端
            res.json(config.setResponse(config.setCode.Success_Code,result,'更新记录成功',null));
        }
    })
});
router.get('/detail',function(req,res){
    //需要先判断是否登录了
    var obj={
        id:parseInt(req.query.id),
    };
    console.log(obj);
    models.record.findOne(obj,function(err,result){

        if(err) return console.log(err);

        if(result.length==0){
            res.json(config.setResponse(config.setCode.Error_Code,null,'获取记录详情失败',null));
        }else{

            res.json(config.setResponse(config.setCode.Success_Code,result,'获取记录详情成功',null));
        }
    })
});

router.post('/delete',function(req,res){
    //需要先判断是否登录了
    var obj={
        id:req.body.id,
    };
    models.record.deleteOne(obj,function(err,result){
        console.log(err);
        console.log(result);
        if(err) return handleError(err);

        if(result.length==0){
            res.json(config.setResponse(config.setCode.Error_Code,null,'删除记录失败',null));
        }else{
            //设置全局的session并写入前端
            res.json(config.setResponse(config.setCode.Success_Code,null,'删除记录成功',null));
        }
    })
});

module.exports=router;



