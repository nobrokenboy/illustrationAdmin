<template>
    <div class="template-list" v-loading.lock="fullscreenLoading">
       <div class="operation-panel mr-l clearfix">
           <button type="button" class="btn btn-common fr" @click="addOperation">新增</button>
       </div>
       <div class="m-table-wrapper">
           <el-table
                   :data="tableData"
                   empty-text="暂无数据"
                   style="width: 100%" >
               <el-table-column
                       prop="_id"
                       label="ID">
               </el-table-column>
               <el-table-column
                       prop="id"
                       label="用户ID">
               </el-table-column>
               <el-table-column
                       prop="userName"
                       label="用户名">
               </el-table-column>
               <el-table-column
                       prop="password"
                       label="用户密码">
               </el-table-column>
               <el-table-column
                       prop="address"
                       label="操作" width="250">
                   <template slot-scope="scope">
                       <p align="center">
                           <!--<span>{{JSON.stringify(scope.row)}}</span>-->
                           <a class="font-text-btn mr-r-xl" @click="edit(scope.row.id)">修改</a>
                           <a class="font-text-btn mr-r-xl" @click="deleteOperation(scope.row.id)">删除</a>
                       </p>
                   </template>
               </el-table-column>
           </el-table>
       </div>
    </div>
</template>

<script type="text/ecmascript-6" src="./list.js">

</script>

<style scoped>

</style>