<template>
  <el-container>
  <el-main>
    <snatch-main></snatch-main>
  </el-main>
</el-container>
</template>

<script>
import snatchMain from "./SnatchMain"
export default {
  name: 'MainPage',
  components: {
      SnatchMain:snatchMain
  },
  data () {
    return {
      //http://mmuu.oss-cn-beijing.aliyuncs.com/123456.jpg
      url: require("../../src/assets/av.jpg"),
      address:"0x10E98765aE49E72Dd11b04a9c0981D79f05BE003",
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.address{
  height: 60px;
  line-height: 60px;
  float:right;
  color: #eee;
}
.ellink{
  color: white;
  text-align: center;
  line-height: 40px;
}
.spText{
  margin-bottom: 30px;
  color: white;
}
</style>
