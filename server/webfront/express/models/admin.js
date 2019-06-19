var mongoose=require('mongoose');
var adminSchema=require('../schemas/admin');
var common=require('./common');

adminSchema.pre('save',function(next){
    console.log('保存前自增id');
    let doc = this;
    common.findByIdAndUpdate({ _id: 'adminId' }, { $inc: { seq: 1 } }, { new: true, upsert: true }, function (error, counter) {
        if (error) return next(error);
        doc.id = counter.seq;
        next();
    });
});

//生成模型
var admin=mongoose.model('admin',adminSchema);//参数1即是数据库的表名,数据库的表名要复数形式，这里要单数

//导出
module.exports=admin;