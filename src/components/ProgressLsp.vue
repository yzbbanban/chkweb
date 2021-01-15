<template>
  <div>
    <div class="progress">
      <div :style="{ width: percent + '%' }" class="progress-bar">
        <div class="indicator animate__animated animate__shakeX">
          <svg t="1610435470375" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6530" width="32" height="32"><path d="M115.2 929.6a402.4 65.6 0 1 0 804.8 0 402.4 65.6 0 1 0-804.8 0Z" fill="#BDB9B8" p-id="6531"></path><path d="M0 710.4c0-288 229.6-521.6 512-521.6s512 233.6 512 521.6c0 328-368 148-512 148S0 1038.4 0 710.4z" fill="#FFF100" p-id="6532"></path><path d="M0 685.6c0-281.6 229.6-510.4 512-510.4s512 228.8 512 510.4c0 320.8-368 144.8-512 144.8s-512 176-512-144.8z m512 128.8c138.4 0 493.6 167.2 493.6-136.8 0-266.4-220.8-483.2-493.6-483.2S18.4 410.4 18.4 676.8c0 304 355.2 137.6 493.6 137.6z" fill="#754B1B" p-id="6533"></path><path d="M748.8 853.6c131.2 18.4 256.8 4 256.8-176.8 0-266.4-220.8-483.2-493.6-483.2 527.2 60.8 537.6 684.8 236.8 660z" fill="#B3A53C" p-id="6534"></path><path d="M542.4 524.8c0 4.8-1.6 96-62.4 96s-62.4-92-62.4-96 16-24.8 62.4-24.8 62.4 20.8 62.4 24.8z" fill="#560000" p-id="6535"></path><path d="M528.8 524c0 6.4-7.2 8.8-48.8 8.8s-48-2.4-48-8.8 31.2-14.4 48.8-14.4 48 8 48 14.4z" fill="#EC9802" p-id="6536"></path><path d="M432 538.4c30.4 4.8 64 4.8 100.8 0 0 0-10.4 76-53.6 76S432 538.4 432 538.4z" fill="#822525" p-id="6537"></path><path d="M517.6 584.8c-8 16-20.8 30.4-39.2 30.4-19.2 0-30.4-15.2-36.8-32-0.8-8 76-6.4 76 1.6z" fill="#F5980C" p-id="6538"></path><path d="M476 572.8c16-7.2 32-6.4 47.2 0l-5.6 12.8c-23.2-5.6-48.8-6.4-76-2.4l-4-11.2c14.4-6.4 28-6.4 38.4 0.8z" fill="#B33543" p-id="6539"></path><path d="M361.6 435.2c-4 0-8-2.4-9.6-5.6-12.8-20.8-36.8-35.2-64-35.2s-50.4 14.4-64 35.2c-2.4 3.2-5.6 5.6-9.6 5.6-8.8 0-14.4-9.6-9.6-16.8 16.8-28 48-46.4 83.2-46.4s66.4 18.4 83.2 46.4c4 8-0.8 16.8-9.6 16.8zM769.6 435.2c-4 0-8-2.4-9.6-5.6-12.8-20.8-36.8-35.2-64-35.2s-50.4 14.4-64 35.2c-2.4 3.2-5.6 5.6-9.6 5.6-8.8 0-14.4-9.6-9.6-16.8 16.8-28 48-46.4 83.2-46.4s66.4 18.4 83.2 46.4c4.8 8-0.8 16.8-9.6 16.8z" fill="#560000" p-id="6540"></path><path d="M126.4 523.2a76.8 37.6 0 1 0 153.6 0 76.8 37.6 0 1 0-153.6 0Z" fill="#ED1C24" opacity=".5" p-id="6541"></path><path d="M704 523.2a76.8 37.6 0 1 0 153.6 0 76.8 37.6 0 1 0-153.6 0Z" fill="#ED1C24" opacity=".5" p-id="6542"></path><path d="M419.2 28.8c107.2 0 105.6 100.8 105.6 100.8s56-90.4 108.8-37.6c37.6 36.8-93.6 138.4-123.2 138.4S312 28.8 419.2 28.8z" fill="#F0323C" p-id="6543"></path><path d="M122.4 560.8c14.4-1.6 39.2 20.8 69.6 48 32.8 29.6 84.8 68 52 80.8L122.4 560.8z" fill="#B3A53C" p-id="6544"></path><path d="M102.4 723.2c4.8 0 9.6-4 9.6-9.6 0.8-28.8 0-120 15.2-129.6 16-9.6 78.4 72.8 100.8 104 4.8 6.4 13.6 6.4 17.6 0 3.2-4.8 2.4-10.4-0.8-14.4-22.4-25.6-102.4-112-122.4-112s-27.2 116-29.6 152c-0.8 4.8 4 9.6 9.6 9.6z" fill="#7F4A1E" p-id="6545"></path><path d="M882.4 728c8 3.2 13.6-2.4 14.4-12 1.6-13.6-3.2-28.8-6.4-47.2-6.4-43.2-18.4-92.8-36-100l28 159.2z" fill="#B3A53C" p-id="6546"></path><path d="M728 672c4 3.2 8.8 2.4 12-0.8 20.8-20 92-88 103.2-82.4 9.6 5.6 24 93.6 29.6 130.4 0.8 7.2 8.8 10.4 14.4 5.6 2.4-2.4 3.2-4.8 3.2-8-2.4-25.6-15.2-145.6-37.6-151.2-23.2-5.6-98.4 64-124.8 88.8-5.6 5.6-5.6 13.6 0 17.6z" fill="#714721" p-id="6547"></path><path d="M274.4 856l-42.4 46.4c-4 4.8-2.4 12 3.2 14.4 3.2 1.6 7.2 0 9.6-2.4l48-56-18.4-2.4z" fill="#754B1B" p-id="6548"></path><path d="M283.2 860.8v81.6c0 4.8 4 9.6 8.8 10.4h0.8c6.4 0.8 12-4 12-10.4v-83.2l-21.6 1.6zM304.8 860l24.8 32c3.2 4 9.6 4 12.8-0.8l0.8-1.6c1.6-3.2 1.6-7.2-0.8-9.6l-28-30.4-9.6 10.4z" fill="#754B1B" p-id="6549"></path><path d="M748.8 856.8l42.4 46.4c4 4.8 2.4 12-3.2 14.4-3.2 1.6-7.2 0-9.6-2.4l-48-56 18.4-2.4z" fill="#754B1B" p-id="6550"></path><path d="M740 860.8v81.6c0 4.8-4 9.6-8.8 10.4h-0.8c-6.4 0.8-12-4-12-10.4v-83.2l21.6 1.6zM718.4 860l-24.8 32c-3.2 4-9.6 4-12.8-0.8l-0.8-1.6c-1.6-3.2-1.6-7.2 0.8-9.6l28-30.4 9.6 10.4z" fill="#754B1B" p-id="6551"></path></svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
