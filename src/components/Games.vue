<template>
  <div>
      <div style="height:30px;margin:20px">
        <el-button class="create-button" type="success" @click="showDialog">create snatch</el-button>
      </div>
      <div class="box-container">
          <el-card class="box-card"  v-for="item in priList" :key="item._id">
            <div style="cursor:pointer" @click="privateGame(item)">
              <div>ID:{{item._id}}</div>
              <br>
              <div>奖池: {{item.amount}}</div>
              <div>上一次出价: {{item.lastPrice}}</div>
              <div>上一次出价时间: {{item.lastTime}}</div>
              <div>开奖时间: {{item.endTime}}</div>
              <div>当前轮抢夺次数: {{item.count}}</div>
            </div>
          </el-card>
      </div>
      <el-dialog custom-class="el-dia" title="Create Snatch" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item prop="durationTime" label="每次持续时长（如: 10-2-30代表10天,2小时,30分钟,无则填写0，如 0-0-30 代表30分钟）" :label-width="formLabelWidth">
          <el-input v-model="form.durationTime" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="durationEndTime" label="每轮持续时长（如: 10-2-30代表10天,2小时,30分钟,无则填写0，如 0-0-30 代表30分钟）" :label-width="formLabelWidth">
          <el-input v-model="form.durationEndTime" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="token" label="货币合约" :label-width="formLabelWidth">
          <el-input v-model="form.token" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="nftToken" label="NFT合约" :label-width="formLabelWidth">
          <el-input v-model="form.nftToken" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="tokenId" label="NFT token ID" :label-width="formLabelWidth">
          <el-input v-model="form.tokenId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="submitAmount" label="每轮起始价格" :label-width="formLabelWidth">
          <el-input v-model="form.submitAmount" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="increaseRange" label="增幅(当前轮每100次)" :label-width="formLabelWidth">
          <el-input v-model="form.increaseRange" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" v-loading.fullscreen.lock="fullscreenLoading"  @click="addTokenSnatch('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {addSnatch,getSnatchList,
        getSnatchBaseInfo,getSnatchTimeInfo,
        initSnatchNormalContract} from "../util/indexSnatchNormal.js";
import {getNftTokenAddress} from "../util/index1155.js";
import {decimalToBalance,balanceToDecimal} from "../util/MathUtil.js";
var moment = require('moment');
export default {
    name:"Games",
    async created(){
      this.form.nftToken = getNftTokenAddress();
      await initSnatchNormalContract();
      this.refresh();
      this.initSnatchList();
    },
    data () {
        return{
          refreshTime:null,
          fullscreenLoading:false,
          formLabelWidth:"120",
          dialogFormVisible:false,
          form: {
            durationTime: '',
            durationEndTime: '',
            increaseRange:'',
            tokenId:'',
            token:'',
            submitAmount:'',
            nftToken:''
          },
          rules:{
            durationTime :[{required: true, message: '请输入单次时间', trigger: 'blur'}],
            durationEndTime :[{required: true, message: '请输入单轮时间', trigger: 'blur'}],
            increaseRange :[{required: true, message: '请输入涨幅', trigger: 'blur'}],
            tokenId :[{required: true, message: '请输入nft tokenId', trigger: 'blur'}],
            token :[{required: true, message: '请输入代币', trigger: 'blur'}],
            submitAmount :[{required: true, message: '请输入起始抢夺价格', trigger: 'blur'}],
            nftToken :[{required: true, message: '请输入NFT合约', trigger: 'blur'}]
          },
          currentAmount:0,
          address:"",
          priList:[]
        }
    },
    methods:{
      refresh(){
        if(this.refreshTime!=null){
          clearInterval(this.refreshTime)
        }
        this.refreshTime = setInterval(()=>{
          console.log('refresh')
          this.initSnatchList()
        },20000)
      },
      showDialog(){
        this.dialogFormVisible = true;
      },
      privateGame(item){
        this.$router.push({ path: 'gameDetail/'+item._id })
      },
      async initSnatchList(){
        this.priList=[]
        let rlist = await getSnatchList();
        for (const key in rlist) {
          let snatchId=rlist[key];
          //get detail
          let snatchBaseInfo = await getSnatchBaseInfo(snatchId);
          let snatchTimeInfo = await getSnatchTimeInfo(snatchId);
          let snatchBaseInfoArr = JSON.parse(JSON.stringify(snatchBaseInfo))
          console.log(snatchBaseInfoArr)
          let snatchTimeInfoArr = JSON.parse(JSON.stringify(snatchTimeInfo))
          console.log(snatchTimeInfoArr)
          //todo
          let du = snatchTimeInfoArr[2];
          let lt = snatchTimeInfoArr[1];
          let et
          if(lt==0){
            et=0
          }else{
            et = moment.unix(Number(lt)+Number(du)).format("YYYY-MM-DD HH:mm");
          }
          let l = snatchTimeInfoArr[1]==0?'--':moment.unix(snatchTimeInfoArr[1]).format("YYYY-MM-DD HH:mm");
          this.priList.push({
              _id: ''+snatchId,
              lastPrice:balanceToDecimal(snatchBaseInfoArr[6]),
              lastTime:l,
              endTime:et,
              count:snatchBaseInfoArr[8],
              amount:balanceToDecimal(snatchBaseInfoArr[4])})
        }
      },
      async addTokenSnatch(formData){
        var suc=false
        this.$refs[formData].validate((valid) => {
          if (!valid) {         
            this.$notify({
              title: '错误',
              message: '请填写必要信息',
              type: 'error'
            });
          }else{
            suc = true;
          }
        });
        if(!suc){
          return
        }
        this.fullscreenLoading=true
        var account = localStorage.getItem('MyAccount');
        let dt=this.calTimes(this.form.durationTime);
        let det=this.calTimes(this.form.durationEndTime);
        let amount = decimalToBalance(this.form.submitAmount)
        try{
          let tx = await addSnatch(
              account,
              this.form.tokenId,
              this.form.nftToken,
              this.form.token,
              amount,
              dt,
              det,
              this.form.increaseRange)
          console.log(tx);
          this.$notify({
            title: '成功',
            message: '创建成功',
            type: 'success'
          });
          this.initSnatchList();
        }catch(e){
          console.log(e)
          this.$notify({
            title: '失败',
            message: e.message,
            type: 'error'
          });
        }
        this.fullscreenLoading = false
        this.dialogFormVisible = false
        
      },
      calTimes(time) {
        let result = 0
        //1-23-22
        if(time.indexOf("-")!=-1){
          var tArr = time.split("-");
          let day=86400;
          let hour=3600;
          console.log(Number(tArr[0]))
          result = Number(tArr[0])*day + Number(tArr[1]) * hour + Number(tArr[2])*60
        }else{
          result = Number(time)*60;
        }
        return result;
      }
    }
}
</script>

<style scoped>
.create-button{
  float: left;
  font-size: 20px;
  margin-left: 50px;
}
.box-card {
  width: 25%;
  color: rgb(255, 255, 255);
  background: rgba(104, 104, 104, 0.4);
  margin: 25px;
  padding: 10px;
}
.box-container{
  display: flex;
  flex-wrap: wrap;
  /* justify-content: space-between; */
  width: 100%;
  margin-left: 5%;
}

</style>
