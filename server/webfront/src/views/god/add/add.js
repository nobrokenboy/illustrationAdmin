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
            this.$refs['godForm'].validate((valid) => {
                if (valid&&this.isTestObjError==false) {
                    this.submitBtnDisable=true;
                    this.fullscreenLoading=true;
                    ask.godSetting.add(this.form,res=>{
                        if(res.code==0){
                            this.$router.push({
                                path:"/god/list",
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
