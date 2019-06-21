/*
* 实现数据库id的自增
* */
var mongoose=require('mongoose');
mongoose.set('bufferCommands', false);//禁止缓存
//数据库选项
var options={
    useNewUrlParser: true
};
//连接数据库
var db=mongoose.connect('mongodb://localhost/illustration',options,(err,client)=>{
    // console.log(client.models.admin.schema);
    if(err){
        console.log('连接失败');
    }else{
        console.log('连接成功');
    }
});

