<template>
  <div>
     <el-dialog  custom-class="el-dia"
        title="用户信息"
        :visible.sync="dialogVisible"
        width="30%">
        <div v-if="accountId=='--'">
          <span>加入推荐关系？</span>
          <el-input style="margin-bottom:20px" v-model="inviteId" placeholder="请输入推荐人ID(默认为1)"></el-input>
          <br>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="registerAccount">确 定</el-button>
          </span>
        </div>
        <div v-else>
          <span>已注册</span>
          <div class="dia-msg"><i class="el-icon-s-custom"> 推荐人地址: </i> 
            <div>{{referrer}}</div>
          </div>
          <br>
          <div class="dia-msg"><i class="el-icon-bank-card"> 推荐人Id: {{referrerId}}</i>
          </div>
          <br>
        </div>
        
      </el-dialog>
  </div>
</template>

<script>
import { getAddress } from "../util/base.js";
import { getUserInfo,register,initAIContract } from "../util/indexInvite.js";
export default {
    name:"Invite",
    async created(){
      let res = await getAddress()
      this.address = ''+res;
      localStorage.setItem('MyAccount', this.address);
      this.inviteId = this.$route.params.id
      console.log('===11111111==>'+this.inviteId)
      this.getUserInfoP()
    },
    data () {
        return{
          dialogVisible:true,
          address:"",
          inviteId:'',
          accountId:'--',
          referrer:'',
          referrerId:''
        }
    },
    methods:{
      async getUserInfoP(){
        let userInfo = await getUserInfo(this.address);
        let user = JSON.parse(JSON.stringify(userInfo))
        console.log(user)
        this.referrer = user[1]
        this.referrerId = user[2]
        console.log('======+>'+user[3])
        this.accountId = user[3]==0?'--':''+user[3]
        this.inviteUrl = '/#/invite/'+ this.referrerId
      },
      async registerAccount(){
        try {
          let tx = await register(this.inviteId,this.address);
          console.log(tx)
        } catch (error) {
          this.$notify({
            title: '取消',
            message: '取消成功',
            type: 'info'
          });
          return;
        }
        this.$notify({
          title: '成功',
          message: '注册成功',
          type: 'success'
        });
        this.dialogVisible = false
        this.$router.push({path:'/'})
      }
    }
}
</script>

<style scoped>
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
