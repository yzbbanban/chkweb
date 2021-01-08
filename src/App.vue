<template>
  <div class="main-bac">
    <el-container>
      <el-header>
        <div style="float:left">
          <el-link :underline="false" type="info" href="#/">
            <el-avatar :src='url'></el-avatar>
            <span class="sp-text">Snatch</span>
          </el-link>
        </div>
        <div style="margin-left:120px;float:left">
            <el-tabs tab-position="bottom" @tab-click="handleClick">
              <el-tab-pane label="Private Snatch" name="Snatchs"></el-tab-pane>
              <el-tab-pane label="MyNft" name="MyNft"></el-tab-pane>
              <el-tab-pane label="NftShop" name="NftShop"></el-tab-pane>
            </el-tabs>
        </div>
        <div style="float:right">
          <span class="address"><i class="el-icon-s-opportunity">  {{address}}</i></span>
        </div>

        <!-- 
          <el-link :underline="false" type="info" href="#/">
          <el-avatar :src='url'></el-avatar>
          <span class="sp-text">MySord</span>
        </el-link>
        <el-link class="el-m" :underline="false" type="info" href="#/myNft">
          <span class="sp-text">MyNft</span>
        </el-link>
        <el-link class="el-m" :underline="false" type="info" href="#/nftShop">
          <span class="sp-text">NftShop</span>
        </el-link>
        <span class="address"><i class="el-icon-s-opportunity">  {{address}}</i></span> -->
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
    </el-container>
  </div>
</template>

<script>
import { getAddress } from "./util/base.js";

export default {
  name: 'App',
  provide () {    //父组件中通过provide来提供变量，在子组件中通过inject来注入变量。                                             
    return {
        reload: this.reload                                              
    }
  },
  created() {
    getAddress().then(res=>{
      this.address = res
      localStorage.setItem('MyAccount', this.address);
      //localStorage.removeItem('hou');
    })
  },
  data () {
    return {
      isRouterAlive: true,
      //http://mmuu.oss-cn-beijing.aliyuncs.com/123456.jpg
      url: require("../src/assets/av.jpg"),
      address:"--",
    }
  },
  methods:{
    reload () {
      this.isRouterAlive = false;            //先关闭，
      this.$nextTick(function () {
        this.isRouterAlive = true;         //再打开
      }) 
    },
    handleClick(item){
      console.log(item.name)
      if(item.name=="NftShop"){
        this.$router.push({path:"nftShop"})
      }else if(item.name=="MyNft"){
        this.$router.push({ path: 'myNft'})
      }else if(item.name=="Snatchs"){
        this.$router.push({ path: 'games'})
      }
    },
  }
}
</script>

<style>
.el-m{
  margin-left: 100px;
}
.sp-text{
    color: #eee;
}
.address{
  height: 60px;
  line-height: 60px;
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
  color: rgb(206, 206, 206);
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
  background: url("../src/assets/bg-min.jpg") ; 
}
</style>
