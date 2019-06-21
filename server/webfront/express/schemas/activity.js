var mongoose=require('mongoose');
//创建数据结构
var activitySchema=new mongoose.Schema({
    id:{
        type:Number
    },
    title:{//活动标题
        type:String,
        required:true
    },
    activityBrief:{
        type:String
    },
    activityImage:{
        type:String
    },
    activityImageId:{
        type:Number
    },
    activityContent:{
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

module.exports=activitySchema;

