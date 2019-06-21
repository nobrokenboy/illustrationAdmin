<template>
    <div class="activity-add" v-loading.lock="fullscreenLoading">
        <div>
            <el-form ref="activityForm" :model="form" :rules="rules" label-width="140px" class="m-form" >
                <el-form-item label="标题" style="width:400px" prop="title">
                    <el-input v-model="form.title"  placeholder="请输入标题" ></el-input>
                </el-form-item>
                <el-form-item label="活动简介" style="width:600px" prop="activityBrief">
                    <el-input v-model="form.activityBrief"  placeholder="请输入活动简介" type="textarea" rows="6"></el-input>
                </el-form-item>
                <el-form-item label="活动图片" style="width:400px" prop="activityImage">
                    <el-upload  ref="upload"
                            class="avatar-uploader"
                            action="/illustration/upload/add"
                            list-type="picture-card"
                            :limit="1"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload"
                           :on-exceed="checkIsExceed"
                            :with-credentials="true"
                            :data="fileData"
                            :disabled="form.activityImage!==''"
                            name="image">
                        <img v-if="form.activityImage" :src="form.activityImage" class="avatar">
                        <i v-else class="el-icon-plus"></i>
                    </el-upload>
                    <!--<el-dialog :visible.sync="dialogVisible">-->
                        <!--<img :src="dialogImageUrl" width='100%' alt="">-->
                    <!--</el-dialog>-->
                    <button type="button"  class='btn btn-common mr-t-m' @click="deleteOperation"  v-if="form.activityImage">删除</button>
                </el-form-item>
                <el-form-item label="活动内容" style="width:1200px" prop="activityContent">
                    <div class="md-wrapper">
                        <mark-down  ref="md" :theme="theme" @on-save="save"  @on-paste-image="pasteImage"
                                    :initialValue="initialValue" />
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
    import MarkDown from 'vue-meditor'
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
                    title:"",
                    activityBrief:"",
                    activityImage:"",
                    activityImageId:"",
                    activityContent:"",
                },
                fullscreenLoading:false,
                currentTestObj:{},
                testErrorObjStr:'',
                testErrorObjArr:'',
                isTestObjError:false,
                dialogImageUrl:"",
                dialogVisible:false,
                rules: {



                },
                fileData:{
                    module:0,
                }

            }
        },
        mounted(){

        },
        methods:{
            handleAvatarSuccess(res, file) {
                console.log('上传成功111');
                if(res.code==0){
                    // this.imageUrl = URL.createObjectURL(file.raw);
                    this.form.activityImage = res.data.imageUrl;
                    this.form.activityImageId=res.data.id;
                }else{
                    if(res.code==4006){
                        console.log('进入这里了');
                        this.$router.push({
                            path:"/login",
                        });
                    }
                }
                this.$toast(res.msg);
            },
            beforeAvatarUpload(file) {
                console.log('进入这里吧');
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                console.log(file);
                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            save(content){//
                console.log('hahah');
                console.log(content);
                this.form.activityContent=content.value;
            },
            pasteImage(files){
                console.log('上传图片');
                console.log(files)
            },
            deleteOperation(){//删除文件
                console.log("ddd");
                this.$confirm('是否确定删除该图片?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    ask.upload.delete({
                        id:this.form.activityImageId
                    },res=>{
                        console.log(res);
                        if(res.code==0){
                            this.form.activityImage="";
                            this.form.activityImageId="";
                            //清除文件队列
                            this.$refs.upload.clearFiles()
                        }
                        this.$toast(res.msg);
                    });
                }).catch(() => {
                    // this.$toast('已取消删除');
                });

            },
            checkIsExceed(files, fileList){
                console.log('超出限制的个数');
                console.log(files);
                console.log(fileList);
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