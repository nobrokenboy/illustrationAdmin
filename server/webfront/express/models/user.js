var mongoose=require('mongoose');
var userSchema=require('../schemas/user');
var common=require('./common');

userSchema.pre('save',function(next){
    console.log('保存前自增id');
    let doc = this;
    common.findByIdAndUpdate({ _id: 'adminId' }, { $inc: { seq: 1 } }, { new: true, upsert: true }, function (error, counter) {
        if (error) return next(error);
        doc.id = counter.seq;
        next();
    });
});
//生成模型
var user=mongoose.model('user',userSchema);
//导出
module.exports=user;