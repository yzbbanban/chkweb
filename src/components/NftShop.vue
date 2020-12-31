<template>
  <div>
    <el-container>
      <div class="box-container">
          <el-card class="box-card"  v-for="item in priList" :key="item._id">
            <img :src="item.image" class="image">
            <div style="padding: 5px;">
              <div>tokenId: {{item.tokenId}}</div>
              <div>name: {{item.name}}</div>
              <div>description: {{item.description}}</div>
              <div class="bottom clearfix">
              <el-button type="text" class="button" @click="buy(item)">购买</el-button>
              </div>
            </div>
          </el-card>
      </div>
      <el-dialog custom-class="el-dia" title="Create Snatch" :visible.sync="buyFormVisible">
      <span style="color:white">确定使用 {{buyForm.price}} 购买吗？</span>
      <div slot="footer" class="dialog-footer">
        <el-button @click="buyFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="buyFormVisible = false">确 定</el-button>
      </div>
      </el-dialog>
    </el-container>
    </div>
</template>

<script>
export default {
    name:"MyNft",
    data () {
        return{
          buyForm:{price:0},
          buyFormVisible:false,
          address:"0x10E98765aE49E72Dd11b04a9c0981D79f05BE003",
          priList:[
            {tokenId:1,name:"永久券",image:"https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",description:"卡洛斯",price:123},
            {tokenId:2,name:"永久券",image:"https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",description:"iodine",price:424},
            {tokenId:3,name:"永久券",image:"https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",description:"发热安抚",price:24},
            {tokenId:4,name:"永久券",image:"https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",description:"爱疯舞",price:65},
            {tokenId:5,name:"永久券",image:"https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",description:"不放过吧",price:45},
            {tokenId:6,name:"永久券",image:"https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",description:"人体各",price:76}]
        }
    },
    methods:{
      privateGame(item){
        this.$router.push({ path: 'gameDetail', params: { gameId: item._id }})
      },
      buy(item){
        this.buyFormVisible=true
        this.buyForm.price=item.price
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
  margin-left: 20%;
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
