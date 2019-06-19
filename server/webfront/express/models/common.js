var mongoose=require('mongoose');
var commonSchema=require('../schemas/common');
var Common=mongoose.model('common',commonSchema);
module.exports=Common;