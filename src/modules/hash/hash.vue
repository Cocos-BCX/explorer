<template>
  <div class="trade block hash">
    <Header></Header>
    <div class="detail">
      <div class="content">
        <div class="title">交易</div>
        <div class="info">
          <div class="hash-title"># hash af82e2e2ed5c7db4953baf82e2e2ed5c7db4953b</div>
          <div class="status piece"><span>STATU</span> <span class="center padding">CONFIRMED</span></div>
          <div class="status piece">
            <span>HASH</span> 
            <span class="center">{{address}}</span>
            <button type="button" v-clipboard:copy="address" v-clipboard:success="onCopy">复制</button>
          </div> 
          <div class="status piece"><span>BLOCK</span> <span class="center address">21312312</span></div>
          <div class="hash piece"><span>TIME</span> <span class="center">11/12/2018 2:59PM</span></div>
        </div>
        <div class="title trade-title">交易信息<span>trx transfer between address</span></div>
        <div class="info trade-info">
          <div class="height piece"><span>FROM</span> <span class="center">af82e2e2ed5c7db4953baf82e2e</span></div>
          <div class="status piece"><span>To</span> <span class="center">af82e2e2ed5c7db4953baf82e2e</span></div>
          <div class="status piece"><span>AMOUNT</span> <span class="center address">1000 COCOS</span></div>
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
    name: 'hash',
    data() {
        return {
            address: 'af82e2e2ed5c7db4953baf82e2e2ed5c7db4953b'
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
        height: 993px;
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
                display: flex;
                align-items: center;
                span {
                    font-size: 16px;
                    color: #666;
                    margin-left: 34px;
                }
            }
            .trade-title.title {
                margin-top: 44px;
            }
            .info.trade-info {
                height: 105px;
            }
            .info {
                .hash-title {
                    font-weight: 500;
                    font-size: 20px;
                }
                width: 1148px;
                height: 147px;
                background: rgba(246, 246, 252, 1);
                margin-top: 20px;
                display: flex;
                padding: 32px 26px;
                flex-direction: column;
                .piece {
                    display: flex;
                    align-items: flex-start;
                    margin-top: 14px;
                    .center.address {
                        color: rgba(56, 141, 244, 1);
                    }
                    .padding.center {
                        background: rgba(56, 141, 244, 1);
                        color: white;
                        padding: 0 4px;
                    }
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
        }
    }
}
</style>