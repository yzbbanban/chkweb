<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="12">
        <h1 class="h1">主奖池1</h1>
        <el-card >
          <h1>
            奖池：{{infoForm.amount}}
          </h1>
          <span>开奖时间 {{infoForm.timer}}</span>
          <progress-lsp ref="changeProcess"></progress-lsp>
          <el-form :model="infoForm" status-icon ref="infoForm" label-width="150px">
            <el-form-item label="上一次出价" prop="lastAmount">
              <span>{{infoForm.lastAmount}}</span>
            </el-form-item>
            <el-form-item label="当前出价" prop="lastAmount">
              <span>{{infoForm.currentAmount}}</span>
            </el-form-item>
            <el-form-item label="上一次出价时间" prop="lastTime">
              <span>{{infoForm.lastTime}}</span>
            </el-form-item>
            <!-- <el-form-item label="开奖时间" prop="timer">
              <span>{{infoForm.timer}}</span>
            </el-form-item> -->
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
            <el-button type="success" v-show="snatchBtn" plain v-loading.fullscreen.lock="fullscreenLoading" @click="snatch">抢夺</el-button>
            <el-button type="success" v-show="withdrawPoolBtn" plain v-loading.fullscreen.lock="fullscreenLoading" @click="withdraw">领取收益</el-button>
            <el-button type="success" v-show="otherWithdrawPoolBtn" plain v-loading.fullscreen.lock="fullscreenLoading" @click="otherWithdraw">帮助收取</el-button>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
          <h1 class="h1">主奖池2</h1>
          <el-card >
            <span>暂未开放</span>
          </el-card>
      </el-col>
    </el-row>
   
  </div>
</template>

<script>
import {initSnatchContract,getCurrentSnatchInfo,snatchPool,withdrawPool,otherWithdrawPool} from "../util/indexSnatch.js";
import {decimalToBalance,balanceToDecimal} from "../util/MathUtil.js";
import progressLsp from "./ProgressLsp"
import { BigNumber } from "@ethersproject/bignumber";

var moment = require('moment');
const address0='0x0000000000000000000000000000000000000000'
export default {
  name: 'SnatchMain',
  components: {
      progressLsp
  },
  async created(){
    await initSnatchContract()
    this.initSnatch();
  },
  data () {
    return {
      numberTime:null,
      fullscreenLoading:false,
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
        currentAmount:"",
        increaseRange:"",
        totalAmount:"",
        snatchCount:"",
        totalSnatchCount:"",
        timer:0,
        },
      
    }
  },
  methods:{
    async initSnatch(){
      this.$refs.changeProcess.clearTime();
      let resultInfo = await getCurrentSnatchInfo()
      let info = JSON.parse(JSON.stringify(resultInfo))
      this.infoForm.lastOwner = info[0]
      this.infoForm.tempOwner = info[1]==address0?"--":info[1]
      this.infoForm.amount = balanceToDecimal(info[2])
      this.infoForm.submitAmount = balanceToDecimal(info[3])
      this.infoForm.lastAmount = balanceToDecimal(info[4])
      this.infoForm.lastTime =  info[5]==0?"--":moment.unix(info[5]).format("YYYY-MM-DD HH:mm")
      this.infoForm.startTime = info[6]==0?"--":moment.unix(info[6]).format("YYYY-MM-DD HH:mm")
      this.infoForm.durationEndTime = info[6]==0?"--":moment.unix(parseInt(info[6])+(parseInt(info[7]))).format("YYYY-MM-DD HH:mm")
      this.infoForm.durationTime = info[8]
      this.infoForm.increaseRange = info[9]
      this.infoForm.currentAmount = 
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

      this.fullscreenLoading = false;
      this.time = info[8]
      // 当前时间-上次时间
      this.getChick(info[5]);
      this.getCode(info[5]);
    },
    async otherWithdraw(){
      var account = localStorage.getItem('MyAccount');
      let tx = await otherWithdrawPool(account);
      console.log(tx);
      this.$notify({
          title: '成功',
          message: '帮助领取成功',
          type: 'success'
        });
      this.initSnatch()
    },
    async withdraw(){
      var account = localStorage.getItem('MyAccount');
      let tx = await withdrawPool(account);
      console.log(tx);
      this.$notify({
          title: '成功',
          message: '领取成功',
          type: 'success'
        });
      this.initSnatch()
    },
    getChick(lastTime){
      let showTime = this.time-(moment().unix().valueOf()-lastTime)
      let du = Number(this.infoForm.durationTime)
      this.$refs.changeProcess.changePrecent(du-showTime,du);
    },
    getCode(lastTime) {
      if(this.numberTime!=null){
        clearInterval(this.numberTime)
      }
      this.numberTime = setInterval(()=>{
        let showTime = this.time-(moment().unix().valueOf()-lastTime)
        this.infoForm.timer = showTime >=0?showTime:0
        if(this.infoForm.timer==0){
          clearInterval(this.numberTime)
          clearTimeout(this.infoForm.timer)
        }
      },1000)
    },
    async snatch(){
      this.initSnatch();
      this.openFullScreen()
      var account = localStorage.getItem('MyAccount');
      // if(this.infoForm.tempOwner == account){
      //   this.$notify({
      //     title: '提示',
      //     message: '不可以连续抢夺',
      //     type: 'warning'
      //   });
      //   this.fullscreenLoading = false
      //   return;
      // }
      console.log('==sss=>'+decimalToBalance(this.infoForm.lastAmount))
      //当前价格
      let _amount = decimalToBalance(this.infoForm.lastAmount);
      let _rate = BigNumber.from(this.infoForm.increaseRange);
      let _count =  BigNumber.from(Number(this.infoForm.snatchCount)+1); 
      let samount=_amount.add(_amount.mul(_rate.mul(_count.div(100)).div(100)))
      console.log('====>'+samount)
      let tx = await snatchPool(account,samount);
      console.log(tx);
      this.$notify({
          title: '成功',
          message: '抢夺成功',
          type: 'success'
        });
      this.initSnatch()
    },
    openFullScreen() {
      this.fullscreenLoading = true
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.opera{
  height: 60px;
}
.more{
  color: rgb(0, 161, 35);
  float: right;
  font-size: 30px;
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
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom:20px;
  /* padding: 100px; */
  /* height:700px; */
  background-color: rgba(133, 133, 133, 0.479);
  overflow-y:auto;
  overflow-x:hidden;
}
</style>
