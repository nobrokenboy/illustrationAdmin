var mongoose=require('mongoose');
var recordSchema=require('../schemas/record');
var common=require('./common');

recordSchema.pre('save',function(next){
    console.log('保存前自增id');
    let doc = this;
    common.findByIdAndUpdate({ _id: 'adminId' }, { $inc: { seq: 1 } }, { new: true, upsert: true }, function (error, counter) {
        if (error) return next(error);
        doc.id = counter.seq;
        next();
    });
});
//生成模型
var record=mongoose.model('record',recordSchema);
//导出
module.exports=record;