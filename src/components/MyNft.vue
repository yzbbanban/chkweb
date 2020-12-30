<template>
  <div>
    <div class="title">MyNft</div>
      <el-container>
        <div class="box-container">
            <el-card class="box-card"  v-for="item in priList" :key="item._id">
              <img :src="item.image" class="image">
              <div style="padding: 5px;">
                <div>name: {{item.name}}</div>
                <div>description: {{item.description}}</div>
                <div class="bottom clearfix">
                  <time class="time">{{ currentDate }}</time>
                  <el-button type="text" class="button">转移</el-button>
                </div>
              </div>
            </el-card>
        </div>
      </el-container>
    </div>
</template>

<script>
export default {
    name:"MyNft",
    data () {
        return{
          address:"0x10E98765aE49E72Dd11b04a9c0981D79f05BE003",
          priList:[
        {tokenId:1,name:"永久券",image:"https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",description:"卡洛斯"},
        {tokenId:1,name:"永久券",image:"https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",description:"iodine"},
        {tokenId:1,name:"永久券",image:"https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",description:"发热安抚"},
        {tokenId:1,name:"永久券",image:"https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",description:"爱疯舞"},
        {tokenId:1,name:"永久券",image:"https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",description:"不放过吧"},
        {tokenId:1,name:"永久券",image:"https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",description:"人体各"}]
        }
    },
    methods:{
      privateGame(item){
        this.$router.push({ path: 'gameDetail', params: { gameId: item._id }})
      }
    }
}
</script>

<style scoped>
.box-card {
  width: 24%;
  color: #eee;
  background: rgba(255, 255, 255, 0);
  margin: 25px;
}
.box-container{
  display: flex;
  flex-wrap: wrap;
  width: 80%;
  margin-left: 10%;
}
.image {
  width: 100%;
  display: block;
}
.title{
  color: white;
  margin-left: 50%;
}
</style>
