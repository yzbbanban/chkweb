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
            <el-form-item label="当前总额" prop="amount">
              <span style="font-size:40px">{{infoForm.amount}}</span>            
            </el-form-item>
            <el-form-item label="当前轮抢夺次数" prop="count">
              <span>{{infoForm.count}}</span>
            </el-form-item>
            <el-form-item label="本次截止时间" prop="endTime">
              <span>{{infoForm.endTime}}</span>            
            </el-form-item>
            <el-form-item label="抢夺总次数" prop="totalCount">
              <span>{{infoForm.totalCount}}</span>
            </el-form-item>
             <el-form-item label="总流水" prop="totalAmount">
              <span >{{infoForm.totalAmount}}</span>
            </el-form-item>
          </el-form>
          <div >
            <el-button plain type="primary">抢夺</el-button>
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
              <div>抢夺总数量:{{item.amount}}</div>
              <div>奖池总额:{{item.totalAmount}}</div>
              <div>奖池轮数:{{item.count}}</div>
              <div>结束时间:{{item.time}}</div>
            </div>
          </el-col>
      </el-col>
    </el-row>
    <!-- <div>
      <el-form :model="infoForm" status-icon ref="infoForm" label-width="150px" class="demo-infoForm">
        <el-form-item label="上一次赢取列表" prop="last">
          <span>{{infoForm.last}}</span>            
        </el-form-item>
        <el-form-item label="所有赢取列表" prop="winner">
          <span>{{infoForm.winner}}</span>
        </el-form-item>
      </el-form>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'SnatchMain',
  data () {
    return {
      infoForm:{
        amount:20.454,
        count:10,
        totalCount:142,
        endTime:"12min",
        totalAmount:184242.3314,
        },
      priList:[
        {_id:1,am:"21",amount:"56",totalAmount:"75.2",count:"54",time:"20:01"},
        {_id:2,am:"54",amount:"43",totalAmount:"16.2",count:"444",time:"20:52"},
        {_id:3,am:"65",amount:"32",totalAmount:"54.2",count:"12",time:"20:24"},
        {_id:4,am:"23",amount:"65",totalAmount:"67.3",count:"56",time:"20:55"},
        {_id:5,am:"76",amount:"43",totalAmount:"12.2",count:"3",time:"20:11"},
        {_id:6,am:"12",amount:"2",totalAmount:"15",count:"6",time:"20:33"}]
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
  margin-bottom: 90px;
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
