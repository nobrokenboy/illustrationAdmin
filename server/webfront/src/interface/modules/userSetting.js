import {get,post} from '../tools';
const userSetting={
    update(data,callback){
        post('/user/update',data,callback);
    },
    add(data,callback){
        post('/user/add',data,callback);
    },
    turnon(data,callback){
        post('/user/active',data,callback);
    },
    delete(data,callback){
        post('/user/delete',data,callback);
    },
    detail(data,callback){
        get('/user/detail/',data,callback);
    },
    list(data,callback){
        get('/user/list',data,callback);
    }
};
export default userSetting;

