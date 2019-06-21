import {get,post} from '../tools';
const upload={
    add(data,callback){
        //处理一下
        var formData=new FormData();
        formData.append('file',data.file);
        formData.append('moduleType',data.moduleType);
        // formData.append('',data.file);
        post('/upload/add',formData,callback);
    },
    update(data,callback){
        post('/upload/update',data,callback);
    },
    delete(data,callback){
        post('/upload/delete',data,callback);
    }
};
export default upload;
