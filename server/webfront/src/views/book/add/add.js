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
            this.$refs['bookForm'].validate((valid) => {
                if (valid&&this.isTestObjError==false) {
                    this.submitBtnDisable=true;
                    this.fullscreenLoading=true;
                    ask.bookSetting.add(this.form,res=>{
                        if(res.code==0){
                            this.$router.push({
                                path:"/book/list",
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
