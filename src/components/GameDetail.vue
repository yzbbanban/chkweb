<template>
  <div style="width:80%;margin-left:10%">
    <div class="title">私人详情</div>
    <el-row :gutter="12">
      <el-col :span="4">
        <el-card class="box-card1">
          <el-form :model="infoForm" status-icon ref="infoForm">
          <el-form-item label="777名称:" prop="tokenName">
            <span>{{infoForm.tokenName}}</span>
          </el-form-item>
          <el-form-item label="777余额:" prop="tokenBalance">
            <span>{{infoForm.tokenBalance}}</span>
          </el-form-item>
          </el-form>
        </el-card>
      </el-col>
      <el-col :span="20">
        <el-card class="box-card">
        <h1>
          ID：{{snatchId}}
        </h1>
        <h1>
          奖池：{{infoForm.amount}}
        </h1>
        <span>开奖时间 {{infoForm.timer}}</span>
        
        <progress-lsp ref="changeProcess"></progress-lsp>
        <el-form :model="infoForm" status-icon ref="infoForm" label-width="150px">
          <el-form-item label="777" prop="token">
            <span>{{infoForm.token}}</span>
          </el-form-item>
          <el-form-item label="上一次出价" prop="lastAmount">
            <span>{{infoForm.lastAmount}}</span>
          </el-form-item>
          <el-form-item label="上一次出价时间" prop="lastTime">
            <span>{{infoForm.lastTime}}</span>
          </el-form-item>
          <!-- <el-form-item label="当前出价" prop="timer"> -->
            <!-- <span>{{infoForm.lastAmount}}</span> -->
          <!-- </el-form-item> -->
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
          <el-button v-show="snatchBtn" plain type="primary" v-loading.fullscreen.lock="fullscreenLoading" @click="approve">抢夺</el-button>
          <el-button v-show="withdrawPoolBtn" plain type="primary" v-loading.fullscreen.lock="fullscreenLoading" @click="withdrawNormal">领取收益</el-button>
          <el-button v-show="otherWithdrawPoolBtn" plain type="primary" v-loading.fullscreen.lock="fullscreenLoading" @click="otherWithdrawNormal">帮助收取</el-button>
        </div>
      </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {addSnatch,snatchTokenPool,withdrawPool,getSnatchList,
        getSnatchBaseInfo,getSnatchTimeInfo,getSnatchNormalAddress,
        otherWithdrawToken,initSnatchNormalContract} from "../util/indexSnatchNormal.js";
import {decimalToBalance,balanceToDecimal} from "../util/MathUtil.js";
import {allowance,approve,symbol,balanceOf,init777TokenContract} from "../util/index777.js";
import progressLsp from "./ProgressLsp"
var moment = require('moment');
const address0 = '0x0000000000000000000000000000000000000000'

