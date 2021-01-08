<template>
  <div>
    <div style="height:30px">
        <el-button class="create-button" type="text" @click="buyTicket">购买票据</el-button>
    </div>
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
import {initTicketShopContract,ticketPrice,buyTicket,sellTicket,getTicketShopContract} from "../util/indexTicketShop.js"
import {init1155Contract,tokensOf,safeTransferFrom,setApprovalForAll,isApprovedForAll} from "../util/index1155.js"
import {decimalToBalance,balanceToDecimal} from "../util/MathUtil.js";
const axios = require('axios');

export default {
    name:"MyNft",
    inject:['reload'],
    async created(){
      this.account = localStorage.getItem('MyAccount');
      await initTicketShopContract();
      await init1155Contract();
      let pc = await ticketPrice();
      console.log(JSON.stringify(pc))
      this.sellPrice = JSON.stringify(pc);
      this.getTicketList();
    },
    data () {
        return{
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
          address:"0x10E98765aE49E72Dd11b04a9c0981D79f05BE003",
          priList:[]
        }
    },
    methods:{
      async getTicketList(){
        let tokens = await tokensOf(this.account);
        console.log(JSON.parse(JSON.stringify(tokens)))
        for (const key in tokens) {
          let tokenId=tokens[key][0];
          console.log(tokenId)
          //get detail
          let  response = await axios.get('http://192.168.2.17:18756/v1/nft/brbr/'+tokenId+'.json')
          let res = response.data;
          console.log(res);
          this.priList.push({tokenId,name:res.name,image:res.image,description:res.description})
        }
      },
      buyTicket(){
        this.buyFormVisible = true;
      },
      async buy(){
        let tx = await buyTicket(this.account,100000000000000000);
        console.log(tx)
        this.buyFormVisible = false
        this.$notify({
          title: '成功',
          message: '购买成功',
          type: 'success'
        });
        this.reload();
      },
      privateGame(item){
        this.$router.push({ path: 'gameDetail', params: { gameId: item._id }})
      },
      transfer(item){
        console.log(item)
        this.dialogFormVisible=true
        this.form={
          from: this.account,
          to:'',
          tokenId:''+item.tokenId
        }
      },
      async transferTicket(){
        let tx = await safeTransferFrom(this.form.from,this.form.to,this.form.tokenId);
        console.log(tx);
        this.$notify({
          title: '成功',
          message: '转移成功',
          type: 'success'
        });
        this.dialogFormVisible=false
        this.reload();
      },
      async sell(item){
        //先授权
        let operator = "0x8a8e4095ee3ee65dd200b5e4f9bceab285f9cd48";
        let approved = await isApprovedForAll(this.account,operator);
        var that = this;
        if(!approved){
          this.$confirm('需要授权, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            setApprovalForAll(operator,that.account).then(tx=>{
              console.log(tx)
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
        this.reload();
      }
    }
}
</script>

<style scoped>
.create-button{
  font-size: 40px;
  margin-left: 50px;
}
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
