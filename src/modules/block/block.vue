<template>
  <div class="block">
    <Header></Header>
    <div class="detail">
      <div class="content">
        <div class="title">区块</div>
        <div class="info">
          <div class="height piece"><span>区块高度</span> <span>789787</span></div> 
          <div class="status piece"><span>状态</span> <span class="center">待确认</span></div>
          <div class="time piece"><span>时间戳</span> <span class="center">1123456789天2小时前 (aug)交易</span></div>
          <div class="hash piece">
              <span>哈希</span> 
              <span class="center">{{hash}}</span>
              <button type="button" v-clipboard:copy="hash" v-clipboard:success="onCopy">复制</button>
          </div>
          <div class="father-hash piece">
              <span>父哈希</span>
              <span class="center">{{f_hash}}</span>
              <button type="button" v-clipboard:copy="f_hash" v-clipboard:success="onCopy">复制</button>
         </div>
          <div class="code piece">
              <span>节点</span>
              <span>{{codes}}</span>
          <button type="button" v-clipboard:copy="codes" v-clipboard:success="onCopy">复制</button></div>
          <div class="trade piece"><span>交易数量</span><span>32 sadsad</span></div>
          <div class="size piece"><span>大小</span><span>123213123 字节</span></div>
        </div>
        <div class="title">转账</div>
        <div class="table">
          <div class="th">
            <div class="list">哈希值</div>
            <div class="list">年龄</div>
            <div class="list">发送人</div>
            <div class="list">接受人</div>
            <div class="list">数量</div>
          </div>
          <div class="td th">
            <div class="list">qwert12345ujhgfdsx45qwert12345ujhgfdsx45</div>
            <div class="list">3 seconds</div>
            <div class="list">qwert12345ujhgfdsx45qwert12345ujhgfdsx45</div>
            <div class="list">qwert12345ujhgfdsx45qwert12345ujhgfdsx45</div>
            <div class="list">COCOC3</div>
          </div>
        </div>
      </div>
    </div>
    <Foot></Foot>
  </div>
</template>
<script>
import Header from '../../components/header.vue'
import Foot from '../../components/foot.vue'
export default {
    components: {
        Header,
        Foot
    },
    name: 'block',
    data() {
        return {
            hash: 'af82e2e2ed5c7db4953baf82e2e2ed5c7db4953b',
            f_hash: 'af82e2e2ed5c7db4953baf82e2e2ed5c7db4953b',
            codes: 'wqewqeeqwe'
        }
    },
    mounted() {
        this.pageFn()
    },
    methods: {
        pageFn(val) {
            this.page = val
        },
        onCopy: function(e) {
            console.log('你刚刚复制: ' + e.text)
        }
    }
}
</script>
<style scoped lang="less" rel="stylesheet/less">
.block {
    width: 100%;
    .detail {
        width: 1440px;
        margin: 0 auto;
        height: 1674px;
        .content {
            margin: 0 auto;
            width: 1200px;
            display: flex;
            display: flex;
            flex-direction: column;
            .title {
                height: 52px;
                font-size: 26px;
                margin-top: 49px;
            }
            .info {
                width: 1148px;
                height: 312px;
                background: rgba(246, 246, 252, 1);
                margin-top: 20px;
                display: flex;
                padding: 32px 26px;
                flex-direction: column;
                .piece {
                    display: flex;
                    align-items: flex-start;
                    margin-top: 14px;
                    span:nth-of-type(1) {
                        width: 72px;
                        height: 25px;
                        font-size: 18px;
                        color: rgba(152, 152, 152, 1);
                    }
                    span:nth-of-type(2) {
                        color: #333;
                        margin-left: 40px;
                        // width: 700px;
                        font-size: 18px;
                    }
                    button {
                        border: 0;
                        background-color: transparent;
                        outline: none;
                        width: 36px;
                        height: 16px;
                        border-radius: 50px;
                        border: 1px solid #4990ed;
                        color: #4990ed;
                        line-height: 16px;
                        margin: 4px 0 0 6px;
                        cursor: pointer;
                    }
                    button:after {
                        border: none;
                    }
                }
                .height.piece {
                    margin-top: 0;
                }
            }
            .table {
                display: flex;
                flex-direction: column;
                .th {
                    display: flex;
                    align-items: center;
                    height: 60px;
                    width: 100%;
                    border-bottom: 1px solid #e6e6e6;
                    color: #989898;
                }
                .td {
                    color: #333;
                    height: 86px;
                }
                .list:nth-of-type(1) {
                    width: 220px;
                    margin-left: 25px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                .list:nth-of-type(2) {
                    width: 88px;
                    margin-left: 52px;
                }
                .list:nth-of-type(3) {
                    width: 221px;
                    margin-left: 61px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                .list:nth-of-type(4) {
                    width: 221px;
                    margin-left: 61px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                .list:nth-of-type(5) {
                    width: 84px;
                    margin-left: 61px;
                }
            }
        }
    }
}
</style>