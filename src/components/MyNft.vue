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
                <time class="time">{{ currentDate }}</time>
                <el-tooltip class="item" effect="dark" content="直接转移给对方" placement="left">
                  <el-button type="text" class="button" @click="transfer(item)">转移</el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="设计价格售卖，在商城中显示" placement="right">
                  <el-button type="text" class="button" @click="sell(item)">售卖</el-button>
                </el-tooltip>
              </div>
            </div>
          </el-card>
      </div>
      <el-dialog custom-class="el-dia" title="Create Snatch" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="from" :label-width="formLabelWidth">
          <el-input v-model="form.from" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="to" :label-width="formLabelWidth">
          <el-input v-model="form.to" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="tokenId" :label-width="formLabelWidth">
          <el-input v-model="form.tokenId" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog custom-class="el-dia" title="Create Snatch" :visible.sync="sellFormVisible">
      <el-form :model="sellFrom">
        <el-form-item label="price" :label-width="formLabelWidth">
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="sellFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sellFormVisible = false">确 定</el-button>
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
          formLabelWidth:120,
          dialogFormVisible:false,
          sellFormVisible:false,
          form: {
            from: '',
            to:'',
            tokenId:0
          },
          sellFrom:{
            price:0,
            from:"",
            tokenId:0
          },
          address:"0x10E98765aE49E72Dd11b04a9c0981D79f05BE003",
          priList:[
            {tokenId:1,name:"永久券",image:"https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",description:"卡洛斯"},
            {tokenId:2,name:"永久券",image:"https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",description:"iodine"},
            {tokenId:3,name:"永久券",image:"https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",description:"发热安抚"},
            {tokenId:4,name:"永久券",image:"https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",description:"爱疯舞"},
            {tokenId:5,name:"永久券",image:"https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",description:"不放过吧"},
            {tokenId:6,name:"永久券",image:"https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",description:"人体各"}]
        }
    },
    methods:{
      privateGame(item){
        this.$router.push({ path: 'gameDetail', params: { gameId: item._id }})
      },
      transfer(item){
        this.dialogFormVisible=true
        this.form={
          from: '0xxxxxx',
          to:'0xxx',
          tokenId:item.tokenId
        }
      },
      sell(item){
        this.sellFormVisible=true
        this.sellForm={
          price:0,
          from: '0xxxxxx',
          tokenId:item.tokenId
        }
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
