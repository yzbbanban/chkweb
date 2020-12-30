<template>
  <div>
    <div class="title">私人列表</div>
    <el-container>
      <div class="box-container">
          <el-card class="box-card"  v-for="item in priList" :key="item._id">
            <div style="cursor:pointer" @click="privateGame(item)">
              <div>ID:{{item._id}}</div>
              <br>
              <div>抢夺总数量:{{item.am}}</div>
              <div>奖池总额:{{item.amount}}</div>
              <div>奖池轮数:{{item.count}}</div>
              <div>结束时间:{{item.time}}</div>
            </div>
          </el-card>
      </div>
  </el-container>
  </div>
</template>

<script>
export default {
    name:"Games",
    data () {
        return{
          address:"0x10E98765aE49E72Dd11b04a9c0981D79f05BE003",
          priList:[
        {_id:1,am:"21",amount:"56",count:"54",time:"20:01"},
        {_id:2,am:"54",amount:"43",count:"444",time:"20:52"},
        {_id:3,am:"65",amount:"32",count:"12",time:"20:24"},
        {_id:4,am:"23",amount:"65",count:"56",time:"20:55"},
        {_id:5,am:"76",amount:"43",count:"3",time:"20:11"},
        {_id:6,am:"12",amount:"2",count:"6",time:"20:33"}]
        }
    },
    methods:{
      privateGame(item){
        this.$router.push({ path: 'gameDetail', params: { gameId: item._id }})
      }
    }
}
</script>

<style scoped>
.title{
  color: white;
  margin-left: 50%;
}
.box-card {
  width: 20%;
  color: #eee;
  background: rgba(255, 255, 255, 0);
  margin: 25px;
}
.box-container{
  display: flex;
  flex-wrap: wrap;
  /* justify-content: space-between; */
  width: 80%;
  margin-left: 10%;
}

</style>
