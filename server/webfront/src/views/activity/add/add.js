import add from './add.vue';
export default {
    extends:add,
    name:'add',
    data(){
        return {

        }
    },
    mounted(){

    },
    methods:{
        submit(){
            this.$refs['activityForm'].validate((valid) => {
                this.$refs.md.handleSave();
                // return;
                if (valid&&this.isTestObjError==false) {
                    this.submitBtnDisable=true;
                    this.fullscreenLoading=true;
                    ask.activitySetting.add(this.form,res=>{
                        if(res.code==0){
                            this.$router.push({
                                path:"/activity/list",
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
