import add from './add.vue';
export default {
    extends:add,
    name:'edit',
    data(){
        return {
            id:void 0
        }
    },
    mounted(){
        this.form.id=this.id=this.$route.query.id;
        this.getDetail();
    },
    methods:{
        getDetail(){
            this.fullscreenLoading=true;
            ask.godSetting.detail({
                id:this.id
            },res=>{
                if(res.code==0){
                    this.form.name=res.data.name;
                    this.form.brief=res.data.brief;
                    this.form.image=res.data.image;
                    this.form.content=res.data.content;

                }else{
                    this.$toast(res.msg);
                }
                this.fullscreenLoading=false;
            });
        },
        submit(){
            this.$refs['godForm'].validate((valid) => {
                if (valid&&this.isTestObjError==false) {
                    this.submitBtnDisable=true;
                    this.fullscreenLoading=true;
                    ask.godSetting.update(this.form,res=>{
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
                } else {
                    return false;
                }
            });


        }

    }
}

