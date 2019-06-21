<template>
    <div class="activity-list" v-loading.lock="fullscreenLoading">
       <div class="operation-panel mr-l clearfix">
           <button type="button" class="btn btn-common fr" @click="addOperation">新增</button>
       </div>
       <div class="m-table-wrapper">
           <el-table
                   :data="tableData"
                   empty-text="暂无数据"
                   style="width: 100%" >
               <el-table-column
                       prop="id"
                       label="ID">
               </el-table-column>
               <el-table-column
                       prop="username"
                       label="用户名">
               </el-table-column>
               <el-table-column
                       prop="content"
                       label="内容">
               </el-table-column>
               <el-table-column
                       prop="location"
                       label="定位">
               </el-table-column>
               <el-table-column
                       prop="image"
                       label="记录图片" >
                   <template slot-scope="scope">
                       <img :src="scope.row.image" alt="记录图片">
                   </template>
               </el-table-column>
               <el-table-column
                       prop="createTime"
                       label="创建时间" >
               </el-table-column>
               <el-table-column
                       prop="updateTime"
                       label="修改时间" >
               </el-table-column>
               <!--<el-table-column-->
                       <!--prop="address"-->
                       <!--label="操作" width="250">-->
                   <!--<template slot-scope="scope">-->
                       <!--<p align="center">-->
                           <!--<a class="font-text-btn mr-r-xl" @click="edit(scope.row.id)">修改</a>-->
                           <!--<a class="font-text-btn mr-r-xl" @click="deleteOperation(scope.row.id)">删除</a>-->
                       <!--</p>-->
                   <!--</template>-->
               <!--</el-table-column>-->
           </el-table>
       </div>
        <!--<p align="left" class="font-text-btn f12 pd-l">每页{{requestParams.pageSize}}条,共{{paginationObj.total}}条</p>-->

        <!--<div class="m-pagination-wrapper" align="center">-->
            <!--<el-pagination-->
                    <!--@current-change="handleCurrentChange"-->
                    <!--:current-page.sync="requestParams.pageNo"-->
                    <!--:page-size="requestParams.pageSize"-->
                    <!--:pager-count="5"-->
                    <!--prev-text="上一页"-->
                    <!--next-text="下一页" layout="prev, pager, next, jumper"-->
                    <!--:total="paginationObj.total">-->
            <!--</el-pagination>-->
        <!--</div>-->
    </div>
</template>

<script type="text/ecmascript-6" src="./list.js">

</script>

<style scoped>

</style>