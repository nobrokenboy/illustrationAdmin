var mongoose=require('mongoose');
//创建数据结构
var picSchema=new mongoose.Schema({
    id:{
        type:Number
    },
    fileName:{
        type:String,
        required:true
    },
    fileUrl:{
        type:String,
        required:true
    },
    operatorId:{
        type:Number,
        required:true
    },
    module:{
        type:Number,
        required:true
    },
    createTime: {
        type: Date,
        default: Date.now
    },
    updateTime: {
        type: Date,
        default: Date.now
    }


},{ timestamps:{ createdAt:'createTime', updatedAt: 'updateTime' }});

module.exports=picSchema;

