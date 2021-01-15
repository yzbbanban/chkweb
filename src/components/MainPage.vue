<template>
  <el-container>
  <el-main>
    <snatch-main></snatch-main>
  </el-main>
</el-container>
</template>

<script>
import snatchMain from "./SnatchMain"

export default {
  name: 'MainPage',
  components: {
      snatchMain
  },
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
