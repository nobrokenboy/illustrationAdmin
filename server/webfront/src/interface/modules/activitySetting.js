import {get,post} from '../tools';
const activitySetting={
    update(data,callback){
        post('/activity/update',data,callback);
    },
    add(data,callback){
        post('/activity/add',data,callback);
    },
    turnon(data,callback){
        post('/activity/active',data,callback);
    },
    delete(data,callback){
        post('/activity/delete',data,callback);
    },
    detail(data,callback){
        get('/activity/detail/',data,callback);
    },
    list(data,callback){
        get('/activity/list',data,callback);
    }
};
export default activitySetting;



