<template>
  <div>
    <el-container style="text-align:center" v-loading.fullscreen.lock="fullscreenLoading">
      <span style="color:white;margin-top:100px;margin-left:100px;font-size:50px">Coming soon...</span>    
    </el-container>
    </div>
</template>

<script>
export default {
    name:"Finance",
    async created(){
      this.account = localStorage.getItem('MyAccount');
    },
    data () {
        return{
          fullscreenLoading:false,
          account:"",
        }
    },
    methods:{
      
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
