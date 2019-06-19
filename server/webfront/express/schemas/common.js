/*
* 实现自增id的公共counter
* */
var mongoose=require('mongoose');
var commonCounterSchema=new mongoose.Schema({
    _id:{
       type:String,
        required:true,
    },
    seq:{
        type:Number,
        default:0
    }
});

//
// commonCounterSchema.statics={
//     addSequence(id,callback){
//         this.findOneAndUpdate(
//             {_id:id},
//             {
//                 $inc:{
//                     seq:1
//                 }
//             },
//             {
//                 new:true
//             },
//             callback
//         );
//     }
// };

module.exports=commonCounterSchema;
