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
            <input placeholder="搜索地址、区块、交易hash" v-model="search">
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
            <div>1231231</div>
            <span>测试节点</span>
          </div>
          <div class="num">
            <div>123123134134</div>
            <span>区块高度</span>
          </div>
          <div class="num">
            <div>1231231</div>
            <span>过去一天交易数</span>
          </div>
          <div class="num">
            <div>1231231</div>
            <span>账户数量</span>
          </div>
          <div class="num">
            <div>1231231</div>
            <span>TPS/峰值</span>
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
                <span>区块</span>
                <div @click="moreBlock()">查看全部</div>
              </div>
            </div>
            <div class="block-piece">
              <div class="block-id">
                <p>区块214214</p>
                <p>>1分钟24秒前</p>
              </div>
              <div class="block-detail">
                <p class="address">
                  由矿工
                  <span>214214214214</span>
                </p>
                <p class="trade-num">
                  <span>112交易</span> 于11秒
                </p>
                <p class="award">区块奖励 2131244124 以太币</p>
              </div>
            </div>
          </div>
          <div class="block trade">
            <div class="title">
              <span>交易</span>
              <div @click="moreTrade()">查看全部</div>
            </div>
            <div class="block-piece trade-piece">
              <div class="trade-info">
                <div class="trade-id" @click="queryHash()">
                  交易#
                  <span>qwertyuiop1234sdfghjkl78z</span>
                </div>
                <div class="trade-address">
                  发送方
                  <span>qwertyuiop1234sdfghjkl78</span>
                  <span class="cut"></span> 接收方
                  <span>qwertyuiop1234sdfghjkl78</span>
                </div>
                <div class="trade-num">数额 0 以太币</div>
              </div>
              <div class="trade-time">>47秒前</div>
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
      select: [{ name: "English", type: "en" }, { name: "中文", type: "cn" }],
      style: "white",
      selected: { name: "中文" },
      search: "",
      options: {
        title: "过去14天的交易数",
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
  mounted() {
    // axios
    //   .get("/query_block/000222e17b4657186ef3ac27a427a56e1b5d4137")
    //   .then(response => console.log(response));
    // api
    //   .get("/query_block/000222e17b4657186ef3ac27a427a56e1b5d4137", {})
    //   .then(result => {
    //     console.log(result.data);
    //   });
    const that = this;
    // console.log(process.env.NODE_ENV);
  },
  methods: {
    moreBlock() {
      this.$router.push({ path: "/block" });
    },
    moreTrade() {
      this.$router.push({ path: "/trade" });
    },
    queryHash() {
      this.$router.push({ path: "/hash" });
    },
    methodToRunOnSelect(payload) {
      this.selected = payload;
    },
    searchInfo() {}
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
      height: 750px;
      overflow: scroll;
      padding: 33px 0 0 20px;
      background: rgba(255, 255, 255, 1);
      display: flex;
      flex-direction: column;
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