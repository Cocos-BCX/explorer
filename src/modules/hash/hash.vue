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
              v-clipboard:copy="transactions.trx_id"
              v-clipboard:success="onCopy"
            >{{$t('trade.detail.copy')}}</button>
          </div>
          <div class="status piece">
            <span>{{$t('trade.detail.block')}}</span>
            <span
              class="center address blocks"
              @click="queryBlock(transactions.block_num)"
            >{{transactions.block_num}}</span>
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
        <div
          class="info trade-info"
          v-if="transactions.parse_operations && transactions.type === 'transfer'"
        >
          <div
            class="height piece address"
            @click="queryAddress(transactions.parse_operations.from)"
          >
            <span>{{$t('trade.trade_detail.from')}}</span>
            <span class="center">{{transactions.parse_operations.from}}</span>
          </div>
          <div class="status piece address" @click="queryAddress(transactions.parse_operations.to)">
            <span>{{$t('trade.trade_detail.to')}}</span>
            <span class="center">{{transactions.parse_operations.to}}</span>
          </div>
          <div class="status piece">
            <span>{{$t('trade.trade_detail.num')}}</span>
            <span class="center address">{{transactions.parse_operations.amount}}</span>
          </div>
        </div>
        <div
          class="info trade-info"
          v-if="transactions.parse_operations && transactions.type === 'call_contract_function'"
        >
          <div
            class="height piece address"
            @click="queryAddress(transactions.parse_operations.caller)"
          >
            <span>{{$t('trade.trade_detail.from')}}</span>
            <span class="center">{{transactions.parse_operations.caller}}</span>
          </div>
          <div class="status piece address">
            <span>{{$t('trade.trade_detail.contract')}}</span>
            <span class="center">{{transactions.parse_operations.contract_name}}</span>
          </div>
          <div class="status piece">
            <span>{{$t('trade.trade_detail.num')}}</span>
            <span class="center address">{{transactions.parse_operations.fee}}</span>
          </div>
        </div>
        <div
          class="info trade-info"
          v-if="transactions.parse_operations && transactions.type === 'account_create'"
        >
          <div
            class="height piece address"
            @click="queryAddress(transactions.parse_operations.registrar)"
          >
            <span>{{$t('trade.trade_detail.create')}}</span>
            <span class="center">{{transactions.parse_operations.registrar}}</span>
          </div>
          <div
            class="status piece address"
            @click="queryAddress(transactions.parse_operations.new_account)"
          >
            <span>{{$t('trade.trade_detail.account')}}</span>
            <span class="center">{{transactions.parse_operations.new_account}}</span>
          </div>
          <div class="status piece">
            <span>{{$t('trade.trade_detail.num')}}</span>
            <span class="center address">{{transactions.parse_operations.fee}}</span>
          </div>
        </div>
        <div
          class="info trade-info"
          v-if="!transactions.parse_operations || (transactions.type !== 'account_create' && transactions.type !== 'call_contract_function' && transactions.type !== 'transfer')"
        >
          <div class="piece status">{{transactions.parse_operations}}</div>
        </div>
      </div>
    </div>
    <Foot></Foot>
  </div>
</template>
<script>
import Header from "../../components/headers.vue";
import Foot from "../../components/footer.vue";
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
      transactions: {}
    };
  },
  mounted() {
    const that = this;
    let trans_id = that.$route.params.trans_id;
    api
      .get(`/query_trans/${trans_id}`, {})
      .then(result => {
        if (result.trans.parse_ops && result.trans.parse_ops.length) {
          that.transactions = result.trans.parse_ops[0];
          that.transactions.trx_id = result.trans.trx_id;
          that.transactions.date = moment(
            new Date(result.trans.parse_ops[0].date)
          ).format("MM/DD/YYYY HH:MMA");
          that.transactions.signatures = result.trans.signatures;
        }
      })
      .catch(err => {
        this.$message.error(err.errmsg);
      });
  },
  methods: {
    queryBlock(block) {
      this.$router.push({
        name: "Block",
        params: { block_height: block }
      });
    },
    onCopy: function(e) {
      this.$message({
        type: "success",
        message: `复制成功`
      });
    },
    queryAddress(address) {
      const that = this;
      api
        .get(`/query_user/${address}`, {})
        .then(result => {
          if (result.user) {
            that.$router.push({
              name: "Address",
              params: { address_name: address }
            });
          } else {
            that.$alert("该地址不可访问", "地址已锁定", {
              confirmButtonText: "确定",
              callback: action => {}
            });
          }
        })
        .catch(err => {
          this.$message.error(err.errmsg);
        });
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
        margin-top: 84px;
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
        height: 180px;
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
          span.blocks {
            cursor: pointer;
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
            width: 46px;
            height: 18px;
            border-radius: 50px;
            border: 1px solid #4990ed;
            color: #4990ed;
            line-height: 18px;
            margin-left: 6px;
            cursor: pointer;
          }
          button:after {
            border: none;
          }
        }
        .height.piece {
          margin-top: 0;
        }
        .address {
          cursor: pointer;
        }
      }
    }
  }
}
@import "../../style/comm.media.less";
</style>