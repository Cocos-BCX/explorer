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
          <div class="td th" v-for="(item,index) in trans" :key="index">
            <div class="list">{{item.trx_id}}</div>
            <div class="list">{{item.parse_ops.block_num}}</div>
            <div class="list">{{item.date}}</div>
            <div class="list">{{item.parse_ops.parse_operations.from}}</div>
            <div class="list">{{item.parse_ops.parse_operations.to}}</div>
            <div class="list">{{item.parse_ops.parse_operations.amount}}</div>
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
          :page-size="100"
          layout="prev, pager, next, total"
          :total="total"
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
  name: "HashList",
  data() {
    return {
      block: "",
      pageMarket: 1,
      trans: [],
      trade: [],
      total: 0,
      currentPage: 1,
      params: {}
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
    queryTrade() {
      const that = this;
      let params = {
        limit: 20,
        page: that.pageMarket
      };
      api.get("/query_all_trans", params).then(result => {
        const trans = [];
        result.data.trans.forEach(item => {
          if (item.parse_ops && item.parse_ops.length) {
            let params_item = {
              parse_ops: item.parse_ops[0],
              trx_id: item.trx_id,
              date: moment(new Date()).to(
                moment(new Date(item.parse_ops[0].date))
              ),
              signatures: item.signatures
            };
            trans.push(params_item);
          }
        });
        that.trans = trans;
        console.log(that.trans);
        that.total = result.data.trans_total;
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
  .el-pager li {
    margin: 0;
  }
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
        .td {
          color: #388df4;
          height: 66px;
          .list:nth-of-type(3) {
            color: #333;
          }
        }
        .list:nth-of-type(1) {
          width: 147px;
          margin-left: 25px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .list:nth-of-type(2) {
          width: 63px;
          margin-left: 52px;
        }
        .list:nth-of-type(3) {
          width: 109px;
          margin-left: 61px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .list:nth-of-type(4) {
          width: 229px;
          margin-left: 61px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .list:nth-of-type(5) {
          width: 229px;
          margin-left: 61px;
        }
      }
    }
  }
}
</style>