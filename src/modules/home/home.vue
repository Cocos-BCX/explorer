<template>
  <div class="home">
    <Headers></Headers>
    <div class="position">
      <div class="search-box">
        <div class="input-box">
          <input
            :placeholder="$t('home.search')"
            v-focus="true"
            v-model="search"
            @keyup.enter="searchInfo()"
          >
        </div>
        <div class="btn" @click="searchInfo()">
          <img v-lazy="'/static/image/serach.png'" alt>
        </div>
      </div>
    </div>
    <div class="content-box-total">
      <div class="count">
        <div class="num">
          <img src="https://jdi.cocosbcx.net/image/explorer/jiedian.png" alt>
          <div>{{count.nodes || 0}}</div>
          <span>{{$t('home.banner.node')}}</span>
        </div>
        <div class="num block">
          <img src="https://jdi.cocosbcx.net/image/explorer/gaodu.png" alt>
          <div @click="moreBlock()">
            <countTo
              :startVal="startVal"
              :endVal="blocks.length && blocks[0].block_height"
              :duration="3000"
            ></countTo>
          </div>
          <span @click="moreBlock()">{{$t('home.banner.block')}}</span>
        </div>
        <div class="num">
          <img src="https://jdi.cocosbcx.net/image/explorer/hour.png" alt>
          <div>{{count.trans || 0}}</div>
          <span>{{$t('home.banner.trade')}}</span>
        </div>
        <div class="num">
          <img src="https://jdi.cocosbcx.net/image/explorer/zhanghu.png" alt>
          <div>{{count.user_count || 0}}</div>
          <span>{{$t('home.banner.count')}}</span>
        </div>
        <div class="num">
          <img src="https://jdi.cocosbcx.net/image/explorer/tps.png" alt>
          <div>{{totals.tps || 0 }}/{{totals.max || 0}}</div>
          <span>{{$t('home.banner.tps')}}</span>
        </div>
      </div>
    </div>

    <div class="body">
      <div class="content-box">
        <div class="chart">
          <!-- <div class="child-chart trade-chart">
            <Highcharts :options="options" ref="tradeCharts"></Highcharts>
          </div>
          <div class="child-chart address-chart">
            <Highcharts :options="address_options" ref="addressCharts"></Highcharts>
          </div>-->
        </div>
        <div class="block_trade">
          <div class="block">
            <div class="title">
              <span>{{$t('home.list.block.title')}}</span>
              <div class="more" @click="moreBlock()">{{$t('home.list.block.more')}}</div>
            </div>
            <div class="block-content">
              <loading :height="height" v-if="!blocks.length"></loading>
              <div class="block-piece" v-for="block in blocks" :key="block.id">
                <div class="block-id" @click="queryBlock(block.block_height)">
                  <p>{{$t('home.list.block.block_detail.block')}}{{block.block_height}}</p>
                  <p>>{{block.time}}</p>
                  <!-- {{$t('home.list.block.block_detail.second')}} -->
                </div>
                <div class="block-detail">
                  <p class="address" @click="queryAddress(block.witness_name)">
                    {{$t('home.list.block.block_detail.produced')}}
                    <span>{{block.witness_name}}</span>
                  </p>
                  <p class="trade-num" @click="queryBlock(block.block_height)">
                    <span>{{block.trx_count}} {{$t('home.list.block.block_detail.trade')}}</span>
                    {{$t('home.list.block.block_detail.by')}}{{block.time}}
                  </p>
                  <p class="award">{{$t('home.list.block.block_detail.reward')}} 10 COCOS</p>
                </div>
              </div>
            </div>
          </div>
          <div class="block trade">
            <div class="title">
              <span>{{$t('home.list.trade.title')}}</span>
              <div class="more" @click="moreTrade()">{{$t('home.list.trade.more')}}</div>
            </div>
            <div class="block-content">
              <loading :height="height" v-if="!trans.length"></loading>
              <div class="block-piece trade-piece" v-for="tran in trans" :key="tran.id">
                <div class="trade-info">
                  <div class="trade-id" @click="queryHash(tran.trx_id)">
                    <div>{{$t('home.list.trade.trade_detail.trade')}}</div>
                    <span>{{tran.trx_id}}</span>
                  </div>
                  <div
                    class="trade-address"
                    v-if="tran.parse_ops && tran.parse_ops[0].type === 'transfer'"
                  >
                    <div>{{$t('home.list.trade.trade_detail.from')}}</div>
                    <span
                      @click="queryAddress(tran.parse_operations.from)"
                    >{{tran.parse_operations.from}}</span>
                    <span class="cut"></span>
                    <div>{{$t('home.list.trade.trade_detail.to')}}</div>
                    <span
                      @click="queryAddress(tran.parse_operations.to)"
                    >{{tran.parse_operations.to}}</span>
                  </div>
                  <div
                    class="trade-num"
                    v-if="tran.parse_ops && tran.parse_ops[0].type === 'transfer'"
                  >{{$t('home.list.trade.trade_detail.num')}} {{tran.parse_operations.amount}}</div>
                  <div
                    class="trade-address"
                    v-if="tran.parse_ops && tran.parse_ops[0].type === 'call_contract_function'"
                  >
                    <div>{{$t('home.list.trade.trade_detail.from')}}</div>
                    <span
                      @click="queryAddress(tran.parse_operations.caller)"
                    >{{tran.parse_operations.caller}}</span>
                    <span class="cut"></span>
                    <div>{{$t('trade.trade_detail.contract')}}</div>
                    <span class="black">{{tran.parse_operations.contract_name}}</span>
                  </div>
                  <div
                    class="trade-num"
                    v-if="tran.parse_ops && tran.parse_ops[0].type === 'call_contract_function'"
                  >{{$t('home.list.trade.trade_detail.num')}} {{tran.parse_operations.fee}}</div>
                  <div
                    class="trade-address"
                    v-if="tran.parse_ops && tran.parse_ops[0].type === 'account_create'"
                  >
                    <div>{{$t('trade.trade_detail.create')}}</div>
                    <span
                      @click="queryAddress(tran.parse_operations.registrar)"
                    >{{tran.parse_operations.registrar}}</span>
                    <span class="cut"></span>
                    <div>{{$t('trade.trade_detail.account')}}</div>
                    <span
                      @click="queryAddress(tran.parse_operations.new_account)"
                    >{{tran.parse_operations.new_account}}</span>
                  </div>
                  <div
                    class="trade-num"
                    v-if="tran.parse_ops && tran.parse_ops[0].type === 'account_create'"
                  >{{$t('home.list.trade.trade_detail.num')}} {{tran.parse_operations.fee}}</div>
                  <div
                    class="trade-address"
                    v-if="!tran.parse_ops || (tran.parse_ops[0].type !== 'account_create' && tran.parse_ops[0].type !== 'call_contract_function' && tran.parse_ops[0].type !== 'transfer')"
                  >
                    <!-- <div>{{tran.parse_operations}}</div> -->
                  </div>
                </div>
                <div class="trade-time">>{{tran.date}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Foot></Foot>
  </div>
</template>
<script>
import api from "../../http/api.js";
import VueI18n from "vue-i18n";
// import Vue from "vue";
import Foot from "../../components/footer";
import Highcharts from "../../components/hightcart";
import { throws } from "assert";
import Dropdown from "../../components/dropdown";
import Loading from "../../components/loading";
import axios from "axios";
import moment from "moment";
import countTo from "vue-count-to";
import Headers from "../../components/headers";
import { mapState, mapMutations } from "vuex";
// import { setTimeout, clearTimeout, clearInterval } from "timers";
Vue.use(VueI18n);
export default {
  name: "home",
  components: {
    Highcharts,
    Foot,
    Dropdown,
    Loading,
    countTo,
    Headers
  },
  directives: {
    focus: {
      inserted: function(el, { value }) {
        if (value) {
          el.focus();
        }
      }
    }
  },
  data: function() {
    return {
      pageMarket: 1,
      myInterval: null,
      blocks: [],
      trans: [],
      count: {},
      totals: {},
      height: "720px",
      select: [{ name: "English", type: "en" }, { name: "中文", type: "cn" }],
      style: "white",
      selected: { name: "中文", type: "cn" },
      search: "",
      startVal: 0,
      address_options: {
        title: ""
      },
      block_right: false,
      trade_right: false,
      count_right: false,
      options: {
        title: ""
      }
    };
  },
  created() {
    const that = this;
    let params = {
      limit: 10,
      page: that.pageMarket
    };
    this.getCount();
    this.queryBlockList();
    this.queryTransList();
    that.timeUpdate();
  },
  computed: {
    ...mapState({
      language: state => state.app.language,
      defaults: state => state.app.defaults
    })
    // ...mapMutations({ setLanguage: 'updateOption' })
  },
  mounted() {
    api
      .get("/chart", {})
      .then(result => {
        let trade_categories = [];
        let trade_series = [
          {
            data: []
          }
        ];
        result.counts.forEach(item => {
          trade_categories.push(item.date);
          trade_series[0].data.push(item.count);
        });
        that.options = {
          categories: trade_categories,
          series: trade_series,
          yCompany: "transaction",
          title: that.defaults.trade
        };
        let address_categories = [];
        let address_series = [
          {
            data: []
          }
        ];
        result.address.forEach(item => {
          address_categories.push(item.date);
          address_series[0].data.push(item.count);
        });
        that.address_options = {
          categories: address_categories,
          series: address_series,
          yCompany: "address",
          title: that.defaults.address
        };
      })
      .catch(err => {
        this.$message.error(err.data.errmsg);
      });
    const that = this;
    that.search = localStorage.getItem("search");
  },
  updated() {},
  destroyed() {
    clearInterval(this.myInterval);
  },
  methods: {
    timeUpdate() {
      const that = this;
      clearInterval(that.myInterval);
      that.myInterval = setInterval(function() {
        if (that.block_right) {
          that.queryBlockList();
        }
        if (that.count_right) {
          that.getCount();
        }
        if (that.trade_right) {
          that.queryTransList();
        }
      }, 4000);
    },
    queryBlockList() {
      const that = this;
      that.block_right = false;
      let params = {
        limit: 10,
        page: this.pageMarket
      };
      api
        .get("/query_list_block", params)
        .then(result => {
          that.block_right = true;
          const blocks = [];
          result.blocks.forEach(item => {
            item.time = moment(new Date()).to(moment(new Date(item.time)));
            item.timestamp = moment(new Date()).to(
              moment(new Date(item.timestamp))
            );
            blocks.push(item);
          });
          that.blocks = blocks;
        })
        .catch(err => {
          that.block_right = true;
          this.$message.error(err.data.errmsg);
        });
    },
    queryTransList() {
      const that = this;
      that.trade_right = false;
      let params = {
        limit: 10,
        page: this.pageMarket
      };
      api
        .get("/query_list_trans", params)
        .then(result => {
          const trans = [];
          that.trade_right = true;
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
          that.trade_right = true;
          this.$message.error(err.data.errmsg);
        });
    },
    getCount() {
      const that = this;
      that.count_right = false;
      let counts = localStorage.getItem("counts");
      if (counts) {
        that.startVal = Number(counts) - 100;
      }
      api
        .get("/query_count", {})
        .then(result => {
          that.count_right = true;
          that.count = result.info;
          that.totals = result.info.counts;
          localStorage.setItem("counts", result.info.block_height);
        })
        .catch(err => {
          that.count_right = true;
          this.$message.error(err.data.errmsg);
        });
    },
    moreBlock() {
      this.$router.push({ name: "BlockList" });
    },
    moreTrade() {
      this.$router.push({ name: "HashList" });
    },
    queryHash(trans) {
      this.$router.push({ name: "Hash", params: { trans_id: trans } });
    },
    queryBlock(block) {
      this.$router.push({ name: "Block", params: { block_height: block } });
    },
    methodToRunOnSelect(payload) {
      this.selected = payload;
    },
    mySetInterval(fn, millisec) {},
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
          that.$message.error(err.data.errmsg);
        });
    },
    searchInfo() {
      const that = this;
      let url;
      if (/^[0-9]*$/.test(that.search)) {
        url = `/query_block/${that.search}`;
      } else if (/^.{25,40}$/.test(that.search)) {
        url = `/query_trans/${that.search}`;
      } else {
        url = `/query_user/${that.search}`;
      }
      api
        .get(url, {})
        .then(result => {
          if (result.block) {
            that.$router.push({
              name: "Block",
              params: { block_height: result.block.block_height }
            });
          } else if (result.trans) {
            that.$router.push({
              name: "Hash",
              params: { trans_id: result.trans.trx_id }
            });
          } else if (result.user) {
            that.$router.push({
              name: "Address",
              params: { address_name: result.user.user_name }
            });
          }
        })
        .catch(err => {
          that.$message.error(err.data.errmsg);
        });
    }
  }
};
</script>
<style scoped lang="less" rel="stylesheet/less">
.home {
  position: relative;
}
.position {
  width: 100%;
  position: absolute;
  top: 252px;
  .search-box {
    margin: 0 auto;
    width: 700px;
    height: 60px;
    display: flex;
    align-items: center;
    .input-box {
      background: rgba(255, 255, 255, 1);
      width: 640px;
      height: 60px;
      display: flex;
      align-items: center;
      transform: skewX(-30deg);
    }
    input {
      width: 530px;
      border: none;
      background: rgba(255, 255, 255, 1);
      padding-left: 30px;
      margin-left: 5px;
      font-size: 16px;
      transform: skewX(30deg);
    }
    input:focus {
      outline: none;
    }
    .btn {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 110px;
      height: 60px;
      margin-left: 17px;
      transform: skewX(-30deg);
      background: #2ad9fe;
      img {
        transform: skewX(30deg);
        height: 20px;
        width: 20px;
      }
    }
  }
}
.content-box-total {
  position: absolute;
  width: 100%;
  height: 224px;
  top: 422px;
  .count {
    background: white;
    display: flex;
    height: 224px;
    width: 1200px;
    margin: 0 auto;
    opacity: 1;
    .block.num {
      cursor: pointer;
    }
    .num {
      width: 240px;
      display: flex;
      flex-direction: column;
      align-items: center;
      img {
        margin: 45px 0 24px;
      }
      div {
        font-size: 33px;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 45px;
        span {
          font-size: 33px;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
          line-height: 45px;
        }
      }
      span {
        height: 20px;
        font-size: 18px;
        font-weight: 400;
        color: rgba(152, 152, 152, 1);
        line-height: 21px;
      }
    }
  }
}

