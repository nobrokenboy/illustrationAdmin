import {get,post} from '../tools';
const adminSetting={
    update(data,callback){
        post('/admin/update',data,callback);
    },
    add(data,callback){
        post('/admin/add',data,callback);
    },
    delete(data,callback){
        post('/admin/delete',data,callback);
    },
    detail(data,callback){
        console.log('数据');
        console.log(data);
        get('/admin/detail',data,callback);
    },
    list(data,callback){
        get('/admin/list',data,callback);
    }
};
export default adminSetting;
