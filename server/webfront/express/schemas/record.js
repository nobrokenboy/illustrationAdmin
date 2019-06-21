var mongoose=require('mongoose');
//创建数据结构
var recordSchema=new mongoose.Schema({
    id:{
        type:Number
    },
    username:{
        type:String,
        required:true
    },
    content:{
        type:String
    },
    location:{
        type:String
    },
    image:{
        type:Array
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

module.exports=recordSchema;

