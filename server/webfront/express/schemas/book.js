var mongoose=require('mongoose');
//创建数据结构
var bookSchema=new mongoose.Schema({
    id:{
        type:Number
    },
    name:{
        type:String,
        required:true
    },
    brief:{
        type:String
    },
    image:{
        type:String
    },
    info:{
        type:String
    },
    createTime: {
        type: Date,
        default: Date.now
    },
    updateTime: {
        type: Date,
        default: Date.now
    }

}, { timestamps:{ createdAt:'createTime', updatedAt: 'updateTime' }});

module.exports=bookSchema;

