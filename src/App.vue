<template>
  <div id="app">
    <router-view/>
    <!-- <el-dialog :title="$t('home.prompt')" :visible.sync="dialogVisible" width="40%">
      <span>{{$t('home.content')}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">{{$t('home.button.cancel')}}</el-button>
        <el-button type="primary" @click="dialogVisible = false">{{$t('home.button.confirm')}}</el-button>
      </span>
    </el-dialog>-->
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
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px; */
  @import "./style/common.css";
}
</style>
