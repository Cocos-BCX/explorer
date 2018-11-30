<template>
  <div class="trade block">
    <Header></Header>
    <div class="detail">
      <div class="content">
        <div class="title">{{$t('address.title')}}</div>
        <div class="info">
          <div class="height piece">
            <span>{{$t('address.detail.address')}}</span>
            <span class="center address">{{address}}</span>
            <button
              type="button"
              v-clipboard:copy="address"
              v-clipboard:success="onCopy"
            >{{$t('address.trade.copy')}}</button>
          </div>
          <div class="status piece">
            <span>{{$t('address.detail.name')}}</span>
            <span class="center">21312312</span>
          </div>
          <div class="time piece">
            <span>{{$t('address.detail.trade')}}</span>
            <span class="low center">↓324234</span>
            <span class="high center">↑234442</span>
          </div>
          <div class="hash piece">
            <span>{{$t('address.detail.balance')}}</span>
            <span class="center">234124141214TRX</span>
          </div>
        </div>
        <div class="title">{{$t('address.trade.title')}}</div>
        <div class="table">
          <div class="th">
            <div class="list">{{$t('address.trade.hash')}}</div>
            <div class="list">{{$t('address.trade.age')}}</div>
            <div class="list">{{$t('address.trade.from')}}</div>
            <div class="list">{{$t('address.trade.to')}}</div>
            <div class="list">{{$t('address.trade.num')}}</div>
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
    <!-- <pageination :total="50" :size="size" :page="10" :changge="pageFn" :isUrl="true"></pageination> -->
    <Foot></Foot>
  </div>
</template>
<script>
import Header from "../../components/header.vue";
import Foot from "../../components/foot.vue";
export default {
  components: {
    Header,
    Foot
  },
  name: "trade",
  data() {
    return {
      address: "af82e2e2ed5c7db4953baf82e2e2ed5c7db4953b"
    };
  },
  mounted() {
    this.pageFn();
  },
  methods: {
    pageFn(val) {
      this.page = val;
    },
    onCopy: function(e) {
      console.log("你刚刚复制: " + e.text);
    }
  }
};
</script>
<style scoped lang="less" rel="stylesheet/less">
.block {
  width: 100%;
  .detail {
    width: 1440px;
    margin: 0 auto;
    height: 1520px;
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
          .high.center {
            font-size: 18px;
            color: rgba(239, 94, 75, 1);
            margin-left: 5px;
          }
          .low.center {
            font-size: 18px;
            color: rgba(60, 175, 117, 1);
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