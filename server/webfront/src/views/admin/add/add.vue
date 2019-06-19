<template>
    <div class="template-add" v-loading.lock="fullscreenLoading">
        <div>
            <el-form ref="adminForm" :model="form" :rules="rules" label-width="140px" class="m-form" >
                <el-form-item label="用户名" style="width:400px" prop="userName">
                    <el-input v-model="form.userName"  placeholder="请输入用户名" ></el-input>
                </el-form-item>
                <el-form-item label="密码" style="width:400px" prop="password">
                    <el-input  type='password' v-model="form.password"  placeholder="请输入密码" ></el-input>
                </el-form-item>
                <p align="center">
                    <button type="button" class="btn btn-common" @click="submit">提交</button>
                </p>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "add",
        data(){
            return {
                alarmContextArr:[
                ],
                form:{
                    userName:"",
                    password:"",
                },
                fullscreenLoading:false,
                currentTestObj:{},
                testErrorObjStr:'',
                testErrorObjArr:'',
                isTestObjError:false,
                rules: {
                    userName: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }

            }
        }

    }
</script>

<style scoped lang="less">

</style>