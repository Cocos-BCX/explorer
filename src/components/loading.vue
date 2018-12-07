<template>
  <div class="loading" :height="height">
    <img src="/static/image/loading.png">
  </div>
</template>
<script>
export default {
  name: "loading",
  props: ["height"],
  data() {
    return {
      loading: false
    };
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
.loading {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: inherit;
  background-color: #eff;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
