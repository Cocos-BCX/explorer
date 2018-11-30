<template>
  <div>
    <div class="banner">
      <div class="content-box">
        <div class="content">
          <div>
            <div class="logo">
              <img v-lazy="'/static/image/logo1.png'" alt>
            </div>
            <dropdown
              :options="select"
              :styles="style"
              :selected="selected"
              updateOption="methodToRunOnSelect"
            ></dropdown>
          </div>
          <div class="search-box">
            <input :placeholder="$t('home.search')" v-model="search">
            <div class="btn" @click="searchInfo()">
              <img v-lazy="'/static/image/search.png'" alt>
            </div>
          </div>
          <div class="banner-bottom"></div>
        </div>
      </div>
    </div>
    <div class="body">
      <div class="content-box">
        <div class="count">
          <div class="num">
            <div>{{count.nodes}}</div>
            <span>{{$t('home.banner.node')}}</span>
          </div>
          <div class="num">
            <div>{{count.block_height}}</div>
            <span>{{$t('home.banner.block')}}</span>
          </div>
          <div class="num">
            <div>{{count.trans}}</div>
            <span>{{$t('home.banner.trade')}}</span>
          </div>
          <div class="num">
            <div>{{count.user_count}}</div>
            <span>{{$t('home.banner.count')}}</span>
          </div>
          <div class="num">
            <div>1231231</div>
            <span>{{$t('home.banner.tps')}}</span>
          </div>
        </div>
        <div class="chart">
          <div class="child-chart trade-chart">
            <Highcharts :options="options"></Highcharts>
          </div>
          <div class="child-chart address-chart">
            <Highcharts :options="options"></Highcharts>
          </div>
        </div>
        <div class="block_trade">
          <div class="block">
            <div class="title">
              <div class="title">
                <span>{{$t('home.list.block.title')}}</span>
                <div @click="moreBlock()">{{$t('home.list.block.more')}}</div>
              </div>
            </div>
            <div class="block-content">
              <div class="block-piece" v-for="block in blocks" :key="block.block_height">
                <div class="block-id" @click="queryBlock(block.block_height)">
                  <p>{{$t('home.list.block.block_detail.block')}}{{block.block_height}}</p>
                  <p>>{{block.time}}</p>
                  <!-- {{$t('home.list.block.block_detail.second')}} -->
                </div>
                <div class="block-detail">
                  <p class="address">
                    {{$t('home.list.block.block_detail.produced')}}
                    <span>{{block.witness_name}}</span>
                  </p>
                  <p class="trade-num">
                    <span>{{block.trx_count}}{{$t('home.list.block.block_detail.trade')}}</span>
                    {{$t('home.list.block.block_detail.by')}}{{block.timestamp}}{{$t('home.list.block.block_detail.time')}}
                  </p>
                  <p class="award">{{$t('home.list.block.block_detail.reward')}} 0 COCOS</p>
                </div>
              </div>
            </div>
          </div>
          <div class="block trade">
            <div class="title">
              <span>{{$t('home.list.trade.title')}}</span>
              <div @click="moreTrade()">{{$t('home.list.trade.more')}}</div>
            </div>
            <div class="block-content">
              <div class="block-piece trade-piece" v-for="tran in trans" :key="tran.trx_id">
                <div class="trade-info">
                  <div class="trade-id" @click="queryHash(tran.trx_id)">
                    {{$t('home.list.trade.trade_detail.trade')}}
                    <span>{{tran.trx_id}}</span>
                  </div>
                  <div class="trade-address">
                    {{$t('home.list.trade.trade_detail.from')}}
                    <span
                      @click="queryAddress()"
                    >{{tran.parse_ops.parse_operations.from}}</span>
                    <span class="cut"></span>
                    {{$t('home.list.trade.trade_detail.to')}}
                    <span
                      @click="queryAddress()"
                    >{{tran.parse_ops.parse_operations.to}}</span>
                  </div>
                  <div
                    class="trade-num"
                  >{{$t('home.list.trade.trade_detail.num')}} {{tran.parse_ops.parse_operations.amount}}</div>
                </div>
                <div class="trade-time">>{{tran.date}}</div>
                <!-- {{$t('home.list.trade.trade_detail.eth')}} -->
                <!-- {{$t('home.list.trade.trade_detail.time')}} -->
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
import Vue from "vue";
import Foot from "../../components/foot";
import Highcharts from "../../components/hightcart";
import { throws } from "assert";
import Dropdown from "../../components/dropdown";
import axios from "axios";
import moment from "moment";
import { mapState, mapMutations } from "vuex";
Vue.use(VueI18n);
export default {
  name: "home",
  components: {
    Highcharts,
    Foot,
    Dropdown
  },
  data: function() {
    return {
      pageMarket: 1,
      blocks: [],
      trans: [],
      count: {},
      select: [{ name: "English", type: "en" }, { name: "中文", type: "cn" }],
      style: "white",
      selected: { name: "中文", type: "cn" },
      search: "",
      options: {
        title: "",
        categories: [
          "一月",
          "二月",
          "三月",
          "四月",
          "五月",
          "六月",
          "七月",
          "八月",
          "九月",
          "十月",
          "十一月",
          "十二月"
        ], // x轴数据
        yCompany: "mm", // y轴单位没有则去掉
        series: [
          {
            // name: '东京',
            data: [
              49.9,
              71.5,
              106.4,
              129.2,
              144.0,
              176.0,
              135.6,
              148.5,
              216.4,
              194.1,
              95.6,
              54.4
            ]
          }
        ]
      }
    };
  },
  computed: {
    ...mapState({
      language: state => state.app.language,
      defaults: state => state.app.defaults
    })
    // ...mapMutations({ setLanguage: 'updateOption' })
  },
  created() {
    this.options.title = this.defaults.trade;
  },
  mounted() {
    const that = this;
    let params = {
      limit: 10,
      page: this.pageMarket
    };
    api.get("/query_count", {}).then(result => {
      that.count = result.data.info;
    });
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
    });
    api.get("/query_all_trans", params).then(result => {
      const trans = [];
      result.data.trans.forEach(item => {
        if (item.parse_ops && item.parse_ops.length) {
          let params = {
            parse_ops: item.parse_ops[0],
            trx_id: item.trx_id,
            date: moment(new Date()).to(
              moment(new Date(item.parse_ops[0].date))
            ),
            signatures: item.signatures
          };
          trans.push(params);
        }
      });
      that.trans = trans;
    });
    // this.options.title = this.defaults.trade;
    // console.log(this.defaults.trade);
  },
  methods: {
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
    // queryAddress() {
    //   this.$router.push({ path: "/address" });
    // },
    methodToRunOnSelect(payload) {
      this.selected = payload;
    },
    searchInfo() {
      const that = this;
      let url;
      if (/^[0-9]*$/.test(that.search)) {
        url = `/query_block/${that.search}`;
      } else if (/^\w{38+}$/) {
        url = `/query_trans/${that.search}`;
      } else {
        url = `/query_user/${that.search}`;
      }
      api
        .get(url, {})
        .then(result => {
          console.log(result.data);
          if (result.data.block) {
            that.$router.push({
              name: "Block",
              params: { block_height: result.data.block.block_height }
            });
          } else if (result.data.trans) {
            that.$router.push({
              name: "Hash",
              params: { trans_id: result.data.trans.trx_id }
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style scoped lang="less" rel="stylesheet/less">
.banner {
  height: 354px;
  width: 100%;
  // background: cadetblue;
  background: url("/static/image/banner.png") no-repeat;
  .content-box {
    width: 1440px;
    margin: 0 auto;
    height: 354px;
    // background: linear-gradient(
    //     180deg,
    //     rgba(121, 57, 248, 1) 0%,
    //     rgba(47, 81, 255, 1) 100%
    // );
    // opacity: 0.0551;
    // background: red;
    .content {
      height: 354px;
      margin: 0 auto;
      width: 1200px;
      display: flex;
      flex-direction: column;
      // height: 100px;
      .logo {
        cursor: pointer;
        float: left;
        margin-top: 30px;
        width: 132px;
        height: 58px;
        img {
          width: 132px;
          height: 58px;
          object-fit: cover;
        }
      }
      .language {
        cursor: pointer;
        float: right;
        width: 90px;
        height: 27px;
        margin-top: 66px;
        border-radius: 3px;
        opacity: 0.5;
        border: 1px solid;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        color: #fff;
        .icon {
          height: 9px;
          width: 12px;
          margin-left: 3px;
        }
      }
      .search-box {
        margin: 76px 0 0 132px;
        width: 938px;
        height: 60px;
        background: rgba(255, 255, 255, 1);
        border-radius: 30px;
        display: flex;
        align-items: center;
        input {
          width: 825px;
          border: none;
          padding-left: 30px;
          margin-left: 5px;
          font-size: 16px;
        }
        input:focus {
          outline: none;
        }
        .btn {
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 80px;
          height: 60px;
          margin-left: 2px;
          border-radius: 0 30px 30px 0;
          background: rgba(56, 141, 244, 1);
          img {
            height: 20px;
            width: 20px;
          }
        }
      }
      .banner-bottom {
        width: 1200px;
        height: 38px;
        margin-top: 88px;
        border-bottom: 1px dashed #333;
        background: white;
      }
    }
  }
}
.body {
  height: 1418px;
  width: 100%;
  .content-box {
    width: 1440px;
    height: 1418px;
    // background: linear-gradient(
    //     180deg,
    //     rgba(121, 57, 248, 0.55) 0%,
    //     rgba(47, 81, 255, 0.55) 100%
    // );
    background-color: rgba(47, 81, 255, 0.055);
    display: flex;
    flex-direction: column;
    .count {
      display: flex;
      height: 113px;
      width: 1200px;
      background: white;
      margin: 0 auto;
      opacity: 1;
      .num {
        width: 240px;
        display: flex;
        flex-direction: column;
        align-items: center;
        div {
          margin-top: 15px;
          font-size: 33px;
          font-family: PingFangSC-Medium;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
          line-height: 45px;
        }
        span {
          height: 20px;
          font-size: 18px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(152, 152, 152, 1);
          line-height: 21px;
        }
      }
    }
    .chart {
      width: 1200px;
      margin: 24px auto 0;
      display: flex;
      justify-content: space-between;
      .child-chart {
        height: 410px;
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
      width: 569px;
      height: 26px;
      font-size: 18px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        font-size: 20px;
        color: #333;
      }
      div {
        font-size: 14px;
        font-family: PingFangSC-Regular;
        color: rgba(56, 141, 244, 1);
        margin-right: 21px;
        cursor: pointer;
      }
    }
    .block {
      width: 569px;
      overflow: scroll;
      padding: 33px 0 0 20px;
      background: rgba(255, 255, 255, 1);
      display: flex;
      flex-direction: column;
      .block-content {
        height: 720px;
        // margin-top: 16px;
        overflow: scroll;
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
          width: 150px;
          margin-left: 4px;
          cursor: pointer;
        }
        .trade-address {
          display: flex;
          margin-top: 4px;
        }
        .cut {
          height: 20px;
          width: 24px;
        }
        .trade-id {
          display: flex;
          margin-top: 4px;
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
        font-family: PingFangSC-Regular;
        font-weight: 400;
        margin-right: 22px;
        color: rgba(152, 152, 152, 1);
      }
    }
  }
}
</style>