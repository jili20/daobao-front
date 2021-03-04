<template>
  <div>
    <div class="box404">
      <br>
      <p style="color: white;text-align: center;font-size: 20px;">
        您所寻找的页面不存在，<span style="color: red">{{ times }}</span>  秒后，将返回首页!
      </p>

    </div>
  </div>
</template>

<script>
export default {
  name: "FourOFour",
  data() {
    return {
      times: 10
    }
  },
  created() {
    // this.goHome();
  },
  methods: {
    // goHome: function () {
    //   this.timer = setInterval(() => {
    //     this.times--
    //     if (this.times === 0) {
    //       clearInterval(this.timer)
    //       this.$router.push({path: '/'});
    //     }
    //   }, 1000)
    // }
  }
}
</script>

<style scoped>
.box404 {
  width: 100vw;
  height: 100vh;

  background: url("../../assets/images/404.gif") no-repeat 0 0;
  background-size: cover;
}

</style>
