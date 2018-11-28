<template>
  <div class="foot">
    <div class="detail">

    </div>
    <div class="all">
      @ 2018 COCOS All rig
    </div>
  </div>
</template>
<script>
export default {
    name: 'Foot',
    data() {
        return {}
    },
    mounted() {}
}
</script>
<style scoped lang="less" rel="stylesheet/less">
.foot {
    height: 216px;
    width: 100%;
    display: flex;
    flex-direction: column;
    .detail {
        height: 180px;
        width: 100%;
        background: rgba(69, 69, 69, 1);
    }
    .all {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 36px;
        width: 100%;
        background: rgba(51, 51, 51, 1);
        font-size: 12px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
    }
}
</style>
