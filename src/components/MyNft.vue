<template>
  <div>
    <div style="height:30px;margin:20px">
      <el-button class="create-button" type="success" @click="buyTicket">购买票据</el-button>
      <span style="color:white">剩余票据: {{totalTicket}}</span>
    </div>
    <el-container v-loading.fullscreen.lock="fullscreenLoading">
      <div class="box-container">
          <el-card class="box-card"  v-for="item in priList" :key="item._id">
            <el-image :src="item.image" style="width: 100%; height: 170px" fit="scale-down"/>
            <div style="padding: 5px;">
              <div>tokenId: {{item.tokenId}}</div>
              <div>name: {{item.name}}</div>
              <!-- <div>description: {{item.description}}</div> -->
              <div class="bottom clearfix">
                <time class="time">{{ currentDate }}</time>
                <el-tooltip class="item" effect="dark" content="直接转移给对方" placement="left">
                  <el-button type="text" class="button" @click="transfer(item)">转移</el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="设置价格售卖，在商城中显示" placement="right">
                  <el-button type="text" class="button" @click="sell(item)">售卖</el-button>
                </el-tooltip>
              </div>
            </div>
          </el-card>
      </div>
      <el-dialog custom-class="el-dia" title="转移" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="from" :label-width="formLabelWidth">
          <el-input v-model="form.from" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="to" :label-width="formLabelWidth">
          <el-input v-model="form.to" placeholder="请输出目标地址" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="tokenId" :label-width="formLabelWidth">
          <el-input v-model="form.tokenId" autocomplete="off" disabled></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="transferTicket">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog custom-class="el-dia" title="销售" :visible.sync="sellFormVisible">
      <el-form :model="sellForm">
        <span >tokenId: {{sellForm.tokenId}}</span>
        <el-form-item label="price" :label-width="formLabelWidth">
          <el-input v-model="sellForm.price" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="sellFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sellToShop">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog custom-class="el-dia" title="购买票据" :visible.sync="buyFormVisible">
      <span style="color:red">确认支付 {{sellPrice}} cfx购买票据吗</span>
      <div slot="footer" class="dialog-footer">
        <el-button @click="buyFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="buy">确 定</el-button>
      </div>
    </el-dialog>
    </el-container>
    </div>
</template>

<script>
import {initTicketShopContract,ticketPrice,buyTicket,totalTicket,sellTicket,getTicketShopContractAddress,getTicketShopContract} from "../util/indexTicketShop.js"
import {init1155Contract,tokensOf,safeTransferFrom,setApprovalForAll,isApprovedForAll} from "../util/index1155.js"
import {decimalToBalance,balanceToDecimal,etherToBalance} from "../util/MathUtil.js";
const axios = require('axios');

export default {
    name:"MyNft",
    async created(){
      this.account = localStorage.getItem('MyAccount');
      await initTicketShopContract();
      await init1155Contract();
      let pc = await ticketPrice();
      console.log('===>'+pc)
      this.sellPrice = etherToBalance(''+pc);

      this.getTicketList();
    },
    data () {
        return{
          totalTicket:0,
          fullscreenLoading:false,
          account:"",
          sellPrice:0,
          formLabelWidth:"120",
          buyFormVisible:false,
          dialogFormVisible:false,
          sellFormVisible:false,
          currentDate:"",
          form: {
            from: '',
            to:'',
            tokenId:0
          },
          sellForm:{
            price:0,
            from:"",
            tokenId:0
          },
          address:"--",
          priList:[]
        }
    },
    methods:{
      async getTicketList(){
        this.fullscreenLoading=true,
        this.priList=[]
        let tokens = await tokensOf(this.account);
        console.log(JSON.parse(JSON.stringify(tokens)))
        for (const key in tokens) {
          let tokenId=tokens[key][0];
          console.log(tokenId)
          //get detail
          let response = await axios.get('http://nft.yzbbanban.com:18756/v1/nft/brbr/'+tokenId+'.json')
          let res = response.data;
          console.log(res);
          this.priList.push({tokenId,name:res.name,image:res.image,description:res.description})
        }
        this.totalTicket = ''+await totalTicket();
        this.fullscreenLoading = false
      },
      buyTicket(){
        this.buyFormVisible = true;
      },
      async buy(){
        this.fullscreenLoading = true
        try {
          let tx = await buyTicket(this.account,decimalToBalance(this.sellPrice));
          console.log(tx)
          this.buyFormVisible = false
          this.$notify({
            title: '成功',
            message: '购买成功',
            type: 'success'
          });
        } catch (error) {
          console.log('lsp===>'+error)
          this.$notify({
            title: '取消',
            message: '购买取消',
            type: 'info'
          });
        }
        
        this.getTicketList();
      },
      privateGame(item){
        this.$router.push({ path: 'gameDetail', params: { gameId: item._id }})
      },
      transfer(item){
        console.log(item)
        this.dialogFormVisible = true
        this.form={
          from: this.account,
          to:'',
          tokenId:''+item.tokenId
        }
      },
      async transferTicket(){
        this.fullscreenLoading = true
        try {
          let tx = await safeTransferFrom(this.form.from,this.form.to,this.form.tokenId);
          console.log(tx);
        } catch (error) {
          this.$notify({
            title: '取消',
            message: '取消成功',
            type: 'info'
          });
          this.dialogFormVisible=false
          return
        }
        this.$notify({
          title: '成功',
          message: '转移成功',
          type: 'success'
        });
        this.dialogFormVisible=false
        this.getTicketList();
      },
      async sell(item){
        //先授权
        let operator = getTicketShopContractAddress();
        let approved = await isApprovedForAll(this.account,operator);
        var that = this;
        if(!approved){
          this.$confirm('需要授权, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            that.fullscreenLoading = true,
            setApprovalForAll(operator,that.account).then(tx=>{
              console.log(tx)
              this.getTicketList();
              this.$message({
                type: 'success',
                message: '授权成功!'
              });
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '授权失败'
            });          
          });
        }else{
          console.log(approved)
          console.log(item.tokenId)
          this.sellFormVisible=true
          this.sellForm={
            price:0,
            from: this.account,
            tokenId:item.tokenId
          }
        }
      },
      async sellToShop(){
        let pr=this.sellForm.price;
        let tx = await sellTicket(this.account,this.sellForm.tokenId,decimalToBalance(pr));
        console.log(tx);
        this.$notify({
          title: '成功',
          message: '售卖上架成功',
          type: 'success'
        });
        this.sellFormVisible = false
        this.getTicketList();
      }
    }
}
</script>

<style scoped>
.create-button{
  font-size: 20px;
  margin-left: 50px;
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
}
.title{
  color: white;
  margin-left: 50%;
}
</style>
