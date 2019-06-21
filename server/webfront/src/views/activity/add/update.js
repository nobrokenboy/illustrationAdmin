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
            ask.activitySetting.detail({
                id:this.id
            },res=>{
                if(res.code==0){
                    this.form.title=res.data.title;
                    this.form.activityBrief=res.data.activityBrief;
                    this.form.activityImageId=res.data.activityImageId;
                    this.form.activityImage=res.data.activityImage;
                    this.initialValue=this.form.activityContent=res.data.activityContent;

                }else{
                    this.$toast(res.msg);
                }
                this.fullscreenLoading=false;
            });
        },
        submit(){
            this.$refs['activityForm'].validate((valid) => {
                this.$refs.md.handleSave();
                if (valid&&this.isTestObjError==false) {
                    this.submitBtnDisable=true;
                    this.fullscreenLoading=true;
                    ask.activitySetting.update(this.form,res=>{
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
                } else {
                    return false;
                }
            });


        }

    }
}

