var express=require('express');
var router=express.Router();
var models=require('../models');
var config=require('../config');
var file=require('../common/file');
var multer=require('multer');//获取多文件



var folderPath="./express/upload";
var _folderPath="/upload";
file.createFolder(folderPath);
//实现定制化的
var fileName;
var storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,folderPath);
    },
    filename:function(req,file,cb){//image的name值
        console.log('文件');
        console.log(file);
        var fileFormat=file.originalname.split('.')[1];
        fileName=file.fieldname+"_"+Date.now()+"."+fileFormat;
        console.log(fileName);
        cb(null,fileName);
    }
});
//需要用到form-data时
var upload = multer({
    storage:storage,
    limits:{
        fileSize:1000000
    },
    fileFilter:function(req, file, cb){
        console.log('进入这里了吧');
        console.log(file);
        // console.log(req);
        var regx=/\.(jpg|jpeg|png)$/;
        if(regx.test(file.originalname)){
            cb(null, true)
        }else{
            console.log('不对的');
            cb(null, false)
        }
    }
});


router.post('/add',upload.single('image'),function(req,res){//上传文件
    // var fileFormat=req.file.originalname.split('.')[1];
    // fileName=req.file.fieldname+"_"+Date.now()+"."+fileFormat;
    // upload(req, res, function (err) {//上传错误的处理
    //     if (err instanceof multer.MulterError) {
    //         res.json(config.setResponse(config.setCode.Error_Code,'上传失败',null,null));
    //     } else if (err) {
    //         res.json(config.setResponse(config.setCode.Error_Code,'上传失败,未知错误，请联系后台工作人员',null,null));
    //     }
    // })

    var imageUrl = 'http://' + req.headers.host  + _folderPath + '/' + fileName;
    console.log('上传+用户id');
    console.log(req.session.sid);
    console.log(req.session.username);
    //插入图片,module:0(活动列表) 1（大神列表） 2（绘本列表） 3（用户头像） 4（插画圈）
    var obj={
        fileName:fileName,
        fileUrl:imageUrl,
        operatorId:req.session.sid,
        module:req.body.module
    };

    if(typeof req.session.sid==='undefined'){
        res.json({//登录失效
            code: 4006,
            msg: '登录已失效'
        });
    }
    models.picture.create(obj,function(err,result){
        if(err){
            return console.log(err);
        }
        console.log('上传结果');
        console.log(result);
        if(result.length==0){
            res.json(config.setResponse(config.setCode.Error_Code,null,'上传失败',null));
        }else{
            res.json(config.setResponse(config.setCode.Success_Code,{
                imageUrl:imageUrl,
                id:result.id,
                fileName:result.fileName
            },'上传成功',null));
        }

    });

});

router.post('/delete',function(req,res){//删除图片表的以及存在活动表的数据，并找到存放的目录删除
    console.log('执行删除');
    console.log(req.body);

    var obj={
        id:req.body.id,
    };
    //根据id返回详细信息
    models.picture.findOne(obj,function (err,result) {
         if(err){
             return console.log(err);
         }
         if(result.length==0){
             res.json(config.setResponse(config.setCode.Error_Code,null,'查找附件失败',null));
         }else{
             console.log('查找成功');
             console.log(result);
             var module=result.module;
             //删除文件
             file.deleteFile(folderPath+"/"+result.fileName,function(err,result){
                 if(err){
                     return console.log(err)
                 }else{
                     //删除数据库记录
                     models.picture.deleteOne(obj,function(err,result){
                         console.log(err);
                         console.log(result);
                         if(err) return handleError(err);

                         if(result.length==0){
                             res.json(config.setResponse(config.setCode.Error_Code,null,'删除附件失败',null));
                         }else{
                             //如何删掉其他模块下的图片记录呢
                             //根据模块字段进行删除
                             switch(module){//module:0(活动列表) 1（大神列表） 2（绘本列表） 3（用户头像） 4（插画圈）
                                 case 0:
                                     models.activity.where({activityImageId:obj.id}).update({
                                         activityImageId:"",
                                         activityImage:"",
                                     },function(err,result){
                                         if(err){
                                             return console.log(err);
                                         }

                                         if(result.length==0){
                                             res.json(config.setResponse(config.setCode.Error_Code,null,'删除附件成功',null));
                                         }else{
                                             res.json(config.setResponse(config.setCode.Success_Code,null,'删除附件成功',null));
                                         }
                                     });
                                     break;
                                 case 1:
                                     break;
                                 case 2:
                                     break;
                                 case 3:
                                     break;
                             }
                         }



                     })


                 }

             });
         }
    });

});
module.exports=router;

