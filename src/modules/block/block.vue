<template>
  <div class="block">
    <Header></Header>
    <div class="detail">
      <div class="content">
        <div class="title">{{$t('block.title')}}</div>
        <div class="info">
          <div class="height piece">
            <span>{{$t('block.detail.high')}}</span>
            <span>{{block.block_height}}</span>
          </div>
          <div class="status piece">
            <span>{{$t('block.detail.status.name')}}</span>
            <span
              class="center padding"
              v-if="!block.witness_signature"
            >{{$t('block.detail.status.padding')}}</span>
            <span
              class="center no-padding"
              v-if="block.witness_signature"
            >{{$t('block.detail.status.enter')}}</span>
          </div>
          <div class="time piece" v-if="block.timestamp">
            <span>{{$t('block.detail.time.name')}}</span>
            <p class="center">
              <span
                v-if="block.timestamp.days"
              >{{block.timestamp.days}}{{$t('block.detail.time.day')}}</span>
              <span
                v-if="block.timestamp.hours"
              >{{block.timestamp.hours}}{{$t('block.detail.time.hour')}}</span>
              <span
                v-if="block.timestamp.minutes"
              >{{block.timestamp.minutes}}{{$t('block.detail.time.min')}}</span>
              {{block.timestamp.seconds}}{{$t('block.detail.time.second')}}
              {{$t('block.detail.time.ago')}}
              ({{block.timestamp.times}})
              {{$t('block.detail.time.trade')}}
            </p>
          </div>
          <div class="hash piece">
            <span>{{$t('block.detail.hash')}}</span>
            <span class="center">{{block.block_id}}</span>
            <button
              type="button"
              v-clipboard:copy="block.block_id"
              v-clipboard:success="onCopy"
            >{{$t('block.detail.copy')}}</button>
          </div>
          <div class="father-hash piece">
            <span>{{$t('block.detail.f_hash')}}</span>
            <span class="center">{{block.previous}}</span>
            <button
              type="button"
              v-clipboard:copy="block.previous"
              v-clipboard:success="onCopy"
            >{{$t('block.detail.copy')}}</button>
          </div>
          <div class="code piece">
            <span>{{$t('block.detail.code')}}</span>
            <span>{{block.transaction_merkle_root}}</span>
            <button
              type="button"
              v-clipboard:copy="block.transaction_merkle_root"
              v-clipboard:success="onCopy"
            >{{$t('block.detail.copy')}}</button>
          </div>
          <div class="trade piece">
            <span>{{$t('block.detail.num')}}</span>
            <span>{{block.trx_count}} transactions</span>
          </div>
          <div class="size piece">
            <span>{{$t('block.detail.size')}}</span>
            <span>0 {{$t('block.detail.bit')}}</span>
          </div>
        </div>
        <div
          class="title"
          v-if="block.transactions && block.transactions.length"
        >{{$t('block.trade.title')}}</div>
        <div class="table" v-if="block.transactions && block.transactions.length">
          <div class="th">
            <div class="list">{{$t('block.trade.hash')}}</div>
            <div class="list">{{$t('block.trade.age')}}</div>
            <div class="list">{{$t('block.trade.from')}}</div>
            <div class="list">{{$t('block.trade.to')}}</div>
            <div class="list">{{$t('block.trade.num')}}</div>
          </div>
          <div class="td th" v-for="(item,index) in transactions" :key="index">
            <div class="list cursor" @click="queryHash(item.trx_id)">{{item.trx_id}}</div>
            <div class="list">{{item.date}}</div>
            <div
              class="list cursor"
              @click="queryAddress(item.parse_operations.from)"
            >{{item.parse_operations.from}}</div>
            <div
              class="list cursor"
              @click="queryAddress(item.parse_operations.to)"
            >{{item.parse_operations.to}}</div>
            <div class="list">{{item.parse_operations.amount}}</div>
          </div>
        </div>
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          @prev-click="pagePrev"
          @next-click="pageNext"
          :current-page="currentPage"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="20"
          layout="prev, pager, next, total"
          :total="trans_length"
          v-if="block.transactions && block.transactions.length"
        ></el-pagination>
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
  name: "Block",
  data() {
    return {
      block: "",
      pageMarket: 1,
      transactions: [],
      total: 0,
      currentPage: 1,
      trans_length: 0,
      dialogVisible: false
    };
  },
  mounted() {
    const that = this;
    let block_height = that.$route.params.block_height;
    api
      .get(`/query_block/${block_height}`, {})
      .then(result => {
        const data = result.block;
        data.timestamp = util(data.timestamp);
        // data.transaction_merkle_root = parseInt(data.transaction_merkle_root,2);
        that.block = data;
        if (data.transactions && data.transactions.length) {
          that.queryTrade(block_height);
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    onCopy: function(e) {
      this.$message({
        type: "info",
        message: `复制成功`
      });
    },
    queryHash(trans) {
      this.$router.push({ name: "Hash", params: { trans_id: trans } });
    },
    queryTrade(block_height) {
      const that = this;
      let params = {
        limit: 20,
        page: this.pageMarket
      };
      console.log(block_height);
      api
        .get(`/query_tranfer_block/${block_height}`, params)
        .then(result => {
          // result.transactions.forEach(item => {
          // if (item.parse_ops && item.parse_ops.length) {
          //   item.parse_ops[0].parse_operations.trx_id = item.trx_id;
          //   if (item.parse_ops[0].type === "transfer") {
          //     item.parse_ops[0].parse_operations.date = moment(new Date()).to(
          //       moment(new Date(item.parse_ops[0].date))
          //     );
          //     that.transactions.push(item.parse_ops[0]);
          //   }
          //   that.trans_length = result.trans_length;
          // }
          // });
          const transactions = [];
          result.transfer.forEach(item => {
            let params = {
              parse_operations: item.parse_operations,
              trx_id: item.trx_id,
              date: moment(new Date()).to(moment(new Date(item.date)))
              // signatures: item.signatures
            };
            transactions.push(params);
          });
          that.transactions = transactions;
        })
        .catch(err => {
          this.$message.error(err.errmsg);
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
    },
    handleSizeChange(e) {},
    handleCurrentChange(e) {
      this.pageMarket = parseInt(e);
      this.queryTrade();
    },
    pageNext() {
      this.pageMarket++;
      this.queryTrade();
    },
    pagePrev() {
      this.pageMarket--;
      this.queryTrade();
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
    max-height: 1674px;
    margin-bottom: 117px;
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
        .status .padding {
          background: rgba(223, 223, 230, 1);
          font-size: 18px;
          color: #666;
          padding: 0 4px;
        }
        .center.no-padding {
          background: #388df4;
          color: #fff;
          font-size: 18px;
          padding: 0 4px;
        }
        .piece {
          display: flex;
          align-items: flex-start;
          margin-top: 14px;
          span:nth-of-type(1) {
            width: 122px;
            height: 25px;
            font-size: 18px;
            color: rgba(152, 152, 152, 1);
          }
          .center.no-padding {
            color: #fff;
          }
          span:nth-of-type(2) {
            color: #333;
            // margin-left: 10px;
            // width: 700px;
            font-size: 18px;
          }
          p.center {
            color: #333;
            // width: 700px;
            font-size: 18px;
            span {
              margin: 0;
              color: #333;
            }
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
        .td:hover {
          background: rgba(246, 246, 252, 1);
          .cursor {
            color: #4990ed;
          }
        }
        .list:nth-of-type(1) {
          width: 220px;
          margin-left: 25px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .list:nth-of-type(2) {
          width: 118px;
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
          margin-left: 61px;
        }
      }
    }
  }
}
@media (min-width: 1200px) and (max-width: 1440px) {
  .block {
    width: 100%;
    .detail {
      width: 1200px;
      margin: 0 auto;
      max-height: 1674px;
      margin-bottom: 117px;
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
          .status .padding {
            background: rgba(223, 223, 230, 1);
            font-size: 18px;
            color: #666;
            padding: 0 4px;
          }
          .center.no-padding {
            background: #388df4;
            color: #fff;
            font-size: 18px;
            padding: 0 4px;
          }
          .piece {
            display: flex;
            align-items: flex-start;
            margin-top: 14px;
            span:nth-of-type(1) {
              width: 122px;
              height: 25px;
              font-size: 18px;
              color: rgba(152, 152, 152, 1);
            }
            .center.no-padding {
              color: #fff;
            }
            span:nth-of-type(2) {
              color: #333;
              // margin-left: 10px;
              // width: 700px;
              font-size: 18px;
            }
            p.center {
              color: #333;
              // width: 700px;
              font-size: 18px;
              span {
                margin: 0;
                color: #333;
              }
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
          .td:hover {
            background: rgba(246, 246, 252, 1);
            .cursor {
              color: #4990ed;
            }
          }
          .list:nth-of-type(1) {
            width: 18.3%;
            margin-left: 2.1%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .list:nth-of-type(2) {
            width: 9.8%;
            margin-left: 4.3%;
          }
          .list:nth-of-type(3) {
            width: 221px;
            margin-left: 61px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .list:nth-of-type(4) {
            width: 18.41;
            margin-left: 5%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .list:nth-of-type(5) {
            margin-left: 5%;
          }
        }
      }
    }
  }
}
@import "../../style/comm.media.less";
</style>