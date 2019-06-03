<template>
  <div class="block">
    <Header></Header>
    <div class="detail">
      <div class="content">
        <div class="title" v-if="blocks && blocks.length">{{$t('block.title')}}</div>
        <div class="table" v-if="blocks && blocks.length">
          <div class="th">
            <div class="list click">{{$t('block.list.high')}}</div>
            <!-- <div class="list">{{$t('block.list.age')}}</div> -->
            <div class="list">{{$t('block.list.trade')}}</div>
            <div class="list click">{{$t('block.list.produced')}}</div>
            <!-- <div class="list">{{$t('block.list.bit')}}</div> -->
          </div>
          <div class="td th" v-for="(item,index) in blocks" :key="index">
            <div class="list click" @click="queryItemBlock(item.block_height)">{{item.block_height}}</div>
            <!-- <div class="list">{{item.time}}</div> -->
            <div class="list">{{item.trx_count}}</div>
            <div
              class="list click"
              @click="queryItemAddress(item.witness_name)"
            >{{item.witness_name}}</div>
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
    queryBlock() {
      const that = this;
      let params = {
        limit: 20,
        page: that.pageMarket
      };
      api
        .get("/query_all_block", params)
        .then(result => {
          const blocks = [];
          result.blocks.forEach(item => {
            item.time = moment(new Date()).to(moment(new Date(item.time)));
            item.timestamp = moment(new Date()).to(
              moment(new Date(item.timestamp))
            );
            blocks.push(item);
          });
          that.blocks = blocks;
          that.total = result.block_height;
        })
        .catch(err => {
          this.$message.error(err.errmsg);
        });
    },
    handleSizeChange(e) {
      console.log(e);
    },
    queryItemBlock(block) {
      this.$router.push({ name: "Block", params: { block_height: block } });
    },
    handleCurrentChange(e) {
      this.pageMarket = parseInt(e);
      this.queryBlock();
    },
    pageNext() {
      this.pageMarket++;
      this.queryBlock();
    },
    pagePrev() {
      this.pageMarket--;
      this.queryBlock();
    },
    queryItemAddress(address) {
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
          .click {
            cursor: pointer;
          }
        }
        .td:hover {
          background: rgba(246, 246, 252, 1);
        }
        .td {
          color: #333;
          height: 66px;
          .list:nth-of-type(1) {
            color: #388df4;
          }
        }
        .list:nth-of-type(1) {
          width: 20%;
          margin-left: 10%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .list:nth-of-type(2) {
          width: 15%;
          margin-left: 5%;
        }
        .list:nth-of-type(3) {
          width: 12%;
          margin-left: 9%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .list:nth-of-type(4) {
          width: 25%;
          margin-left: 5%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .list:nth-of-type(5) {
          width: 19%;
          margin-left: 5%;
        }
      }
    }
  }
}
@import "../../style/comm.media.less";
</style>