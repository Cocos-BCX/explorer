<template>
  <div>
    <Header></Header>
    <div class="model">
      <div class="title">{{$t('faucet.title')}}</div>
      <div class="prompt">{{$t('faucet.des')}}</div>
      <input type="text" v-model="address" :placeholder="$t('faucet.search')">
      <div class="href">{{$t('faucet.register')}}</div>
      <button>{{$t('faucet.get')}}100 COCOS</button>
    </div>
  </div>
</template>
<script>
import Header from "../../components/header.vue";
export default {
  components: {
    Header
  },
  name: "stopcock",
  data() {
    return {
      address: ""
    };
  },
  mounted() {},
  methods: {}
};
</script>
<style scoped lang="less" rel="stylesheet/less">
.model {
  width: 550px;
  height: 374px;
  margin: 202px auto;
  background: rgba(255, 255, 255, 1);
  box-shadow: 6px 6px 28px 3px rgba(217, 220, 237, 0.47);
  display: flex;
  flex-direction: column;
  align-items: center;
  .title {
    font-size: 24px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    margin-top: 49px;
  }
  .prompt {
    font-size: 13px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(152, 152, 152, 1);
    line-height: 18px;
    margin-top: 7px;
  }
  input {
    width: 384px;
    height: 44px;
    background: rgba(246, 246, 252, 1);
    border-radius: 6px;
    margin-top: 54px;
    color: rgba(152, 152, 152, 1);
    padding-left: 16px;
  }
  .href {
    align-self: flex-start;
    margin: 10px 0 0 91px;
    color: rgba(56, 141, 244, 1);
    font-size: 14px;
  }
  button {
    width: 400px;
    height: 44px;
    background: rgba(56, 141, 244, 1);
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    margin-top: 26px;
  }
}
</style>