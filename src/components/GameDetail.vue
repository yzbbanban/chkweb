<template>
  <div>
    <el-container>
        <el-main>
          <div class="title">私人详情</div>
          <el-card class="box-card">
            <h1>ID: 100</h1>
            <el-form class="elform" :model="poolForm" ref="poolForm" label-position="left" label-width="100px">
              <el-form-item label="总奖池" prop="pool">
                <span style="font-size:40px">12.33</span>
              </el-form-item>
              <el-form-item label="当前轮" prop="pool">
                <span>5</span>
              </el-form-item>
              <el-form-item label="当前参与人数" prop="pool">
                <span>11</span>
              </el-form-item>
              <el-form-item label="参与总人数" prop="pool">
                <span>32</span>
              </el-form-item>
              <el-form-item label="下一轮时间" prop="pool">
                <span>20min</span>
              </el-form-item>
              <el-form-item label="此轮结束时间" prop="pool">
                <span>2020-12-30 20:00</span>
              </el-form-item>
              <el-button plain type="primary">抢夺</el-button>
            </el-form>
          </el-card>
        </el-main>
      </el-container>
  </div>
</template>

<script>

export default {
    name:"GameDetail",
    data () {
        return{
          url: require("../../src/assets/av.jpg"),
        }
    }
}
</script>

<style scoped>
.elform{
  color: #eee;
  margin-left: 30%;
}
.box-card {
  width: 24%;
  color: #eee;
  background: rgba(255, 255, 255, 0);
  margin-top: 25px;
  width: 40%;
  margin-left: 30%;
}

.title{
  color: white;
  margin-left: 50%;
}
</style>
