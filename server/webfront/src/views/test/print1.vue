<template>
<div class="print-modal" id ="printModal">
      <p align='center'>
        <el-image 
          style="width: 100px; height: 100px"
          :src="url" 
          :preview-src-list="[url]">
        </el-image>
      </p>

      <!-- <p>
        <el-upload
          class="upload-demo"
          drag
          list-type="picture-card"
          :limit=6
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </p> -->


    <div class="icon-wrapper">
      <div class="icon-item animated" v-for='item in itemList' :key='item.id'>
          <h4 >
            <i :class="item.icon"></i>
          </h4>
          <h4>{{item.name}}</h4>
          <h4>{{item.value}}</h4>
      </div>
    </div>

    
    <div class="contact">
        <span>联系我们</span>
        <i class="el-icon-arrow-down"></i>
    </div>


    <div class="contact2">
        <span>联系我们</span>
        <i class="el-icon-phone-outline animated infinite tada"></i>
    </div>
</div>


  
</template>
<script type="text/ecmascript-6">
export default {
     name: 'test',
     props:{

     },
     component:{},
      data() {
      return {
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        srcList: [
          'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
          'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
        ],
        itemList:[
          {
            id:0,
            name:"地址",
            icon:"el-icon-location",
            value:"广州市",
          },
          {
            id:1,
            name:"地址",
            icon:"el-icon-location",
            value:"广州市",
          },
          {
            id:2,
            name:"地址",
            icon:"el-icon-location",
            value:"广州市",
          },
          {
            id:3,
            name:"地址",
            icon:"el-icon-location",
            value:"广州市",
          },
          {
             id:4,
            name:"地址",
            icon:"el-icon-location",
            value:"广州市",
          },
          {
            id:5,
            name:"地址",
            icon:"el-icon-location",
            value:"广州市",
          }
        ]
      }
    },
    created() {
       var res=this.query();
       console.log(res);
       var res1=this.max();
    },
     methods:{
       query(){
         console.log('www');
         // 求出 data 中， 年龄在20岁以上，体重最小者：
          const data = [
            {name: 'a', age: 37, weight: 72},
            {name: 'b', age: 17, weight: 64},
            {name: 'c', age: 24, weight: 89},
            {name: 'd', age: 66, weight: 83},
            {name: 'e', age: 47, weight: 105},
            {name: 'f', age: 18, weight: 61}
          ];

          function filterBy(predicate, data) {
            return data.filter(predicate);
          }

          function sortBy(field, data) {
            return data.sort((a, b) => a[field] - b[field]);
          }
          function head(data) {
            return data[0];
          }

          // var result=_.flow([
          //   _.curry(filterBy)(d => d.age > 20), // 筛选 20 岁以上的对象
          //   _.curry(sortBy)('weight'), // 以 weight 进行排序
          //   head // 获得数组第一个元素
          // ])(data); // {name: "a", age: 37, weight: 72}

          //  var result=_.flow([
          //   _.curry(filterBy)(d => d.age > 20),
          //   _.curry(sortBy)('weight'), 
          //   head
          // ])(data); 


          var result1=_.curry(filterBy)(d => d.age > 20)(data);
          var result2=_.curry(sortBy)("weight")(data);
          var result3=head(data);

          //flow返回的是函数，传入的参数是每个函数都有的
          var result=_.flow([
            _.curry(filterBy)(d => d.age > 20),
            _.curry(sortBy)("weight")
            ])(data);


          return {
             '1':result1,
             '2':result2,
             '3':result
          };

       },
       max(){//算出总分第一的同学
         let result;
         const data=[
           {
             id:0,
             name:"小明",
             score1:90,
             score2:100
           },
           {
             id:2,
             name:"小鹏",
             score1:77,
             score2:100
           },
           {
             id:3,
             name:"小华",
             score1:92,
             score2:88
           }
         ];
         
          

        // var name=_.filter(data,item=>item.score1+item.score2);
         

         //sort分数总和排满第一


         return result;
       }
    }
}
</script>
<style scoped lang='stylus'>
  .icon-wrapper
    display:flex;
    flex-wrap:wrap;
    width:900px;
  
  .icon-item
    flex:0 0 32%;
    height:120px;
    line-height:2;
    padding:10px 0;
    margin-bottom:10px;
    background:#fff;
    box-shadow:1px 8px 16px 0 rgba(7,17,27,.1)
    text-align:center;
    border-radius:6px;
    color:#333;
    will-change: transform,box-shadow;
    transition:transform .5s ease-in,box-shadow .5s ease-in;
    &:hover
      transform:translateY(-5px);
      box-shadow:0 12px 18px rgba(0,0,0,0.15);
  
  .icon-item:not(:nth-child(3n))
    margin-right:2%;
  
  for row in 1 2 3 4 5 6
    .icon-item:nth-child({row})
      animation-delay:row*0.1s
      

  @keyframes turnIn
     0%
      // opacity 0
     100%
      // opacity 1


  .contact
    box-sizing content-box
    position fixed
    right 10px
    top 20%
    // transform translateY(-50%)
    width 16px
    padding 10px 8px
    background #ccc
    font-size 16px
    word-wrap break-word
    line-height 1.5
    span 
      color #fff
    i 
      display inline-block
      // padding-top 5px
      will-change transform
      animation slide 1.5s ease infinite
      color #fff 
      font-weight bold

  .contact2
    box-sizing content-box
    position fixed
    right 10px
    top 50%
    transform translateY(-50%)
    width 16px
    padding 10px 8px
    background #ccc
    font-size 16px
    word-wrap break-word
    line-height 1.5
    span 
      color #fff
    i 
      display inline-block
      padding-top 5px
      will-change transform
      // animation shake 1.5s ease infinite
      // transform-origin center
      color #fff 
      font-weight bold


  @keyframes slide 
    0%
      transform:translateY(0)
    100%
      transform:translateY(-8px)

   @keyframes shake 
    0%
      transform:rotate(0deg)
    100%
      transform:rotate(-135deg)
</style>