// .banner {
//   height: 354px;
//   width: 100%;
//   // background: cadetblue;
//   background: url("/static/image/banner.png") center no-repeat;
//   filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src='bg-login.png',sizingMethod='scale');
//   background-size: cover;
//   .content-box {
//     width: 1440px;
//     margin: 0 auto;
//     height: 354px;
//     // background: linear-gradient(
//     //     180deg,
//     //     rgba(121, 57, 248, 1) 0%,
//     //     rgba(47, 81, 255, 1) 100%
//     // );
//     // opacity: 0.0551;
//     // background: red;
//     .content {
//       height: 354px;
//       margin: 0 auto;
//       width: 1200px;
//       display: flex;
//       flex-direction: column;
//       // height: 100px;
//       .logo {
//         cursor: pointer;
//         float: left;
//         margin-top: 30px;
//         width: 132px;
//         height: 58px;
//         img {
//           width: 132px;
//           height: 58px;
//           object-fit: cover;
//         }
//       }
//       .language {
//         cursor: pointer;
//         float: right;
//         width: 90px;
//         height: 27px;
//         margin-top: 66px;
//         border-radius: 3px;
//         opacity: 0.5;
//         border: 1px solid;
//         display: flex;
//         align-items: center;
//         justify-content: center;
//         font-size: 12px;
//         color: #fff;
//         .icon {
//           height: 9px;
//           width: 12px;
//           margin-left: 3px;
//         }
//       }
//       .banner-bottom {
//         width: 1200px;
//         height: 40px;
//         margin-top: 90px;
//         background: white;
//       }
//     }
//   }
// }
.body {
  width: 100%;
  padding-bottom: 20px;
  .content-box {
    width: 1200px;
    padding-bottom: 60px;
    // height: 1018px;
    margin: 0 auto;
    // background: linear-gradient(
    //     180deg,
    //     rgba(121, 57, 248, 0.55) 0%,
    //     rgba(47, 81, 255, 0.55) 100%
    // );
    background-color: rgba(47, 81, 255, 0.055);
    display: flex;
    flex-direction: column;
    .chart {
      width: 1200px;
      margin: 100px auto 0;
      display: flex;
      justify-content: space-between;
      .child-chart {
        // height: 410px;
        width: 590px;
        background: white;
      }
    }
  }
  .block_trade {
    width: 1200px;
    margin: 24px auto 0;
    height: 750px;
    display: flex;
    justify-content: center;
    .title {
      width: 100%;
      height: 26px;
      font-size: 18px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        font-size: 20px;
        color: #333;
      }
      .more {
        font-size: 14px;
        color: rgba(56, 141, 244, 1);
        margin-right: 21px;
        cursor: pointer;
      }
    }
    .block::-webkit-scrollbar {
      width: 0 !important;
    }
    .block {
      width: 569px;
      padding: 33px 0 0 20px;
      background: rgba(255, 255, 255, 1);
      display: flex;
      flex-direction: column;
      .block-content {
        height: 720px;
        overflow-y: scroll;
        // margin-top: 16px;
      }
      .block-piece {
        padding-top: 18px;
        height: 92px;
        border-bottom: 1px solid rgba(224, 224, 224, 1);
        display: flex;
        .block-id {
          height: 72px;
          width: 135px;
          font-size: 14px;
          background: rgba(246, 246, 252, 1);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          p:nth-of-type(2) {
            text-align: center;
          }
        }
        .block-detail {
          margin-left: 18px;
          display: flex;
          align-items: baseline;
          font-size: 14px;
          height: 72px;
          flex-direction: column;
          p:nth-of-type(2) {
            margin-top: 4px;
          }
          p:nth-of-type(3) {
            margin-top: 4px;
          }
          span {
            color: rgba(56, 141, 244, 1);
            cursor: pointer;
          }
        }
      }
    }
    .trade {
      margin-left: 21px;
      .trade-piece {
        display: flex;
        justify-content: space-between;
      }
      .trade-info {
        display: flex;
        flex-direction: column;
        font-size: 14px;
        span {
          text-decoration: none;
          color: rgba(56, 141, 244, 1);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 70px;
          margin-left: 4px;
          cursor: pointer;
        }
        .trade-address {
          display: flex;
          margin-top: 4px;
          div {
            width: 50px;
          }
        }
        .cut {
          height: 20px;
          width: 24px;
        }
        .trade-id {
          display: flex;
          margin-top: 4px;
          align-items: center;
          span {
            margin-left: 4px;
            text-decoration: none;
            color: rgba(56, 141, 244, 1);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            width: 180px;
            cursor: pointer;
            display: block;
          }
        }
        .trade-num {
          margin-top: 4px;
        }
      }
      .trade-time {
        font-size: 14px;
        font-weight: 400;
        margin-right: 22px;
        display: flex;
        align-items: center;
        color: rgba(152, 152, 152, 1);
      }
    }
  }
}
@import "../../style/media.less";
</style>

