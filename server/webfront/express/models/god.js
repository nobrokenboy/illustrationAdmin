var mongoose=require('mongoose');
var godSchema=require('../schemas/god');
var common=require('./common');

godSchema.pre('save',function(next){
    let doc = this;
    common.findByIdAndUpdate({ _id: 'adminId' }, { $inc: { seq: 1 } }, { new: true, upsert: true }, function (error, counter) {
        if (error) return next(error);
        doc.id = counter.seq;
        next();
    });
});
//生成模型
var god=mongoose.model('god',godSchema);
//导出
module.exports=god;