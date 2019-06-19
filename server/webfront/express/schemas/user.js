var mongoose=require('mongoose');
//创建数据结构
var userSchema=new mongoose.Schema({
    id:{
        type:Number
    },
    userName:{//用户名
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    password:{
        type:String
    },
    code:{//验证码
        type:String
    },
    userBrief:{//用户简介
        type:String
    },
    portrait:{//用户头像
        type:String
    }


});

module.exports=userSchema;

