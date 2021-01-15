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
              <el-tab-pane label="Private Snatch" name="Snatchs"></el-tab-pane>
              <el-tab-pane label="MyNft" name="MyNft"></el-tab-pane>
              <el-tab-pane label="NftShop" name="NftShop"></el-tab-pane>
              <el-tab-pane label="Finance" name="Finance"></el-tab-pane>
            </el-tabs>
        </div>
        <div style="float:right">
          <div class="address" @click="checkAccount">账户ID：{{accountId}}</div>
          <span class="address" @click="wallet"><i class="el-icon-s-opportunity">{{subAddress}}</i></span>
        </div>

      </el-header>
      <router-view/>
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
          <div class="dia-msg">推荐人地址:  {{referrer}}</div>
          <div class="dia-msg">推荐人Id: {{referrerId}}</div>
          <br>
          <br>
        </div>
        
      </el-dialog>
    </el-container>
  </div>
</template>

<script>
import { getAddress } from "./util/base.js";
import { getUserInfo,register,initAIContract } from "./util/indexInvite.js";

export default {
  name: 'App',
  async created() {
    await initAIContract()
    getAddress().then(res=>{
      this.address = res
      this.subAddress = (''+res).substring(0,6)+"..."+(''+res).substring(38,42);
      localStorage.setItem('MyAccount', this.address);
      //localStorage.removeItem('hou');
      this.getUserInfoP()
    })
  },
  data () {
    return {
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
      }
    },
    async getUserInfoP(){
      let userInfo = await getUserInfo(this.address);
      let user = JSON.parse(JSON.stringify(userInfo))
      console.log(user)
      this.referrer = user[1]
      this.referrerId = user[2]
      this.accountId = user[3]==0?'--':''+user[3]
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
.dia-msg{
  color:#9e00ff
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
