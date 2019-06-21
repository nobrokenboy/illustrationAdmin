import {get,post} from '../tools';
const recordSetting={
    delete(data,callback){
        post('/record/delete',data,callback);
    },
    detail(data,callback){
        get('/record/detail/',data,callback);
    },
    list(data,callback){
        get('/record/list',data,callback);
    }
};
export default recordSetting;



