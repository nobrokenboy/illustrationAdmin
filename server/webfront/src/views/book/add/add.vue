<template>
    <div class="book-add" v-loading.lock="fullscreenLoading">
        <div>
            <el-form ref="bookForm" :model="form" :rules="rules" label-width="140px" class="m-form" >
                <el-form-item label="名字" style="width:400px" prop="name">
                    <el-input v-model="form.name"  placeholder="请输入名字" ></el-input>
                </el-form-item>
                <el-form-item label="简介" style="width:600px" prop="breif">
                    <el-input v-model="form.brief"  placeholder="请输入简介" type="textarea" rows="6"></el-input>
                </el-form-item>
                <el-form-item label="图片" style="width:400px" prop="image">
                    <el-upload
                            class="avatar-uploader"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="详细介绍" style="width:1200px" prop="info">
                    <div >
                        <mark-down  ref="md" :theme="theme" :initialValue="initialValue" :placeholderValue="placeholderValue"/>
                    </div>
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
                    name:"",
                    brief:"",
                    image:"",
                    info:""
                },
                fullscreenLoading:false,
                currentTestObj:{},
                testErrorObjStr:'',
                testErrorObjArr:'',
                isTestObjError:false,
                rules: {



                }

            }
        },
        mounted(){

        },
        methods:{
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                console.log('进入这里吧');
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            }
        }
    }
</script>

<style lang="less">
    .avatar-uploader {
        .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }
        .el-upload:hover {
            border-color: #409EFF;
        }
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>