<template>
  <div class="main-bac">
    <el-container>
      <el-header>
        <div style="float:left">
          <el-link style="line-height: 60px;" :underline="false" type="info" href="#/">
          <div style="font-size:20px;color:white">
            <div style="float:left">
              <el-image style="width: 60px; height: 60px" :src='url'></el-image>
            </div>
            小鸡快跑
          </div>
          </el-link>
        </div>
        <div style="margin-left:10px;float:left">
            <el-tabs tab-position="center" @tab-click="handleClick">
              <el-tab-pane label="主池" name="MainSnatch"></el-tab-pane>
              <el-tab-pane label="私有池" name="Snatchs"></el-tab-pane>
              <el-tab-pane label="我的nft" name="MyNft"></el-tab-pane>
              <el-tab-pane label="小鸡商店" name="NftShop"></el-tab-pane>
              <el-tab-pane label="货币众筹" name="Finance"></el-tab-pane>
            </el-tabs>
        </div>
        <div style="float:right">
          <span class="address" @click="wallet"><i class="el-icon-s-opportunity">{{subAddress}}</i></span>
        </div>
        <div style="float:right;margin-top:10px">
          <el-dropdown @command="handleCommand">
            <el-button style="color:white" type="text">
              账户ID：{{accountId}} 更多<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="info">个人信息</el-dropdown-item>
              <el-dropdown-item command="reward">领取奖励</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>


      </el-header>
      <router-view v-show="isGameStart"/>
      <div v-show="!isGameStart" style="margin-left:40%;margin-top:40%;text-size:100px">
        <FlipDown
          :endDate="1611057600000"  
          @timeUp="gameStart"            
          />
      </div>
      <el-footer>
        <div class="footer-div">
          <img class="footer-img" src="../src/assets/community.svg" alt="community">
          <img class="footer-img" src="../src/assets/medium.svg" alt="medium">
          <img class="footer-img" src="../src/assets/telegram.svg" alt="telegram">
          <img class="footer-img" src="../src/assets/twitter.svg" alt="twitter">
        </div>
      </el-footer>
      <el-dialog  custom-class="el-dia"
        title="用户信息"
        :visible.sync="dialogVisible"
        width="30%">
        <div v-if="accountId=='--'">
          <span>加入推荐关系？</span>
          <el-input style="margin-bottom:20px" v-model="inputId" placeholder="请输入推荐人ID(默认为1)"></el-input>
          <br>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="registerAccount">确 定</el-button>
          </span>
        </div>
        <div v-else>
          <div class="dia-msg"><i class="el-icon-s-custom"> 推荐人地址: </i> 
            <div>{{referrer}}</div>
          </div>
          <br>
          <div class="dia-msg"><i class="el-icon-bank-card"> 推荐人Id: {{referrerId}}</i>
          </div>
          <br>
          <div class="dia-msg"><i class="el-icon-share"> 我的推荐链接: </i>
            <el-link :href="inviteUrl" target="_blank">http://as.yzbbanban.com{{inviteUrl}}</el-link>
          </div>
          <br>
          <br>
        </div>
        
      </el-dialog>

      <el-dialog custom-class="el-dia"
        title="领取奖励"
        :visible.sync="rewardDialogVisible"
        width="30%">
        <div>
          <span>🎊 推荐奖励: {{inviteReward}} cfx</span>
        </div>
        <br>
        <div>
          <span>🎉 彩蛋奖励: {{surprise}} cfx</span>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="rewardDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="withdraw">确认领取</el-button>
        </span>
      </el-dialog>
    </el-container>
  </div>
</template>

<script>
import { getAddress } from "./util/base.js";
import { getUserInfo,register,initAIContract } from "./util/indexInvite.js";
import {initSnatchContract,getRewards,withdrawReward} from "./util/indexSnatch.js";
import {decimalToBalance,balanceToDecimal} from "./util/MathUtil.js";
import FlipDown from 'vue-flip-down';

