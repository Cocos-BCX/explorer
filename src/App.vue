<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App",
  data: function() {
    return {
      dialogVisible: true
    };
  }
};
</script>
<style>
#app {
  @import "./style/common.css";
}
</style>
