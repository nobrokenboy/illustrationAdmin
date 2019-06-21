import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
import login from 'views/login/login.vue';
import index from 'views/index/index.vue';
/*------------------管理者列表---------------------*/
import adminList from 'views/admin/list/list.vue';
import adminAdd from 'views/admin/add/add.js';
import adminUpdate from 'views/admin/add/update.js';
import adminDetail from 'views/admin/detail/detail.vue';
/*------------------用户列表---------------------*/
import userList from 'views/user/list/list.vue';
import userAdd from 'views/user/add/add.js';
import userUpdate from 'views/user/add/update.js';
/*-------------------活动列表----------------------*/
import activityList from 'views/activity/list/list.vue';
import activityAdd from 'views/activity/add/add.js';
import activityEdit from 'views/activity/add/update.js';
/*--------------------大神列表----------------------*/
import godList from 'views/god/list/list.vue';
import godAdd from 'views/god/add/add.js';
import godEdit from 'views/god/add/update.js';
/*---------------------绘本列表-------------------*/
import bookList from 'views/book/list/list.vue';
import bookAdd from 'views/book/add/add.js';
import bookEdit from 'views/book/add/update.js';
/*---------------------插画圈记录列表-------------------*/
import recordList from 'views/record/list/list.vue';



import error from 'views/error/error.vue';
const routes=[
    {
        path:"/login",
        component:login,
        name:"登录",
        meta:{
            navText:"",
        },
    },
    {
        path:"/index",
        component:index,
        name:"首页",
        children:[
            {
                path:"/admin/list",
                component:adminList,
                name:"管理者列表",
                icon:require("../assets/imgs/btn-list.png"),
                isMenu:true,
            },
            {
                path:"/admin/add",
                component:adminAdd,
                name:"添加管理者",
                icon:require("../assets/imgs/btn-add.png"),
                meta:{
                    regexPath:"/admin/list",
                }
            },
            {
                path:"/admin/edit",
                component:adminUpdate,
                name:"管理者用户",
                meta:{
                    regexPath:"/admin/list",
                }
            },
            {
                path:"/admin/detail",
                component:adminDetail,
                name:"管理者详情",
                isMenu:false,
                meta:{
                    regexPath:"/admin/list",
                }
            },
            {
                path:"/user/list",
                component:userList,
                name:"用户列表",
                icon:require("../assets/imgs/btn-list.png"),
                isMenu:true,
            },
            {
                path:"/user/add",
                component:userAdd,
                name:"添加用户",
                icon:require("../assets/imgs/btn-add.png"),
                meta:{
                    regexPath:"/user/list",
                }
            },
            {
                path:"/user/edit",
                component:userUpdate,
                name:"编辑用户",
                meta:{
                    regexPath:"/user/list",
                }
            },
            {
                path:"/activity/list",
                component:activityList,
                name:"活动列表",
                icon:require("../assets/imgs/btn-list.png"),
                isMenu:true
            },
            {
                path:"/activity/add",
                component:activityAdd,
                name:"添加活动",
                icon:require("../assets/imgs/btn-add.png"),
                meta:{
                    regexPath:"/activity/list",//用于不在菜单时的路由激活状态匹配
                }
            },
            {
                path:"/activity/edit",
                component:activityEdit,
                name:"编辑活动",
                meta:{
                    regexPath:"/activity/list",
                }
            },
            {
                path:"/god/list",
                component:godList,
                name:"插画大神列表",
                icon:require("../assets/imgs/btn-list.png"),
                isMenu:true
            },
            {
                path:"/god/add",
                component:godAdd,
                name:"添加插画大神",
                icon:require("../assets/imgs/btn-add.png"),
                meta:{
                    regexPath:"/god/list",//用于不在菜单时的路由激活状态匹配
                }
            },
            {
                path:"/god/edit",
                component:godEdit,
                name:"编辑插画大神",
                meta:{
                    regexPath:"/god/list",
                }
            },
            {
                path:"/book/list",
                component:bookList,
                name:"绘本列表",
                icon:require("../assets/imgs/btn-list.png"),
                isMenu:true
            },
            {
                path:"/book/add",
                component:bookAdd,
                name:"添加绘本",
                icon:require("../assets/imgs/btn-add.png"),
                meta:{
                    regexPath:"/book/list",//用于不在菜单时的路由激活状态匹配
                }
            },
            {
                path:"/book/edit",
                component:bookEdit,
                name:"编辑绘本",
                meta:{
                    regexPath:"/book/list",
                }
            },
            {
                path:"/record/list",
                component:recordList,
                name:"记录列表",
                icon:require("../assets/imgs/btn-list.png"),
                isMenu:true
            }

        ]
    },
    {
        path:"/error",//错误时候用的
        component:error,
        name:"错误页面",
    },
    {
        path:"*",//匹配不到时候用的
        redirect: { path: '/error' },
        name:"错误页面",
    },
];

const router=new Router({routes});
export default router;
