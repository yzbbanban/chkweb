<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="12">
        <h1 class="h1">主奖池</h1>
        <el-card >
          <h1>
            奖池：{{infoForm.amount}}
          </h1>
          <el-form :model="infoForm" status-icon ref="infoForm" label-width="150px" class="demo-infoForm">
            <el-form-item label="上一次出价" prop="lastAmount">
              <span>{{infoForm.lastAmount}}</span>
            </el-form-item>
            <el-form-item label="上一次出价时间" prop="lastTime">
              <span>{{infoForm.lastTime}}</span>
            </el-form-item>
            <el-form-item label="开奖时间" prop="timer">
              <span>{{infoForm.timer}}</span>
            </el-form-item>
            <el-form-item label="当前轮抢夺次数" prop="snatchCount">
              <span>{{infoForm.snatchCount}}</span>
            </el-form-item>
            <el-form-item label="当前抢夺者" prop="tempOwner">
              <span>{{infoForm.tempOwner}}</span>
            </el-form-item>
            <el-form-item label="本轮开始时间" prop="startTime">
              <span>{{infoForm.startTime}}</span>            
            </el-form-item>
            <el-form-item label="本轮截止时间" prop="durationEndTime">
              <span>{{infoForm.durationEndTime}}</span>            
            </el-form-item>
            <el-form-item label="抢夺总次数" prop="totalSnatchCount">
              <span>{{infoForm.totalSnatchCount}}</span>
            </el-form-item>
             <el-form-item label="总流水" prop="totalAmount">
              <span >{{infoForm.totalAmount}}</span>
            </el-form-item>
          </el-form>
          <div >
            <el-button v-show="snatchBtn" plain type="primary" @click="snatch">抢夺</el-button>
            <el-button v-show="withdrawPoolBtn" plain type="primary" @click="withdraw">领取收益</el-button>
            <el-button v-show="otherWithdrawPoolBtn" plain type="primary" @click="otherWithdraw">帮助收取</el-button>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
          <h1>私有奖池</h1>
          <div class="opera">
            <el-button class="more" type="text" @click="moreGames">more</el-button>
          </div>
          <el-col class="ef" :span="10" v-for="(item) in priList" :key="item._id">
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
import {initSnatchContract,getCurrentSnatchInfo,snatchPool,withdrawPool,otherWithdrawPool} from "../util/indexSnatch.js";
import {decimalToBalance,balanceToDecimal} from "../util/MathUtil.js";
var moment = require('moment');
export default {
  inject:['reload'],
  name: 'SnatchMain',
  async created(){
    await initSnatchContract()
    console.log("==============")
    let resultInfo = await getCurrentSnatchInfo()
    let info = JSON.parse(JSON.stringify(resultInfo))
    this.infoForm.lastOwner = info[0]
    this.infoForm.tempOwner = info[1]
    this.infoForm.amount = balanceToDecimal(info[2])
    this.infoForm.submitAmount = balanceToDecimal(info[3])
    this.infoForm.lastAmount = balanceToDecimal(info[4])
    this.infoForm.lastTime =  moment.unix(info[5]).format("YYYY-MM-DD HH:mm")
    this.infoForm.startTime = moment.unix(info[6]).format("YYYY-MM-DD HH:mm")
    this.infoForm.durationEndTime = moment.unix(parseInt(info[6])+(parseInt(info[7]))).format("YYYY-MM-DD HH:mm")
    this.infoForm.durationTime = info[8]
    this.infoForm.increaseRange = info[9]
    this.infoForm.totalAmount = balanceToDecimal(info[10])
    this.infoForm.snatchCount = info[11]
    this.infoForm.totalSnatchCount = info[12]
    //结束，显示帮助其他人领取，自己领取
    let showTime = info[8]-(moment().unix().valueOf()-info[5])
    if(info[5]!=0 && showTime <= 0){
      this.snatchBtn = false
      let acc = localStorage.getItem('MyAccount');
      if(this.infoForm.tempOwner==acc){
        this.withdrawPoolBtn=true;
      } else {
        this.otherWithdrawPoolBtn = true
      }
    }else{
      this.snatchBtn = true
      this.otherWithdrawPoolBtn = false
      this.withdrawPoolBtn = false;
    }

    this.time = info[8]
    // 当前时间-上次时间
    this.getCode(info[5]);
  },
  data () {
    return {
      times: 0,
      withdrawPoolBtn:false,
      otherWithdrawPoolBtn:false,
      snatchBtn:false,
      infoForm:{
        lastOwner:"",
        tempOwner:"",
        amount:"",
        submitAmount:"",
        lastAmount:"",
        lastTime:"",
        startTime:"",
        durationEndTime:"",
        durationTime:"",
        increaseRange:"",
        totalAmount:"",
        snatchCount:"",
        totalSnatchCount:"",
        timer:0,
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
    async otherWithdraw(){
      var account = localStorage.getItem('MyAccount');
      let tx = await otherWithdrawPool(account);
      console.log(tx);
      this.reload();
      this.$notify({
          title: '成功',
          message: '帮助领取成功',
          type: 'success'
        });
    },
    async withdraw(){
      var account = localStorage.getItem('MyAccount');
      let tx = await withdrawPool(account);
      console.log(tx);
      this.reload();
      this.$notify({
          title: '成功',
          message: '领取成功',
          type: 'success'
        });
    },
    getCode(lastTime) {
      setInterval(()=>{
        let showTime = this.time-(moment().unix().valueOf()-lastTime)
        this.infoForm.timer = showTime >=0?showTime:0
        if(this.infoForm.timer===0){
          clearInterval(this.infoForm.timer)
        }
      },1000)
    },
    moreGames(){
      this.$router.push({ path: 'games'})
    },
    privateGame(item){
      this.$router.push({ path: 'gameDetail', params: { gameId: item._id }})
    },
    async snatch(){
      var account = localStorage.getItem('MyAccount');
      if(this.infoForm.tempOwner == account){
        this.$notify({
          title: '提示',
          message: '不可以重复抢夺',
          type: 'warning'
        });
        return;
      }
      let tx = await snatchPool(account,decimalToBalance(this.infoForm.lastAmount));
      console.log(tx);
      this.reload();
      this.$notify({
          title: '成功',
          message: '抢夺成功',
          type: 'success'
        });
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
