<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="12">
        <h1 class="h1">主奖池</h1>
        <el-card >
          <h1>
            奖池：{{currentAmount}}
          </h1>
          <el-form :model="infoForm" status-icon ref="infoForm" label-width="150px" class="demo-infoForm">
            <el-form-item label="抢夺总数量" prop="pass">
              <span>{{infoForm.amount}}</span>
            </el-form-item>
            <el-form-item label="当前轮抢夺总数" prop="amount">
              <span>{{infoForm.amount}}</span>
            </el-form-item>
           <el-form-item label="上一次赢取列表" prop="amount">
              <span>{{infoForm.amount}}</span>            
            </el-form-item>
            <el-form-item label="所有赢取列表" prop="amount">
              <span>{{infoForm.amount}}</span>
            </el-form-item>
            <el-form-item label="当前总额" prop="amount">
              <span>{{infoForm.amount}}</span>            
            </el-form-item>
            <el-form-item label="总流水" prop="amount">
              <span>{{infoForm.amount}}</span>            
            </el-form-item>
          </el-form>
          <div >
            <el-button plain type="info">抢夺</el-button>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
          <h1>私有奖池</h1>
          <div class="opera">
            <el-button class="more" type="text" @click="moreGames">more</el-button>
          </div>
          <el-col class="ef" :span="10" v-for="(item) in priList" :key="item">
            <div style="cursor:pointer" @click="privateGame(item)">
              <div>抢夺总数量:{{item.am}}</div>
              <div>奖池总额:{{item.amount}}</div>
              <div>奖池轮数:{{item.count}}</div>
              <div>结束时间:{{item.time}}</div>
            </div>
          </el-col>
      </el-col>
    </el-row>
    
  </div>
</template>

<script>
export default {
  name: 'SnatchMain',
  data () {
    return {
      infoForm:{amount:10},
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
    moreGames(){
      this.$router.push({ path: 'games'})
    },
    privateGame(item){
      this.$router.push({ path: 'gameDetail', params: { gameId: item._id }})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.opera{
  height: 60px;
}
.more{
  color: blueviolet;
  float: right;;
  cursor:pointer; 
}
.h1{
  text-align: center;
}
.ef{
  text-align: center;
  padding-left: 0px !important;
  padding-right: 0px !important;
  border:1px solid white;
  padding:10px;
  margin: 12px;
}

.el-card {
  text-align: center;
  color: white;
  margin-left: 100px;
  margin-right: 100px;
  margin-bottom:100px;
  /* padding: 100px; */
  /* height:700px; */
  background-color: rgb(255, 255, 255,0);
  overflow-y:auto;
  overflow-x:hidden;
}
</style>
