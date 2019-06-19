export default {
    name:"list",
    data(){
        return {
            tableData: [],
            value2:true,
            currentPage3: 5,
            fullscreenLoading:true,
            requestParams:{
                userName:"",
            }
        }

    },
    watch:{
        '$route':'getAdminList'//全局搜索时监听参数变化
    },
    mounted(){
        this.getAdminList();
    },
    methods:{
        getAdminList(){
            ask.adminSetting.list(this.requestParams,(res)=>{
                console.log(res);
                if(res.code==0){
                    this.tableData=res.data;

                }else{
                    this.$toast(res.msg);
                }
                this.$nextTick(()=>{
                    this.fullscreenLoading=false;
                });
            });
        },
        deleteOperation(id){
            console.log('哈哈哈');
            this.$confirm('是否确定删除该管理者?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
               //调用接口删除
                ask.adminSetting.delete({
                    id:id
                },res=>{
                    if(res.code==0){
                        this.getAdminList();
                    }else{
                        this.$toast(res.msg);
                    }
                });
            }).catch(() => {
               // this.$toast('已取消删除');
            });
        },
        edit(id){
            this.$router.push({
                path:"/admin/edit",
                query:{
                    id:id
                }
            });
        },
        goDetail(id){
            this.$router.push({
                path:"/admin/detail",
                query:{
                    id:id
                }
            });
        },
        addOperation(){
            this.$router.push({
                path:"/admin/add",
            });
        }
    }
}
