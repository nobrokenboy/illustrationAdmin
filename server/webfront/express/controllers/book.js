var express=require('express');
var router=express.Router();
var models=require('../models');
var config=require('../config');
const crypto=require('../common/crypto');

router.get('/list',function(req,res){
    //需要先判断是否登录了
    console.log(req.query);
    var obj={
        name:req.query.name
    };

    var _params=null;
    if(obj.name!==''){
        _params=obj;
    }
    models.book.find(_params,function(err,result){
        console.log(err);
        console.log(result);
        if(err){
            res.json(config.setResponse(config.setCode.Error_Code,null,'获取绘本列表失败',null));
        }else{
            if(result.length==0){
                res.json(config.setResponse(config.setCode.Success_Code,[],'获取绘本列表成功',null));
            }else{
                res.json(config.setResponse(config.setCode.Success_Code,result,'获取绘本列表失败',null));
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
        info:'ddd',
    };

    console.log(obj);
    //id自动加1
    models.book.create(obj,function(err,result){
        console.log(err);
        console.log(result);
        // if(err) return handleError(err);
        if(err) return console.log(err);

        if(result.length==0){
            res.json(config.setResponse(config.setCode.Error_Code,null,'新增绘本失败',null));
        }else{
            res.json(config.setResponse(config.setCode.Success_Code,result,'新增绘本成功',null));
        }
    })
});
router.post('/update',function(req,res){
    //需要先判断是否登录了
    var obj={
        name:req.body.name,
        brief:req.body.brief,
        // portrait:'https://dribbble.com/shots/6639386-Two-Dots-Treasure-Hunt-RPG-Overworld-Ice-Zone?utm_source=gold_browser_extension',
        image:'https://dribbble.com/shots/6639386-Two-Dots-Treasure-Hunt-RPG-Overworld-Ice-Zone?utm_source=gold_browser_extension',
        info:'ddd',
    };
    console.log(req.body);
    console.log(obj);
    models.book.where({id:req.body.id}).update(obj,function(err,result){
        console.log(err);
        console.log(result);
        if(err) return handleError(err);

        if(result.length==0){
            res.json(config.setResponse(config.setCode.Error_Code,null,'更新绘本失败',null));
        }else{
            //设置全局的session并写入前端
            res.json(config.setResponse(config.setCode.Success_Code,result,'更新绘本成功',null));
        }
    })
});
router.get('/detail',function(req,res){
    //需要先判断是否登录了
    var obj={
        id:parseInt(req.query.id),
    };
    console.log(obj);
    models.book.findOne(obj,function(err,result){

        if(err) return console.log(err);

        if(result.length==0){
            res.json(config.setResponse(config.setCode.Error_Code,null,'获取绘本详情失败',null));
        }else{

            res.json(config.setResponse(config.setCode.Success_Code,result,'获取绘本详情成功',null));
        }
    })
});

router.post('/delete',function(req,res){
    //需要先判断是否登录了
    var obj={
        id:req.body.id,
    };
    models.book.deleteOne(obj,function(err,result){
        console.log(err);
        console.log(result);
        if(err) return handleError(err);

        if(result.length==0){
            res.json(config.setResponse(config.setCode.Error_Code,null,'删除绘本失败',null));
        }else{
            //设置全局的session并写入前端
            res.json(config.setResponse(config.setCode.Success_Code,null,'删除绘本成功',null));
        }
    })
});

module.exports=router;



