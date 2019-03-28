<template>
  <div class="totop">
    <div class="tojt">
      <div></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Top",
  data() {
    return {};
  },
  created() {
    var that = this;
    // this.bus.$on("loading", function(data) {
    //   that.loading = !!data;
    // });
  }
};
</script>
<style scoped lang="less">
.totop {
  height: 54px;
  width: 63px;
  background: #676767;
  position: fixed;
  -webkit-transform: skewX(-20deg);
  transform: skewX(-20deg);
  cursor: pointer;
  right: 120px;
  bottom: 150px;
  -webkit-transition: all 0.8s;
  transition: all 0.8s;
  .tojt {
    transform: skewX(20deg);
    position: relative;
    div {
      position: absolute;
      display: inline-block;
      width: 8px;
      height: 8px;
      -webkit-transform: rotate(-45deg);
      transform: rotate(-45deg);
      border-color: currentcolor currentcolor #fff #fff;
      border-right: 2px solid #fff;
      border-top: 2px solid #fff;
      margin: 50px auto auto 100px;
      top: -25px;
      left: -82px;
    }
  }
}
</style>
