import {get,post} from '../tools';
const user={
    login(data,callback){//登录接口
        post('/admin/login',data,callback);
    },
    logout(data,callback){//退出登录接口
        get('/admin/logout',data,callback);
    },
    getMsg(callback){//获取用户的信息
        get('/admin/info',{},callback);
    }
}
export default user;

