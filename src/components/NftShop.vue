<template>
  <div>
    <el-container>
      <div class="box-container">
          <el-card class="box-card"  v-for="item in priList" :key="item._id">
            <img :src="item.image" class="image">
            <div style="padding: 5px;">
              <div>tokenId: {{item.tokenId}}</div>
              <div>seller: {{item.seller}}</div>
              <div>price: {{item.price}}</div>
              <div>name: {{item.name}}</div>
              <div>description: {{item.description}}</div>
              <div class="bottom clearfix">
              <el-button type="text" class="button" @click="buy(item)">购买</el-button>
              </div>
            </div>
          </el-card>
      </div>
      <el-dialog custom-class="el-dia" title="Create Snatch" :visible.sync="buyFormVisible">
      <span style="color:white">确定使用 {{buyForm.price}} 购买 tokenId: {{buyForm.tokenId}} 吗？</span>
      <div slot="footer" class="dialog-footer">
        <el-button @click="buyFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="buyTicket">确 定</el-button>
      </div>
      </el-dialog>
    </el-container>
    </div>
</template>

<script>
import {initTicketShopContract,getShopItems,buySellerTicket,shopMap} from "../util/indexTicketShop.js"
import {decimalToBalance,balanceToDecimal} from "../util/MathUtil.js";
const axios = require('axios');
export default {
    name:"NftShop",
    async created(){
      this.account = localStorage.getItem('MyAccount');
      await initTicketShopContract();
      this.getShopList();
    },
    data () {
        return{
          account:"",
          buyForm:{price:0,tokenId:0},
          buyFormVisible:false,
          address:"0x10E98765aE49E72Dd11b04a9c0981D79f05BE003",
          priList:[]
        }
    },
    methods:{
      async getShopList(){
        let rlist=await getShopItems();
        console.log(rlist)
        for (const key in rlist) {
          let tokenId=rlist[key][0];
          console.log(tokenId)
          //get detail
          let  response = await axios.get('http://192.168.2.17:18756/v1/nft/brbr/'+tokenId+'.json')
          let res = response.data;
          console.log(res);
          let shopInfo = await shopMap(tokenId);
          let shopArr = JSON.parse(JSON.stringify(shopInfo))
          this.priList.push({tokenId,name:res.name,
                      image:res.image,
                      description:res.description,
                      seller:shopArr[0],
                      price:balanceToDecimal(shopArr[1])
                      })
        }
      },
      privateGame(item){
        this.$router.push({ path: 'gameDetail', params: { gameId: item._id }})
      },
      buy(item){
        this.buyFormVisible=true
        this.buyForm.price=item.price
        this.buyForm.tokenId=item.tokenId;
      },
      async buyTicket(){
        let tx = await buySellerTicket(this.account,
                                this.buyForm.tokenId,
                                decimalToBalance(this.buyForm.price));
        this.$notify({
          title: '成功',
          message: '购买成功',
          type: 'success'
        });
        this.buyFormVisible=false
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
