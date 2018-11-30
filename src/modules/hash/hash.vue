<template>
  <div class="trade block hash">
    <Header></Header>
    <div class="detail">
      <div class="content">
        <div class="title">{{$t('trade.title')}}</div>
        <div class="info">
          <div class="hash-title"># hash {{transactions.trx_id}}</div>
          <div class="status piece">
            <span>{{$t('trade.detail.status')}}</span>
            <span
              v-if="transactions.signatures && transactions.signatures.length"
              class="center padding"
            >{{$t('trade.detail.type.center')}}</span>
            <span
              v-if="transactions.signatures && !transactions.signatures.length"
              class="center no-padding"
            >{{$t('trade.detail.type.padding')}}</span>
          </div>
          <div class="status piece">
            <span>{{$t('trade.detail.hash')}}</span>
            <span class="center">{{transactions.trx_id}}</span>
            <button
              type="button"
              v-clipboard:copy="address"
              v-clipboard:success="onCopy"
            >{{$t('trade.detail.copy')}}</button>
          </div>
          <div class="status piece">
            <span>{{$t('trade.detail.block')}}</span>
            <span class="center address">{{transactions.block_num}}</span>
          </div>
          <div class="hash piece">
            <span>{{$t('trade.detail.time')}}</span>
            <span class="center">{{transactions.date}}</span>
          </div>
        </div>
        <div class="title trade-title">
          {{$t('trade.trade_detail.trade')}}
          <span>{{$t('trade.trade_detail.address')}}</span>
        </div>
        <div class="info trade-info">
          <div class="height piece">
            <span>{{$t('trade.trade_detail.from')}}</span>
            <span class="center">{{transactions.parse_operations.from}}</span>
          </div>
          <div class="status piece">
            <span>{{$t('trade.trade_detail.to')}}</span>
            <span class="center">{{transactions.parse_operations.to}}</span>
          </div>
          <div class="status piece">
            <span>{{$t('trade.trade_detail.num')}}</span>
            <span class="center address">{{transactions.parse_operations.amount}}</span>
          </div>
        </div>
      </div>
    </div>
    <Foot></Foot>
  </div>
</template>
<script>
import Header from "../../components/header.vue";
import Foot from "../../components/foot.vue";
import api from "../../http/api.js";
import moment from "moment";
import util from "../../util/util";
export default {
  components: {
    Header,
    Foot
  },
  name: "Hash",
  data() {
    return {
      transactions: ""
    };
  },
  mounted() {
    const that = this;
    that.pageFn();
    let trans_id = that.$route.params.trans_id;
    api.get(`/query_trans/${trans_id}`, {}).then(result => {
      if (result.data.trans.parse_ops && result.data.trans.parse_ops.length) {
        that.transactions = result.data.trans.parse_ops[0];
        that.transactions.trx_id = result.data.trans.trx_id;
        that.transactions.date = moment(
          new Date(result.data.trans.parse_ops[0].date)
        ).format("MM/DD/YYYY HH:MMA");
        that.transactions.signatures = result.data.trans.signatures;
      }
    });
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
          .no-padding.center {
            background: rgba(223, 223, 230, 1);
            color: #666;
            padding: 0 4px;
            font-size: 18px;
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