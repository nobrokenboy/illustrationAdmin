var mongoose=require('mongoose');
var pictureSchema=require('../schemas/picture');
var common=require('./common');

pictureSchema.pre('save',function(next){
    let doc = this;
    common.findByIdAndUpdate({ _id: 'adminId' }, { $inc: { seq: 1 } }, { new: true, upsert: true }, function (error, counter) {
        if (error) return next(error);
        doc.id = counter.seq;
        next();
    });
});
//生成模型
var picture=mongoose.model('picture',pictureSchema);
//导出
module.exports=picture;