// import recordSetting from "../../../interface/modules/recordSetting";

export default {
    name:"list",
    data(){
        return {
            tableData: [],
            value2:true,
            currentPage3: 5,
            fullscreenLoading:true,
            requestParams:{
                username:this.$parent.username,
                content:""
            },
            paginationObj:{
                total:0,
            }
        }

    },
    mounted(){
        this.getRecordList();
    },
    methods:{
        getRecordList(){
            ask.recordSetting.list(this.requestParams,(res)=>{
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
            this.$confirm('是否确定删除该记录?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                //调用接口删除
                ask.recordSetting.delete({
                    id:id
                },res=>{
                    if(res.code==0){
                        this.getRecordList();
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
                path:"/record/edit",
                query:{
                    id:id
                }
            });
        },
        handleCurrentChange(val) {
            this.getRecordList();
        },
        addOperation(){
            this.$router.push({
                path:"/record/add",
            });
        }
    }
}
