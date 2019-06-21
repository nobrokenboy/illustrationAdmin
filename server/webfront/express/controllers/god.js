var express=require('express');
var router=express.Router();
var models=require('../models');
var config=require('../config');
const crypto=require('../common/crypto');

router.get('/list',function(req,res){
    //需要先判断是否登录了
    console.log(req.query);
    var obj={
        title:req.query.name
    };

    var _params=null;
    if(obj.title!==''){
        _params=obj;
    }
    models.god.find(_params,function(err,result){
        console.log(err);
        console.log(result);
        if(err){
            res.json(config.setResponse(config.setCode.Error_Code,null,'获取插画师列表失败',null));
        }else{
            if(result.length==0){
                res.json(config.setResponse(config.setCode.Success_Code,[],'获取插画师列表成功',null));
            }else{
                res.json(config.setResponse(config.setCode.Success_Code,result,'获取插画师列表成功',null));
            }
        }


    })
});

router.post('/add',function(req,res){
    console.log('进入这里1');
    //密码加密
    var obj={
        name:req.body.name,
        brief:req.body.brief,
        // portrait:'https://dribbble.com/shots/6639386-Two-Dots-Treasure-Hunt-RPG-Overworld-Ice-Zone?utm_source=gold_browser_extension',
        image:'https://dribbble.com/shots/6639386-Two-Dots-Treasure-Hunt-RPG-Overworld-Ice-Zone?utm_source=gold_browser_extension',
        content:'ddd',
    };

    console.log(obj);
    //id自动加1
    models.god.create(obj,function(err,result){
        console.log(err);
        console.log(result);
        // if(err) return handleError(err);
        if(err) return console.log(err);

        if(result.length==0){
            res.json(config.setResponse(config.setCode.Error_Code,null,'新增插画师失败',null));
        }else{
            res.json(config.setResponse(config.setCode.Success_Code,result,'新增插画师成功',null));
        }
    })
});
router.post('/update',function(req,res){
    //需要先判断是否登录了
    var obj={
        name:req.body.name,
        brief:req.body.brief,
        image:'https://dribbble.com/shots/6639386-Two-Dots-Treasure-Hunt-RPG-Overworld-Ice-Zone?utm_source=gold_browser_extension',
        content:'ddd',
    };
    console.log(req.body);
    console.log(obj);
    models.god.where({id:req.body.id}).update(obj,function(err,result){
        console.log(err);
        console.log(result);
        if(err) return handleError(err);

        if(result.length==0){
            res.json(config.setResponse(config.setCode.Error_Code,null,'更新插画师失败',null));
        }else{
            //设置全局的session并写入前端
            res.json(config.setResponse(config.setCode.Success_Code,result,'更新插画师成功',null));
        }
    })
});
router.get('/detail',function(req,res){
    //需要先判断是否登录了
    var obj={
        id:parseInt(req.query.id),
    };
    console.log(obj);
    models.god.findOne(obj,function(err,result){

        if(err) return console.log(err);

        if(result.length==0){
            res.json(config.setResponse(config.setCode.Error_Code,null,'获取插画师详情失败',null));
        }else{

            res.json(config.setResponse(config.setCode.Success_Code,result,'获取插画师详情成功',null));
        }
    })
});

router.post('/delete',function(req,res){
    //需要先判断是否登录了
    var obj={
        id:req.body.id,
    };
    models.god.deleteOne(obj,function(err,result){
        console.log(err);
        console.log(result);
        if(err) return handleError(err);

        if(result.length==0){
            res.json(config.setResponse(config.setCode.Error_Code,null,'删除插画师失败',null));
        }else{
            //设置全局的session并写入前端
            res.json(config.setResponse(config.setCode.Success_Code,null,'删除插画师成功',null));
        }
    })
});

module.exports=router;



