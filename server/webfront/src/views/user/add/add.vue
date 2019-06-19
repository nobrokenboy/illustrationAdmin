<template>
    <div class="template-add" v-loading.lock="fullscreenLoading">
        <div>
            <el-form ref="userForm" :model="form" :rules="rules" label-width="140px" class="m-form" >
                <el-form-item label="用户名" style="width:400px" prop="userName">
                    <el-input v-model="form.userName"  placeholder="请输入用户名" ></el-input>
                </el-form-item>
                <el-form-item label="手机号" style="width:400px" prop="phone">
                    <el-input v-model="form.phone"  placeholder="请输入手机号" ></el-input>
                </el-form-item>
                <el-form-item label="密码" style="width:400px" prop="password">
                    <el-input v-model="form.password"  placeholder="请输入密码" ></el-input>
                </el-form-item>
                <el-form-item label="用户简介" style="width:600px" prop="userBrief">
                    <el-input v-model="form.userBrief"  placeholder="请输入用户简介" type="textarea" rows="6"></el-input>
                </el-form-item>
                <p align="center">
                    <button type="button" class="btn btn-common" @click="submit">提交</button>
                </p>
            </el-form>
        </div>
    </div>
</template>

<script>
    import MarkDown from 'vue-meditors'
    export default {
        name: "add",
        components:{
            MarkDown
        },
        data(){
            return {
                placeholderValue:"请输入问题描述",//placeholder的内容
                initialValue: "",//，markdown默认值
                theme: 'OneDark',//主题
                alarmContextArr:[
                ],
                imageUrl: '',
                form:{
                    userName:"",
                    phone:"",
                    password:"",
                    userBrief:"",
                    imageUrl:""
                },
                alarmContextIndex:0,
                alarmTypeList:[],
                requestParams:{
                    search:"",
                    pageNo:1,
                    pageSize:100,
                },
                fullscreenLoading:false,
                currentTestObj:{},
                testErrorObjStr:'',
                testErrorObjArr:'',
                isTestObjError:false,
                rules: {
                    job: [
                        { required: true, message: '请输入job名称', trigger: 'blur' }
                    ],
                    name: [
                        { required: true, message: '请输入模板名称', trigger: 'blur' }
                    ],
                    typeId: [
                        { required: true, message: '请输入告警类型ID', trigger: 'change' }
                    ],


                }

            }
        },
        mounted(){

        },
        methods:{

        }
    }
</script>
