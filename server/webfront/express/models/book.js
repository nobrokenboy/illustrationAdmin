var mongoose=require('mongoose');
var bookSchema=require('../schemas/book');
var common=require('./common');

bookSchema.pre('save',function(next){
    console.log('保存前自增id');
    let doc = this;
    common.findByIdAndUpdate({ _id: 'adminId' }, { $inc: { seq: 1 } }, { new: true, upsert: true }, function (error, counter) {
        if (error) return next(error);
        doc.id = counter.seq;
        next();
    });
});
//生成模型
var book=mongoose.model('book',bookSchema);
//导出
module.exports=book;