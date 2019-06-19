import userSetting from "../../../interface/modules/userSetting";

export default {
    name:"list",
    data(){
        return {
            tableData: [],
            value2:true,
            currentPage3: 5,
            fullscreenLoading:true,
            requestParams:{
                search:"",
                pageNo:1,
                pageSize:12,
            },
            paginationObj:{
                total:0,
            }
        }

    },
    watch:{
        '$route':'getUserList'//全局搜索时监听参数变化
    },
    mounted(){
        this.getUserList();
    },
    methods:{
        getUserList(){
            this.requestParams.search=this.$route.query.search||"";
            ask.userSetting.list(this.requestParams,(res)=>{
                console.log(res);
                if(res.code==0){
                    this.tableData=res.data.list;

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
            this.$confirm('是否确定删除该告警类型?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
               //调用接口删除
                ask.typeSetting.delete({
                    id:id
                },res=>{
                    if(res.code==0){
                        this.getUserList();
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
                path:"/user/edit",
                query:{
                    id:id
                }
            });
        },
        handleCurrentChange(val) {
            this.getUserList();
        }
    }
}