var moment = require('moment');

export default {
  name: 'ProgressLsp',
  data() {
    return {
      percent: 0,
      timer: null
    }
  },
  created() {

  },
  methods: {
    clearTime(){
      clearTimeout(this.timer)
    },
    changePrecent(showTime,duation){
      clearTimeout(this.timer)
      let totalTime = duation;
      let persent = 36;
      console.log(`showTime: ${showTime}`)
      let per = (Number(showTime)/Number(totalTime)) * 100
      console.log(`per: ${per}`)
      this.percent = 0
      this.percent += per
      if (this.percent >= 100) {
        this.percent = 100
        clearTimeout(this.timer)
      }
      var that = this;
      //current / total = per / 100
      // 100 3600, 0.028
      //per = current * 100 / total
      setInterval(()=>{
        that.percent += 0.028
        // console.log(`that.percent: ${that.percent}`)
      },1000)
    },
  }
}
</script>

<style>

.progress {
  position: relative;
  width: 300px;
  height: 10px;
  margin: 50px auto;
  border-radius: 5px;
  background-color: #606366;
}
.progress-bar {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  height: 100%;
  border-radius: 5px;
  background-color: #fbff14;
  transition: width 0.2s;
}
.indicator {
  position: absolute;
  top: -36px;
  right: -16px;
  z-index: 2;
  border-radius: 50%;
  animation-duration:1s;
  animation-fill-mode:both;
  animation-iteration-count:3600
}
</style>
