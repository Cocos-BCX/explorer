<template>
  <div class="block" id="block">
    <Header></Header>
    <div class="detail">
      <div class="content">
        <div class="title" v-if="blocks && blocks.length">{{$t('block.title')}}</div>
        <div class="table" v-if="blocks && blocks.length">
          <div class="th">
            <div class="list">{{$t('block.list.high')}}</div>
            <div class="list">{{$t('block.list.age')}}</div>
            <div class="list">{{$t('block.list.trade')}}</div>
            <div class="list">{{$t('block.list.produced')}}</div>
            <!-- <div class="list">{{$t('block.list.bit')}}</div> -->
          </div>
          <div class="td th" v-for="(item,index) in blocks" :key="index">
            <div class="list">{{item.block_height}}</div>
            <div class="list">{{item.time}}</div>
            <div class="list">{{item.trx_count}}</div>
            <div class="list">{{item.witness_name}}</div>
            <!-- <div class="list">{{item.parse_operations.amount}}</div> -->
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
  name: "BlockList",
  data() {
    return {
      block: "",
      pageMarket: 1,
      blocks: [],
      total: 0,
      currentPage: 1,
      params: {}
    };
  },
  mounted() {
    this.queryBlock();
  },

  methods: {
    handleSizeChange(e) {
      console.log(e);
    },
    handleCurrentChange(e) {
      this.pageMarket = parseInt(e);
      this.queryBlock();
    },
    pageNext() {
      this.pageMarket++;
      this.queryBlock();
    },
    queryBlock() {
      const that = this;
      let params = {
        limit: 20,
        page: that.pageMarket
      };
      api.get("/query_all_block", params).then(result => {
        const blocks = [];
        result.data.blocks.forEach(item => {
          item.time = moment(new Date()).to(moment(new Date(item.time)));
          item.timestamp = moment(new Date()).to(
            moment(new Date(item.timestamp))
          );
          blocks.push(item);
        });
        that.blocks = blocks;
        that.total = result.data.block_height;
      });
    },
    pagePrev() {
      this.pageMarket--;
      this.queryBlock();
    }
  }
};
</script>
<style scoped lang="less" rel="stylesheet/less">
#block {
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
          color: #333;
          height: 66px;
          .list:nth-of-type(1) {
            color: #388df4;
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
          width: 84px;
          margin-left: 61px;
        }
      }
    }
  }
}
</style>