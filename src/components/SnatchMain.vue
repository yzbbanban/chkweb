<template>
  <div>
    <div v-if="Number(infoForm.snatchCount)+1==Number(nextSurprise)" class="peg">
      <el-image style="width:150px;height:150px;" :src='pegUrl'></el-image>
      <div>
        <span style="margin-left:40px">彩蛋来啦</span>
      </div>
    </div>
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
            <span style="font-size:10px;">(下一次彩蛋次数{{nextSurprise}})</span>
            <el-form-item label="当前轮已抢夺次数" prop="snatchCount">
              <span>{{infoForm.snatchCount}}</span>
              <span style="font-size:10px;color:yellow">(彩蛋当前轮每{{surprise}}次可获得)</span>
            </el-form-item>
            <el-form-item label="当前抢夺者" prop="tempOwner">
              <span>{{infoForm.tempOwner.substring(0,8)+"..."+infoForm.tempOwner.substring(36,42)}}</span>
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
            <el-image v-show="snatchSurpriseBtn" style="width:100px;height:100px;cursor:pointer;" :src='pegUrl' @click="snatch"></el-image>
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
import {initSnatchContract,getCurrentSnatchInfo,getSurprise,
      snatchPool,withdrawPool,otherWithdrawPool} from "../util/indexSnatch.js";
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
    // let s =(this.infoForm.snatchCount/surprise>1?surprise*infoForm.snatchCount/surprise:surprise)-1
    // console.log('===>'+s)
    this.refresh();
    this.initSnatch();
  },
  data () {
    return {
      snatchSurpriseBtn:false,
      pegUrl: require("../../src/assets/peg.png"),
      nextSurprise:0,
      surprise:0,
      numberTime:null,
      refreshTime:null,
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
      let resultInfo = await getCurrentSnatchInfo()
      this.surprise = ''+ await getSurprise();
      let r=Number(this.infoForm.snatchCount)/Number(''+this.surprise)
      this.nextSurprise = (Math.floor(r)+1) * this.surprise
      let info = JSON.parse(JSON.stringify(resultInfo))
      this.infoForm.lastOwner = info[0]
      this.infoForm.tempOwner = info[1]==address0?"--":info[1]
      this.infoForm.amount = balanceToDecimal(info[2])
      this.infoForm.submitAmount = balanceToDecimal(info[3])
      this.infoForm.lastAmount = balanceToDecimal(info[4])
      this.infoForm.lastTime = info[5]==0?"--":moment.unix(info[5]).format("YYYY-MM-DD HH:mm")
      this.infoForm.startTime = info[6]==0?"--":moment.unix(info[6]).format("YYYY-MM-DD HH:mm")
      this.infoForm.durationEndTime = info[6]==0?"--":moment.unix(parseInt(info[6])+(parseInt(info[7]))).format("YYYY-MM-DD HH:mm")
      this.infoForm.durationTime = info[8]
      this.infoForm.increaseRange = info[9]
      this.infoForm.currentAmount = this.infoForm.lastAmount
      this.infoForm.totalAmount = balanceToDecimal(info[10])
      this.infoForm.snatchCount = info[11]
      this.infoForm.totalSnatchCount = info[12]
      //结束，显示帮助其他人领取，自己领取
      let nowT = moment().unix().valueOf()
      let showTime = info[8]-(nowT-info[5])
      let endTime = info[7]-(nowT-info[5])
      if(info[5]!=0 && showTime <= 0 || (endTime<=0&&info[1]!=address0)){
        this.snatchBtn = false
        this.snatchSurpriseBtn=false
        let acc = localStorage.getItem('MyAccount');
        if(this.infoForm.tempOwner==acc){
          this.withdrawPoolBtn=true;
        } else {
          this.otherWithdrawPoolBtn = true
        }
      }else{
        let _count = Number(this.infoForm.snatchCount)+1
        if(_count==Number(this.nextSurprise)){
          this.snatchSurpriseBtn=true
          this.snatchBtn = false
        }else{
          this.snatchBtn = true
          this.snatchSurpriseBtn=false
        }
        this.otherWithdrawPoolBtn = false
        this.withdrawPoolBtn = false;
        let _amount=Number(this.infoForm.submitAmount)
        let _rate = 20
        let amountResult = _amount+_amount*_rate*Math.floor(_count/(this.surprise))/100
        console.log('-=-=-=-=>'+_rate*Math.floor(_count/(this.surprise)))
        console.log('-=-=-=-=>'+amountResult)
        this.infoForm.currentAmount = amountResult
      }
     
      this.time = info[8]
      // 当前时间-上次时间
      this.getChick(info[5]);
      this.getCode(info[5]);
    },
    refresh(){
      if(this.refreshTime!=null){
        clearInterval(this.refreshTime)
      }
      this.refreshTime = setInterval(()=>{
        console.log('refresh')
        this.initSnatch()
       },7000)
    },
    async otherWithdraw(){
      var account = localStorage.getItem('MyAccount');
      try {
        let tx = await otherWithdrawPool(account);
        console.log(tx);
      } catch (error) {
        this.$notify({
          title: '取消',
          message: '取消成功',
          type: 'info'
        });
        this.initSnatch()
        this.fullscreenLoading = false;
        return
      }
      this.$notify({
          title: '成功',
          message: '帮助领取成功',
          type: 'success'
        });
      this.initSnatch()
      this.fullscreenLoading = false;
    },
    async withdraw(){
      var account = localStorage.getItem('MyAccount');
      try {
        let tx = await withdrawPool(account);
        console.log(tx);
      } catch (error) {
         this.$notify({
          title: '取消',
          message: '取消成功',
          type: 'info'
        });
        this.initSnatch()
        this.fullscreenLoading = false;
        return
      }

      this.$notify({
          title: '成功',
          message: '领取成功',
          type: 'success'
        });
      this.initSnatch()
      this.fullscreenLoading = false;
    },
    getChick(lastTime){
      let showTime = this.time-(moment().unix().valueOf()-lastTime)
      let du = Number(this.infoForm.durationTime)
      if(showTime<=0){
        showTime = 0;
        //改变按钮
      }
      try{
        if(this.$refs.changeProcess){
          this.$refs.changeProcess.changePrecent(du-showTime,du);
        }
      }catch(e){
        console.log(e)
      }
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
      console.log('==sss=>'+decimalToBalance(this.infoForm.currentAmount))
      //当前价格
      let _amount = decimalToBalance(this.infoForm.currentAmount);
      let _rate = BigNumber.from(this.infoForm.increaseRange);
      let _count =  BigNumber.from(Number(this.infoForm.snatchCount)+1); 
      let samount=_amount.add(_amount.mul(_rate.mul(_count.div(100)).div(100)))
      console.log('====>'+samount)
      try {
        let tx = await snatchPool(account,samount);
        console.log(tx);
      } catch (error) {
         this.$notify({
          title: '取消',
          message: '取消成功',
          type: 'info'
        });
        this.initSnatch()
        this.fullscreenLoading = false;
        return
      }

      this.$notify({
          title: '成功',
          message: '抢夺成功',
          type: 'success'
        });
      this.initSnatch()
      this.fullscreenLoading = false
    },
    openFullScreen() {
      this.fullscreenLoading = true
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.peg{
  position: fixed;
  z-index:100
}
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
