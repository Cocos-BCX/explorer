<template>
  <div class="foot">
    <div class="detail">
      <div class="content">
        <div class="ways">
          <a class="box" href="javascript:void(0)">
            <i class="iconfont icon-facebook"></i>
            <span>Fackbook</span>
          </a>
          <a class="box" target="new_page" href="https://www.weibo.com/p/1006062183715773">
            <i class="iconfont icon-weibo"></i>
            <span>Weibo</span>
          </a>
          <a class="box" target="new_page" href="https://twitter.com/CocosBCX">
            <i class="iconfont icon-icon"></i>
            <span>Twitter</span>
          </a>
          <div class="box" @mouseover="ShowWechat()" @mouseout="HideWechat()">
            <i class="iconfont icon-wechat"></i>
            <span>Wechat</span>
          </div>
          <a class="box" href="javascript:void(0)">
            <i class="iconfont icon-github"></i>
            <span>Github</span>
          </a>
          <a class="box" href="https://t.me/CocosBCX" target="new_page">
            <i class="iconfont icon-telegram"></i>
            <span>Telegram</span>
          </a>
        </div>
        <div class="bcx_box" v-if="code">
          <img class="bcx_logo" src="../../static/image/wechartCode.jpg" alt>
        </div>
        <div class="email">
          <p class="f_info">
            <a href="mailto:Support@cocosbcx.io">Email: Support@cocosbcx.io</a>
          </p>
          <p class="f_info top">
            <a target="new_page" href="javascript:void(0)" @click="TermsPolicyOpen()">
              Terms
              of Service
            </a> |
            <a target="new_page" href="javascript:void(0)" @click="PolicyOpen()">Privacy Policy</a>
          </p>
        </div>
        <div class="item-footer right_f">
          <p class="f_info send_info">{{$t('bottom.subscribe')}}</p>
          <div class="send-warp">
            <input
              :placeholder="$t('bottom.message')"
              @focus="Subfocus()"
              @blur="SubBlur()"
              class="send_text"
              type="text"
              v-model="cocos_subscribe"
              :class="focus ? 'focus_color' : ''"
            >
            <span
              class="send_btn"
              @click="Subscribe()"
              :class="focus ? 'focus_bg_color' : ''"
            >Subscribe</span>
          </div>
          <div class="warn" v-if="warn">{{$t('bottom.email')}}</div>
          <div class="warn" v-if="success">{{$t('bottom.success')}}</div>
          <div class="warn" v-if="fail">{{$t('bottom.error')}}</div>
        </div>
      </div>
    </div>
    <div class="all">© 2018 Cocos-BCX All rights reserved.</div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "Foot",
  data() {
    return {
      code: false,
      focus: false,
      email: "",
      warn: false,
      fail: false,
      success: false,
      cocos_subscribe: ""
    };
  },
  mounted() {},
  methods: {
    ShowWechat() {
      this.code = true;
    },
    HideWechat() {
      this.code = false;
    },
    Subfocus() {
      this.focus = true;
    },
    SubBlur() {
      this.focus = false;
    },
    Subscribe() {
      const that = this;
      let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      if (!reg.test(that.cocos_subscribe)) {
        that.warn = true;
      }
      axios
        .get("https://bcx.cocos.com/api/cocos_subscribe", {
          params: {
            action: "cocos_subscribe",
            name: that.cocos_subscribe
          }
        })
        .then(response => {
          var data = JSON.parse(response.body);
          if (data.status == 1) {
            //  alert(response.body.msg)
            that.cocos_subscribe = "";
            that.success = true;
            that.warn = false;
            that.fail = false;
          } else {
            that.cocos_subscribe = "";
            that.warn = false;
            that.fail = true;
            that.success = false;
          }
        })
        .catch(e => {
          // 打印一下错误
          console.log(e);
        });
    },
    PolicyOpen() {
      var iframePldom = $("#iframePl");
      console.log(iframePldom);
      var src = iframePldom.data("src") + "/privacy.html";
      console.log(src);
      iframePldom.attr("src", src);
    },
    TermsPolicyOpen() {
      var iframePldom = $("#iframePl");
      var src = iframePldom.data("src") + "/teams.html";
      iframePldom.attr("src", src);
      $(".cover-warp").show();
    }
  }
};
</script>
<style scoped lang="less" rel="stylesheet/less">
.foot {
  height: 216px;
  width: 100%;
  display: flex;
  flex-direction: column;
  .detail {
    height: 96px;
    padding: 42px 0;
    width: 100%;
    background: rgba(69, 69, 69, 1);
    .content {
      width: 1006px;
      margin: 0 auto;
      display: flex;
      position: relative;
      .ways {
        color: #888;
        display: flex;
        height: 96px;
        width: 233px;
        flex-wrap: wrap;
        font-size: 13px;
        position: relative;
        .box:nth-child(even) {
          margin-left: 35px;
        }
        .box {
          width: 90px;
          height: 18px;
          display: flex;
          align-items: center;
          cursor: pointer;
        }
        .box:hover {
          color: #c8c8c8;
          span {
            text-decoration: underline;
          }
        }
        span {
          margin-left: 5px;
        }
      }
      .bcx_box {
        height: 66px;
        width: 66px;
        margin-top: 8px;
        background: rgba(102, 102, 102, 1);
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        left: 225px;
        .bcx_logo {
          height: 60px;
          width: 60px;
        }
      }
      .bcx_box:after {
        content: " ";
        height: 0;
        position: absolute;
        width: 0;
        display: block;
        border-style: solid;
        border-width: 5px;
        border-color: transparent rgba(102, 102, 102, 1) transparent transparent;
        position: absolute;
        left: -10px;
      }
    }
    .email {
      width: 200px;
      height: 41px;
      margin: 25px 0 0 170px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .f_info {
        color: #888;
        font-size: 13px;
      }
      .top {
        margin-top: 10px;
      }
    }
    .item-footer {
      margin-left: 121px;
      height: 68px;
      font-size: 13px;
      color: #888;
      .send-warp {
        margin-top: 16px;
        display: flex;
        .send_text {
          width: 190px;
          height: 22px;
          border-radius: 3px 0px 0px 3px;
          border: 1px solid rgba(153, 153, 153, 1);
          background: rgba(69, 69, 69, 1);
          color: #999;
          font-size: 13px;
          padding: 5px 0 8px 10px;
        }
        .focus_color {
          border: 1px solid #4990ed;
        }

        .send_btn {
          width: 78px;
          height: 35px;
          border: 1px solid rgba(153, 153, 153, 1);
          background: rgba(153, 153, 153, 1);
          border-radius: 0px 3px 3px 0px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255, 255, 255, 1);
          cursor: pointer;
        }
        .focus_bg_color {
          background: #4990ed;
          border: 1px solid #4990ed;
        }
      }
    }
  }
  .all {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 36px;
    width: 100%;
    background: rgba(51, 51, 51, 1);
    font-size: 12px;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
  }
}
@import "../../static/icon/iconfont.css";
</style>
