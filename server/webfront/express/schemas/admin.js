var mongoose=require('mongoose');
//创建数据结构
var adminSchema=new mongoose.Schema({
    id:{
        type:Number
    },
    userName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },

});

module.exports=adminSchema;

