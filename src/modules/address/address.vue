<template>
  <div class="trade block">
    <Header></Header>
    <div class="detail">
      <div class="content">
        <div class="title">{{$t('address.title')}}</div>
        <div class="info">
          <div class="height piece">
            <span>{{$t('address.detail.address')}}</span>
            <span class="center address">{{user.user_name}}</span>
            <button
              type="button"
              v-clipboard:copy="user.user_name"
              v-clipboard:success="onCopy"
            >{{$t('address.trade.copy')}}</button>
          </div>
          <div class="status piece">
            <span>{{$t('address.detail.name')}}</span>
            <span class="center">{{user.user_name}}</span>
          </div>
          <div class="time piece">
            <span>{{$t('address.detail.trade')}}</span>
            <span class="low center">↓{{num && num.to}}</span>
            <span class="high center">↑{{num.from && num.from}}</span>
          </div>
          <div class="hash piece">
            <span>{{$t('address.detail.balance')}}</span>
            <p class="center" v-for="item in counts" :key="item.id">{{item.balance}} {{item.symbol}}</p>
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
          <div class="td th" v-for="item in trans" :key="item.id">
            <div
              :title="item.trx_id"
              class="list cursor"
              @click="queryHash(item.trx_id)"
            >{{item.trx_id}}</div>
            <div class="list">{{(item.result.real_running_time / 1000).toFixed(2)}} seconds</div>
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
          :current-page="pageMarket"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="10"
          layout="prev, pager, next, total"
          :total="trans_count"
          v-if="trans && trans.length"
        ></el-pagination>
      </div>
    </div>
    <!-- <pageination :total="50" :size="size" :page="10" :changge="pageFn" :isUrl="true"></pageination> -->
    <Foot></Foot>
  </div>
</template>
<script>
import Header from "../../components/headers.vue";
import Foot from "../../components/footer.vue";
import api from "../../http/api.js";
export default {
  components: {
    Header,
    Foot
  },
  name: "Address",
  data() {
    return {
      user: {},
      pageMarket: 1,
      num: "",
      trans: [],
      trans_count: 0,
      counts: []
    };
  },
  mounted() {
    const that = this;
    let address_name = that.$route.params.address_name;
    that.queryInfo(address_name);
    //查询地址信息
  },
  methods: {
    queryInfo(address_name) {
      const that = this;
      api
        .get(`/query_user/${address_name}`, {})
        .then(result => {
          that.user = result.user;
        })
        .catch(err => {
          that.$message.error(err.data.errmsg);
        });
      let params = {
        limit: 10,
        page: this.pageMarket
      };
      api.get(`/query_user_account/${address_name}`, {}).then(res => {
        this.counts = res.counts;
      });
      //查询转账信息
      api
        .get(`query_user_block/${address_name}`, params)
        .then(result => {
          that.trans = result.transfer;
          that.trans_count = result.count;
          that.num = result.num || "";
        })
        .catch(err => {
          that.$message.error(err.data.errmsg);
        });
    },
    queryTrade() {},
    onCopy: function(e) {
      this.$message({
        type: "info",
        message: `复制成功`
      });
    },
    queryHash(trans) {
      this.$router.push({ name: "Hash", params: { trans_id: trans } });
    },
    queryAddress(address) {
      const that = this;
      that.$route.params.address_name = address;
      api
        .get(`/query_user/${address}`, {})
        .then(result => {
          if (result.user) {
            // that.$router.replace({
            //   name: "Address",
            //   params: { address_name: address }
            // });
            that.queryInfo(address);
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
      console.log(e);
      this.pageMarket = parseInt(e);
      this.queryInfo(this.$route.params.address_name);
    },
    pageNext() {
      this.pageMarket++;
      this.queryInfo(this.$route.params.address_name);
    },
    pagePrev() {
      this.pageMarket--;
      this.queryInfo(this.$route.params.address_name);
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
          .hash,
          p {
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
        .td:hover {
          background: rgba(246, 246, 252, 1);
          .cursor {
            color: #4990ed;
          }
        }
        .list:nth-of-type(1) {
          width: 30%;
          margin-left: 2.1%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .list:nth-of-type(2) {
          width: 15%;
          margin-left: 4.3%;
        }
        .list:nth-of-type(3) {
          width: 10%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .list:nth-of-type(4) {
          width: 10%;
          margin-left: 5.1%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .list:nth-of-type(5) {
          // width: 84px;
          margin-left: 5%;
        }
      }
    }
  }
}
@import "../../style/comm.media.less";
</style>