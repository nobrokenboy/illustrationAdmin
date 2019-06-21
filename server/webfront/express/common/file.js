//创建目录
var fs=require('fs');
var createFolder=function(folder){
    try{
        fs.accessSync(folder);
    }catch(e){
        fs.mkdirSync(folder);
    }
}
//删除文件
var deleteFile=function(file,callback){
    var result;
    console.log('删除文件');
    console.log(file);
    fs.unlink(file,(err)=>{
         if(err){
             throw  err;
         }else{
             result=true;
             if(typeof callback==='function'){
                 callback(err,result);
             }
         }


    });

}

module.exports={
    createFolder,
    deleteFile
};
