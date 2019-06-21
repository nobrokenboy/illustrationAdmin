import {get,post} from '../tools';
const godSetting={
    update(data,callback){
        post('/god/update',data,callback);
    },
    add(data,callback){
        post('/god/add',data,callback);
    },
    turnon(data,callback){
        post('/god/active',data,callback);
    },
    delete(data,callback){
        post('/god/delete',data,callback);
    },
    detail(data,callback){
        get('/god/detail/',data,callback);
    },
    list(data,callback){
        get('/god/list',data,callback);
    }
};
export default godSetting;



