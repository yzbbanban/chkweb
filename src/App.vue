<template>
  <div class="main-bac">
    <el-container>
      <el-header>
        <el-link :underline="false" type="info" href="#/">
          <el-avatar :src='url'></el-avatar>
          <span class="sp-text">MySord</span>
        </el-link>
        <el-link class="el-m" :underline="false" type="info" href="#/myNft">
          <span class="sp-text">MyNft</span>
        </el-link>
        <span class="address"><i class="el-icon-s-opportunity">  {{address}}</i></span>
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
export default {
  name: 'App',
  data () {
    return {
      //http://mmuu.oss-cn-beijing.aliyuncs.com/123456.jpg
      url: require("../src/assets/av.jpg"),
      address:"0x10E98765aE49E72Dd11b04a9c0981D79f05BE003",
    }
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
  position: relative;
  width: 100%;
  height: 60px;
}
.el-main {
  position: absolute;
  width: 80%;
  margin-left: 10%;
  top: 60px;
  bottom: 60px;
  overflow-y: scroll;
  color: rgb(206, 206, 206);
  text-align: left;
}
.el-footer{
  position:absolute;
  bottom:0;
  width:100%;
  height:30px;
  line-height:30px;
  text-align:center;
  background-color: #000;
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
  padding: 0px;
  height: 100%;
  min-height: 100vh;
  overflow-x: hidden;
  background: url("../src/assets/bg-min.jpg") ;
}
</style>
