import {get,post} from '../tools';
const bookSetting={
    update(data,callback){
        post('/book/update',data,callback);
    },
    add(data,callback){
        post('/book/add',data,callback);
    },
    turnon(data,callback){
        post('/book/active',data,callback);
    },
    delete(data,callback){
        post('/book/delete',data,callback);
    },
    detail(data,callback){
        get('/book/detail/',data,callback);
    },
    list(data,callback){
        get('/book/list',data,callback);
    }
};
export default bookSetting;



