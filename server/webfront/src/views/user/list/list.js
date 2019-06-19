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
               userName:"",
               phone:""
            },
            paginationObj:{
                total:0,
            }
        }

    },
    mounted(){
        this.getUserList();
    },
    methods:{
        getUserList(){
            ask.userSetting.list(this.requestParams,(res)=>{
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
            this.$confirm('是否确定删除该用户?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                //调用接口删除
                ask.userSetting.delete({
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
        },
        addOperation(){
            this.$router.push({
                path:"/user/add",
            });
        }
    }
}
