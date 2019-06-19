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
        console.log(this.$route.query.id);
        this.id=this.$route.query.id;
        this.getDetail();
    },
    methods:{
        getDetail(){
            this.fullscreenLoading=true;
            ask.adminSetting.detail({id:this.id},res=>{
                if(res.code==0){
                    this.form.userName=res.data.userName;
                    this.form.password=res.data.password;
                }else{
                    this.$toast(res.msg);
                }
                this.fullscreenLoading=false;
            });
        },
        submit(){
            this.$refs['adminForm'].validate((valid) => {
                if (valid&&this.isTestObjError==false) {
                    this.submitBtnDisable=true;
                    this.fullscreenLoading=true;
                    ask.adminSetting.update({
                        id:this.id,
                        userName:this.form.userName,
                        password:this.form.password
                    },res=>{
                        if(res.code==0){
                            this.$router.push({
                                path:"/admin/list",
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