export default {
    name:"GameDetail",
    components: {
      progressLsp
    },
    async created(){
      this.snatchId = this.$route.params.id
      console.log('===>'+this.snatchId)
      this.account = localStorage.getItem('MyAccount');
      await initSnatchNormalContract();
      this.initPrivateSnatch();
    },
    data () {
        return{
          timer:null,
          account:"",
          fullscreenLoading:false,
          snatchBtn:false,
          withdrawPoolBtn:false,
          otherWithdrawPoolBtn:false,
          infoForm:{
            token:"",
            tokenName:"",
            tokenBalance:"",
            owner:"",
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
          snatchId:null,
          url: require("../../src/assets/av.jpg"),
        }
    },
    methods:{
      async initPrivateSnatch(){
        this.$refs.changeProcess.clearTime();
        let snatchBaseInfo = await getSnatchBaseInfo(this.snatchId);
        let snatchTimeInfo = await getSnatchTimeInfo(this.snatchId);
        let snatchBaseInfoArr = JSON.parse(JSON.stringify(snatchBaseInfo))
        console.log(snatchBaseInfoArr)
        let snatchTimeInfoArr = JSON.parse(JSON.stringify(snatchTimeInfo))
        console.log(snatchTimeInfoArr)
        this.infoForm.token = snatchBaseInfoArr[0]
        console.log(this.infoForm.token)
        await init777TokenContract(this.infoForm.token);
        console.log('======================')
        let name = await symbol();
        console.log('===>'+this.account)
        console.log(`name:${name}`)
        let balance = await balanceOf(this.account);
        console.log(`balance:${balance}`)
        this.infoForm.tokenName=''+name;
        this.infoForm.tokenBalance=balanceToDecimal(''+balance);
        this.infoForm.lastOwner = snatchBaseInfoArr[2]
        this.infoForm.tempOwner = snatchBaseInfoArr[3]==address0?"--":snatchBaseInfoArr[3]
        this.infoForm.amount = balanceToDecimal(snatchBaseInfoArr[4])
        this.infoForm.submitAmount = balanceToDecimal(snatchBaseInfoArr[5])
        this.infoForm.lastAmount = balanceToDecimal(snatchBaseInfoArr[6])
        this.infoForm.lastTime =  snatchTimeInfoArr[1]==0?"--":moment.unix(snatchTimeInfoArr[1]).format("YYYY-MM-DD HH:mm")
        this.infoForm.startTime = snatchTimeInfoArr[0]==0?"--":moment.unix(snatchTimeInfoArr[0]).format("YYYY-MM-DD HH:mm")
        this.infoForm.durationEndTime = 
                snatchTimeInfoArr[0]==0?
                "--":moment.unix(parseInt(snatchTimeInfoArr[0])+(parseInt(snatchTimeInfoArr[3])))
                .format("YYYY-MM-DD HH:mm")
        this.infoForm.durationTime = snatchTimeInfoArr[2]
        this.infoForm.snatchCount = snatchBaseInfoArr[8]
        this.infoForm.increaseRange = snatchBaseInfoArr[7]
        this.infoForm.totalSnatchCount = snatchBaseInfoArr[9]
        this.infoForm.totalAmount = balanceToDecimal(snatchBaseInfoArr[10])
        //结束，显示帮助其他人领取，自己领取 持续时间 - （当前时间-上一次时间）
        let showTime = snatchTimeInfoArr[2]-(moment().unix().valueOf()-snatchTimeInfoArr[1])
        if(snatchTimeInfoArr[1]!=0 && showTime <= 0){
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
        this.time = snatchTimeInfoArr[2]
        // 当前时间-上次时间
        this.getChick(snatchTimeInfoArr[1]);
        this.getCode(snatchTimeInfoArr[1]);
      },
      getChick(lastTime){
        let showTime = this.time-(moment().unix().valueOf()-lastTime)
        let du = Number(this.infoForm.durationTime)
        this.$refs.changeProcess.changePrecent(du-showTime,du);
      },
      getCode(lastTime) {
        if(this.timer!=null){
          clearInterval(this.timer)
        }
        this.timer = setInterval(()=>{
          let showTime = this.time-(moment().unix().valueOf()-lastTime)
          this.infoForm.timer = showTime >=0?showTime:0
          if(this.infoForm.timer==0){
            clearInterval(this.timer)
          }
        },1000)
      },
      async approve(){
        //检查余额
        if(Number(this.infoForm.tokenBalance)<Number(this.infoForm.lastAmount)){
          this.$message({
                type: 'error',
                message: '余额不足!'
              });
          return
        }
        //先授权
        let operator = getSnatchNormalAddress();
        let approved = await allowance(this.account, operator);
        var that = this
        console.log(''+approved)
        console.log(''+decimalToBalance(this.infoForm.lastAmount))
        if(Number(approved) < Number(decimalToBalance(this.infoForm.lastAmount))){
          this.$confirm('需要授权, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            approve(operator,decimalToBalance(100000),that.account).then(tx=>{
              console.log(tx)
              this.initPrivateSnatch();
              this.$message({
                type: 'success',
                message: '授权成功!'
              });
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '授权失败'
            });          
          });
        }else{
          this.snatchNormal()
        }
      },
      async snatchNormal(){
        this.openFullScreen()
        let balance = await balanceOf(this.account);
        //检查余额
        if(Number(balance)<Number(this.infoForm.lastAmount)){
          this.$message({
                type: 'error',
                message: '余额不足!'
              });
          return
        }
        // console.log('account: '+this.account)
        // if(this.infoForm.tempOwner == this.account){
        //   this.$notify({
        //     title: '提示',
        //     message: '不可以连续抢夺',
        //     type: 'warning'
        //   });
        //   this.fullscreenLoading = false
        //   return;
        // }
        let tx = await snatchTokenPool(this.account,this.snatchId,decimalToBalance(this.infoForm.lastAmount));
        console.log(tx);
        this.$notify({
            title: '成功',
            message: '抢夺成功',
            type: 'success'
          });
        this.initPrivateSnatch()
      },
      async withdrawNormal(){
        this.openFullScreen()
        if(this.infoForm.tempOwner != this.account){
          this.$notify({
            title: '提示',
            message: '不是胜利者，不可直接领取',
            type: 'warning'
          });
          this.fullscreenLoading = false
          return;
        }
        let tx = await withdrawPool(this.account,this.snatchId);
        this.$notify({
            title: '成功',
            message: '帮助成功',
            type: 'success'
          });
        this.initPrivateSnatch()
      },
      async otherWithdrawNormal(){
        this.openFullScreen()
        let tx = await otherWithdrawToken(this.account,this.snatchId);
        this.$notify({
            title: '成功',
            message: '帮助成功',
            type: 'success'
          });
        this.initPrivateSnatch()
      },
      openFullScreen() {
        this.fullscreenLoading = true
      },
    }
}
</script>

<style scoped>

.box-card1 {
  /* widows: 100%; */
  /* text-align: center; */
  margin-top: 10px;
  padding: 5px;
  color: white;
  background-color: rgba(133, 133, 133, 0.479);
  overflow-y:auto;
  overflow-x:hidden;
}
.box-card {
  widows: 80%;
  text-align: center;
  margin-top: 10px;
  color: white;
  padding: 100px;
  background-color: rgba(133, 133, 133, 0.479);
  overflow-y:auto;
  overflow-x:hidden;
  margin-bottom: 100px;
}

.title{
  margin-top: 10px;
  color: white;
  margin-left: 50%;
}
</style>
