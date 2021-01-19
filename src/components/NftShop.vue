<template>
  <div>
    <el-container v-loading.fullscreen.lock="fullscreenLoading">
      <div class="box-container">
          <el-card class="box-card"  v-for="item in priList" :key="item._id">
            <el-image :src="item.image" style="width: 100%; height: 170px" fit="scale-down"/>
            <div style="padding: 5px;">
              <div>tokenId: {{item.tokenId}}</div>
              <!-- <div>seller: {{item.seller}}</div> -->
              <div>price: {{item.price}}</div>
              <div>name: {{item.name}}</div>
              <!-- <div>description: {{item.description}}</div> -->
              <div class="bottom clearfix">
                <el-button v-if="item.seller!=account" type="text" class="button" @click="buy(item)">购买</el-button>
                <el-button v-else type="text" class="button" @click="cancel(item)">撤销</el-button>
              </div>
            </div>
          </el-card>
      </div>
      <el-dialog custom-class="el-dia" title="购买" :visible.sync="buyFormVisible">
        <span style="color:white">确定使用 {{buyForm.price}} 购买 tokenId: {{buyForm.tokenId}} 吗？</span>
        <div slot="footer" class="dialog-footer">
          <el-button @click="buyFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="buyTicket">确 定</el-button>
        </div>
        </el-dialog>
        <el-dialog custom-class="el-dia" title="撤销" :visible.sync="cancelFormVisible">
        <span style="color:white">确认撤销 tokenId: {{cancelForm.tokenId}} 吗？</span>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="cancelTicket">确 定</el-button>
        </div>
        </el-dialog>
    </el-container>
    </div>
</template>

<script>
import {initTicketShopContract,getShopItems,buySellerTicket,shopMap,cancelShell} from "../util/indexTicketShop.js"
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
          cancelFormVisible:false,
          fullscreenLoading:false,
          account:"",
          buyForm:{price:0,tokenId:0},
          cancelForm:{tokenId:0},
          buyFormVisible:false,
          address:"--",
          priList:[]
        }
    },
    methods:{
      async getShopList(){
        this.fullscreenLoading=true
        let rlist=await getShopItems();
        console.log(rlist)
        this.priList=[]
        for (const key in rlist) {
          let tokenId=rlist[key][0];
          console.log(tokenId)
          //get detail
          let  response = await axios.get('http://nft.yzbbanban.com:18756/v1/nft/brbr/'+tokenId+'.json')
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
        this.fullscreenLoading=false
      },
      privateGame(item){
        this.$router.push({ path: 'gameDetail', params: { gameId: item._id }})
      },
      buy(item){
        this.buyFormVisible=true
        this.buyForm.price=item.price
        this.buyForm.tokenId=item.tokenId;
      },
      cancel(item){
        this.cancelFormVisible=true
        this.cancelForm.tokenId=item.tokenId;
      },
      async cancelTicket(){
        this.fullscreenLoading=true
        try {
          let tx = await cancelShell(this.account,
                                  this.cancelForm.tokenId);
        } catch (error) {
          this.$notify({
            title: '取消',
            message: '取消成功',
            type: 'info'
          });
          this.fullscreenLoading=false
          return
        }
        this.getShopList();
        this.$notify({
          title: '成功',
          message: '撤销成功',
          type: 'success'
        });
        this.fullscreenLoading=false
        this.cancelFormVisible=false
      },
      async buyTicket(){
        this.fullscreenLoading=true
        try {
          let tx = await buySellerTicket(this.account,
                                  this.buyForm.tokenId,
                                  decimalToBalance(this.buyForm.price));
        } catch (error) {
          this.$notify({
              title: '取消',
              message: '取消成功',
              type: 'info'
            });
            this.fullscreenLoading=false
            return
        }
        this.getShopList();
        this.$notify({
          title: '成功',
          message: '购买成功',
          type: 'success'
        });
        this.fullscreenLoading=false
        this.buyFormVisible=false
      }
    }
}
</script>

<style scoped>
.el-button--text{
  color: #a56b00;
}
.box-card {
  width: 15%;
  color: #eee;
  background: rgba(133, 133, 133, 0.212);
  margin: 25px;
}
.box-container{
  display: flex;
  flex-wrap: wrap;
  width: 90%;
  margin-left: 10%;
}
.image {
  width: 100%;
  display: block;
  height:150px
}
.title{
  color: white;
  margin-left: 50%;
}
</style>
