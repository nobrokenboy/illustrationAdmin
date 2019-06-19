import add from './add.vue';
export default {
    extends:add,
    name:'add',
    data(){
        return {

        }
    },
    mounted(){
        // this.alarmContextIndex=this.alarmContextArr.length-1;
    },
    methods:{
        submit(){
            this.$refs['userForm'].validate((valid) => {
                if (valid&&this.isTestObjError==false) {
                    this.submitBtnDisable=true;
                    this.fullscreenLoading=true;
                    ask.userSetting.add(this.form,res=>{
                        if(res.code==0){
                            this.$router.push({
                                path:"/user/list",
                            });
                        }else{
                            this.$toast(res.msg);
                            this.submitBtnDisable=false;
                            this.fullscreenLoading=false;
                        }

                    });
                }else{
                    return false;
                }
            });

        },
    }
}
