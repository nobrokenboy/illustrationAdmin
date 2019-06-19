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
            ask.userSetting.detail({
                id:this.id
            },res=>{
                if(res.code==0){
                    this.form.userName=res.data.userName;
                    this.form.phone=res.data.phone;
                    this.form.password=res.data.password;
                    this.form.userBrief=res.data.userBrief;
                    this.form.portrait=res.data.portrait;

                }else{
                    this.$toast(res.msg);
                }
                this.fullscreenLoading=false;
            });
        },
        submit(){
            this.$refs['userForm'].validate((valid) => {
                if (valid&&this.isTestObjError==false) {
                    this.submitBtnDisable=true;
                    this.fullscreenLoading=true;
                    ask.userSetting.update(this.form,res=>{
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
                } else {
                    return false;
                }
            });


        }

    }
}