export default {
  name: 'App',
  components: {
    'FlipDown': FlipDown 
  },
  async created() {
    await initAIContract()
    await initSnatchContract()
    let res = await getAddress()
    this.address = ''+res;
    this.subAddress = (''+res).substring(0,6)+"..."+(''+res).substring(38,42);
    localStorage.setItem('MyAccount', this.address);
    //localStorage.removeItem('hou');
    this.getUserInfoP()
  },
  data () {
    return {
      inviteReward:0,
      isGameStart:false,
      surprise:0,
      inviteUrl:'/#/invite/1',
      rewardDialogVisible:false,
      inputId:'1',
      referrer:"--",
      referrerId:"--",
      dialogVisible:false,
      isRouterAlive: true,
      //http://mmuu.oss-cn-beijing.aliyuncs.com/123456.jpg
      url: require("../src/assets/av.jpg"),
      subAddress:"--",
      address:"--",
      accountId:"--"
    }
  },
  methods:{
    gameStart(){
      this.isGameStart = true;
    },
    wallet(){},
    handleClick(item){
      console.log(item.name)
      if(item.name=="NftShop"){
        this.$router.push({path:"/nftShop"})
      }else if(item.name=="MyNft"){
        this.$router.push({ path: '/myNft'})
      }else if(item.name=="Snatchs"){
        this.$router.push({ path: '/games'})
      }else if(item.name=="Finance"){
        this.$router.push({ path: '/finance'})
      }else if(item.name=="MainSnatch"){
        if(this.$route.path!="/"){
          this.$router.push({ path: '/'})
        }
      }
    },
    async getUserInfoP(){
      let userInfo = await getUserInfo(this.address);
      let user = JSON.parse(JSON.stringify(userInfo))
      console.log(user)
      this.referrer = user[1]
      this.referrerId = user[2]
      this.accountId = user[3]==0?'--':''+user[3]
      this.inviteUrl = '/#/invite/'+ this.referrerId
    },
    async handleCommand(command){
      if(command=='reward'){
        this.rewardDialogVisible = true
        let result = await getRewards(this.address)
        let rewardArr=JSON.parse(JSON.stringify(result))
        console.log(rewardArr)
        this.inviteReward = balanceToDecimal(rewardArr[0]);
        this.surprise = balanceToDecimal(rewardArr[1]);
      }else{
        this.checkAccount()
      }
    },
    async withdraw(){
      if(this.inviteReward ==0 && this.surprise == 0){
        this.$notify({
          title: '失败',
          message: '无可领取奖励',
          type: 'error'
        });
        this.rewardDialogVisible = false
        return
      }
      let tx = await withdrawReward(this.address);
      console.log(tx)
      this.$notify({
        title: '成功',
        message: '领取成功，请查看余额',
        type: 'success'
      });
      this.rewardDialogVisible = false
    },
    checkAccount(){
      this.dialogVisible = true
    },
    async registerAccount(){
      let tx = await register(this.inputId,this.address);
      console.log(tx)
      this.$notify({
        title: '成功',
        message: '注册成功',
        type: 'success'
      });
      this.getUserInfoP()
      dialogVisible = false
    }
  }
}
</script>

<style>
.vue-countdown-component .time-box {
    position: relative;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    height: 120px;
    min-width: 100px;
    font-size: 100px;
    text-align: center;
    background-color: #6c96e8;
    -webkit-perspective: 60px;
    perspective: 60px;
    border-radius: 3px;
    padding: 0 2px;
    color: #fff;
    line-height: 120px;
}
.dia-msg{
  color:#000000;
  font-size:15px
}
.el-m{
  margin-left: 100px;
}
.sp-text{
  font-size: 10px;
  color: #eee;
  margin-bottom: 20px;
}
.address{
  cursor:pointer;
  height: 60px;
  line-height: 60px;
  margin-left: 20px;
  float:right;
  color: #eee;
}
.el-link{
  line-height: 40px;
}

.el-header{
  background-color: black;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  bottom: 60px;
  right: 0;
  height: 60px;
  z-index: 100
}
.el-main {
  width: 60%;
  /* margin-left: 5%; */
  top: 60px;
  bottom: 60px;
  /* overflow-y: scroll; */
  color: rgb(251, 255, 0);
  text-align: left;
}
.el-footer{
  position:fixed;
  bottom:0;
  left: 0;
  right: 0;
  width:100%;
  height:30px;
  line-height:30px;
  text-align:center;
  background-color: #000;
  z-index: 100
}
.footer-div{
  float:right;
  margin-top:20px
}
.footer-img{
  cursor:pointer;
  margin-left: 20px;
}
.main-bac {
  margin: 0px;
  min-height: 100vh;
  margin: 60px 0;
  overflow-x: hidden;
  background: url("../src/assets/bg-min.jpg"); 
  background-size: cover;
  background-position: right;
}
</style>
