var mongoose=require('mongoose');
var activitySchema=require('../schemas/activity');
var common=require('./common');

activitySchema.pre('save',function(next){
    console.log('保存前自增id');
    let doc = this;
    common.findByIdAndUpdate({ _id: 'adminId' }, { $inc: { seq: 1 } }, { new: true, upsert: true }, function (error, counter) {
        if (error) return next(error);
        doc.id = counter.seq;
        next();
    });
});
//生成模型
var activity=mongoose.model('activity',activitySchema);
//导出
module.exports=activity;