<template>
  <div class="block">
    <Header></Header>
    <div class="detail">
      <div class="content">
        <div class="title" v-if="trans && trans.length">{{$t('trade.title')}}</div>
        <div class="table" v-if="trans && trans.length">
          <div class="th">
            <div class="list">{{$t('trade.list.hash')}}</div>
            <div class="list">{{$t('trade.list.block')}}</div>
            <div class="list">{{$t('trade.list.time')}}</div>
            <div class="list">{{$t('trade.list.from')}}</div>
            <div class="list">{{$t('trade.list.to')}}</div>
            <div class="list">{{$t('trade.list.count')}}</div>
          </div>
          <div v-for="(item,index) in trans" :key="index">
            <div
              class="td th"
              v-if="item.parse_ops.length && item.parse_ops[0].type === 'transfer'"
            >
              <div
                :title="item.trx_id"
                class="list cursor"
                @click="queryHash(item.trx_id)"
              >{{item.trx_id}}</div>
              <div class="list cursor" @click="queryBlock(item.block_num)">{{item.block_num}}</div>
              <div class="list">{{item.date}}</div>
              <div
                v-if="item.parse_operations.from"
                class="list cursor"
                @click="queryAddress(item.parse_operations.from)"
              >{{item.parse_operations.from}}</div>
              <div
                v-if="item.parse_operations.to"
                class="list cursor"
                @click="queryAddress(item.parse_operations.to)"
              >{{item.parse_operations.to}}</div>
              <div class="list" v-if="item.parse_operations.amount">{{item.parse_operations.amount}}</div>
            </div>
            <div
              class="td th"
              v-if="item.parse_ops.length && item.parse_ops[0].type === 'call_contract_function'"
            >
              <div
                :title="item.trx_id"
                class="list cursor"
                @click="queryHash(item.trx_id)"
              >{{item.trx_id}}</div>
              <div class="list cursor" @click="queryBlock(item.block_num)">{{item.block_num}}</div>
              <div class="list">{{item.date}}</div>
              <div
                v-if="item.parse_operations.caller"
                class="list cursor"
                @click="queryAddress(item.parse_operations.caller)"
              >{{item.parse_operations.caller}}</div>
              <div class="list black">{{item.parse_operations.contract_name}}</div>
              <div class="list" v-if="item.parse_operations.fee">{{item.parse_operations.fee}}</div>
            </div>
            <div
              class="td th"
              v-if="item.parse_ops.length && item.parse_ops[0].type === 'account_create'"
            >
              <div
                :title="item.trx_id"
                class="list cursor"
                @click="queryHash(item.trx_id)"
              >{{item.trx_id}}</div>
              <div class="list cursor" @click="queryBlock(item.block_num)">{{item.block_num}}</div>
              <div class="list">{{item.date}}</div>
              <div
                v-if="item.parse_operations.registrar"
                class="list"
              >{{item.parse_operations.registrar}}</div>
              <div
                class="list cursor"
                @click="queryAddress(item.parse_operations.new_account)"
              >{{item.parse_operations.new_account}}</div>
              <div class="list" v-if="item.parse_operations.fee">{{item.parse_operations.fee}}</div>
            </div>
            <div
              class="td th"
              v-if="!item.parse_ops.length || (item.parse_ops[0].type !== 'transfer' && item.parse_ops[0].type !== 'account_create' && item.parse_ops[0].type !== 'call_contract_function')"
            >
              <div
                :title="item.trx_id"
                class="list cursor"
                @click="queryHash(item.trx_id)"
              >{{item.trx_id}}</div>
              <div class="list cursor" @click="queryBlock(item.block_num)">{{item.block_num}}</div>
              <div class="list">{{item.date}}</div>
              <!-- <div
                v-if="item.parse_operations.new_account"
                class="list cursor"
                @click="queryAddress(item.parse_operations.new_account)"
              >{{item.parse_operations.new_account}}</div>
              <div class="list">{{item.parse_operations.registrar}}</div>
              <div class="list" v-if="item.parse_operations.fee">{{item.parse_operations.fee}}</div>-->
            </div>
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
          :total="total"
        ></el-pagination>
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
  name: "HashList",
  data() {
    return {
      block: "",
      pageMarket: 1,
      trans: [],
      trade: [],
      total: 0,
      currentPage: 1
      // params: {}
    };
  },
  mounted() {
    this.queryTrade();
  },

  methods: {
    handleSizeChange(e) {
      console.log(e);
    },
    handleCurrentChange(e) {
      this.pageMarket = parseInt(e);
      this.queryTrade();
    },
    pageNext() {
      this.pageMarket++;
      this.queryTrade();
    },
    queryHash(trans) {
      this.$router.push({ name: "Hash", params: { trans_id: trans } });
    },
    queryBlock(block) {
      this.$router.push({ name: "Block", params: { block_height: block } });
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
          this.$message.error(err.errmsg || err);
        });
    },
    queryTrade() {
      const that = this;
      let params = {
        limit: 20,
        page: that.pageMarket
      };
      api
        .get("/query_all_trans", params)
        .then(result => {
          //   const trans = [];
          //   result.trans.forEach(item => {
          //     if (item.parse_ops && item.parse_ops.length) {
          //       let params_item = {
          //         parse_ops: item.parse_ops[0],
          //         trx_id: item.trx_id,
          //         date: moment(new Date()).to(
          //           moment(new Date(item.parse_ops[0].date))
          //         ),
          //         signatures: item.signatures
          //       };
          //       trans.push(params_item);
          //     }
          //   });
          //   that.trans = trans;
          //   that.total = result.trans_total;
          that.total = result.count;
          const trans = [];
          result.transfer.forEach(item => {
            let option;
            if (item.parse_ops.length) {
              option = item.parse_ops[0];
            }
            let list = {
              block_num: option ? option.block_num : item.block,
              parse_ops: item.parse_ops,
              parse_operations: option ? option.parse_operations : [],
              trx_id: item.trx_id,
              date: option
                ? moment(new Date()).to(moment(new Date(option.date)))
                : ""
              // signatures: item.signatures
            };
            trans.push(list);
          });
          that.trans = trans;
        })
        .catch(err => {
          this.$message.error(err.errmsg || err);
        });
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
        .td:hover {
          background: rgba(246, 246, 252, 1);
        }
        .td {
          color: #388df4;
          height: 66px;
          .list:nth-of-type(3) {
            color: #333;
          }
        }
        .cursor {
          cursor: pointer;
        }
        .list:nth-of-type(1) {
          width: 24%;
          margin-left: 2%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .list:nth-of-type(2) {
          width: 5.25%;
          margin-left: 4.3%;
        }
        .list:nth-of-type(3) {
          width: 9%;
          margin-left: 5%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .list:nth-of-type(4) {
          width: 10%;
          margin-left: 5%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .list:nth-of-type(5) {
          width: 19%;
          margin-left: 5%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}
@import "../../style/comm.media.less";
</style>