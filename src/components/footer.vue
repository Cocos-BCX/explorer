<template>
  <div class="footer">
    <div class="footer_box">
      <div class="totop">
        <div class="tojt">
          <div></div>
        </div>
      </div>
      <div class="footer_con">
        <div class="footer_con_l lt">
          <div class="f_til">{{$t('home.footer.contact')}}</div>
          <div class="f_line"></div>
          <div class="email">
            <img src="https://jdi.cocosbcx.net/image/explorer/email.png" alt>
            <p>
              <a href="mailto:Support@cocosbcx.io" target="_blank">Email:Support@cocosbcx.io</a>
            </p>
          </div>
          <div class="file">
            <img src="https://jdi.cocosbcx.net/image/explorer/file.png" alt>
            <p>
              <a
                target="_blank"
                href="http://cocos.dev.cjfan.net/static/media/terms.70cb3768.pdf"
                rel="noopener noreferrer"
              >Terms of Service</a> |
              <a
                target="_blank"
                href="http://cocos.dev.cjfan.net/static/media/privacy.c377e532.pdf"
                rel="noopener noreferrer"
              >Privacy Policy</a>
            </p>
          </div>
        </div>
        <div class="footer_con_r lt">
          <div class="r_til">{{$t('home.footer.subscribe')}}</div>
          <div class="r_line"></div>
          <div class="footer_dy" id="mc_embed_signup">
            <form
              action="https://cocosbcx.us20.list-manage.com/subscribe/post?u=9907dfea800bf6f37eccb2e9c&amp;id=5d769877f3"
              method="post"
              id="mc-embedded-subscribe-form"
              name="mc-embedded-subscribe-form"
              class="validate"
              target="_blank"
              novalidate
            >
              <div id="mc_embed_signup_scroll">
                <div class="input_box">
                  <input
                    type="email"
                    name="EMAIL"
                    :placeholder="$t('home.footer.int_email')"
                    class="email"
                    id="mce-EMAIL"
                  >
                </div>
                <div class="input_l_box"></div>
                <div class="input_r_box">
                  <input
                    type="submit"
                    :value="$t('home.footer.submit')"
                    name="subscribe"
                    id="mc-embedded-subscribe"
                    class="button"
                  >
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="footer_img">
        <a
          class="facebook"
          href="https://medium.com/cocosbcx"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            style="height:24px;width:14px"
            src="https://jdi.cocosbcx.net/image/explorer/facebook.png"
            alt
          >
        </a>
        <a
          class="twitter"
          href="https://twitter.com/CocosBCX"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            style="height:20px;width:23px"
            src="https://jdi.cocosbcx.net/image/explorer/Twitter.png"
            alt
          >
        </a>
        <div class="wechet_box">
          <img
            style="width:29px;height:23px;"
            src="https://jdi.cocosbcx.net/image/explorer/wechat.png"
            class="biao"
            alt
          >
          <img class="ma" alt>
        </div>
        <a
          href="https://www.weibo.com/p/1006062183715773"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            style="width:30px;height:24px;"
            src="https://jdi.cocosbcx.net/image/explorer/weibo.png"
            alt
          >
        </a>
        <a target="_blank" rel="noopener noreferrer">
          <img
            style="width:22px;height:22px;"
            src="https://jdi.cocosbcx.net/image/explorer/telegram.png"
            alt
          >
        </a>
        <a href="https://github.com/cocos-bcx" target="_blank" rel="noopener noreferrer">
          <img
            style="width:23px;height:26px;"
            src="https://jdi.cocosbcx.net/image/explorer/github.png"
            alt
          >
        </a>
      </div>
      <div class="footer_bottom">2018 Cocos-BCX All rights reserved.</div>
    </div>
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
          console.log(data);
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
.footer {
  width: 100%;
  // min-width:1600px;
  height: 529px;
  background: rgba(31, 31, 31, 1);
  .footer_box {
    position: relative;
    // width: 1600px;
    margin: auto;
    .totop {
      height: 54px;
      width: 63px;
      background: #676767;
      display: none;
      // position: absolute;
      // right: 120px;
      // top: -27px;
      position: fixed;
      transform: skewX(-20deg);
      cursor: pointer;

      right: 120px;
      bottom: 150px;
      transition: all 0.8s;

      &:hover {
        opacity: 0.8;
      }

      .tojt {
        transform: skewX(20deg);
        position: relative;

        div {
          position: absolute;
          display: inline-block;
          border-top: 2px solid;
          border-right: 2px solid;
          width: 8px;
          height: 8px;
          transform: rotate(-45deg);
          border-color: #fff;
          margin: 50px auto auto 100px;
          top: -25px;
          left: -82px;
        }
      }
    }

    .footer_con {
      width: 920px;
      padding-top: 56px;
      margin: auto;
      overflow: hidden;

      .footer_con_l {
        float: left;
        width: 271px;

        .f_til {
          font-size: 18px;
          font-family: FjallaOne;
          color: rgba(103, 103, 103, 1);
        }

        .f_line {
          width: 271px;
          height: 2px;
          background: rgba(255, 255, 255, 0.3);
          margin-top: 18px;
        }

        .email {
          overflow: hidden;
          margin-top: 32px;

          img {
            display: block;
            float: left;
            width: 22px;
            height: 18px;
          }

          p {
            float: left;
            margin-left: 7px;
            font-size: 15px;
            font-family: MyriadPro-Regular;
            color: rgba(255, 255, 255, 1);
            line-height: 17px;
          }
        }

        .file {
          display: block;
          overflow: hidden;
          margin-top: 24px;
          box-sizing: border-box;
          img {
            display: block;
            float: left;
            width: 14px;
            height: 20px;
            margin-left: 3px;
            box-sizing: border-box;
          }

          p {
            float: left;
            font-size: 15px;
            margin-left: 12px;
            // font-family: MyriadPro-Regular;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            line-height: 24px;
            box-sizing: border-box;
            a {
              color: #fff;

              &:hover {
                opacity: 0.8;
              }
            }
          }
        }
      }

      .footer_con_r {
        width: 560px;
        margin-left: 88px;
        float: left;
        .r_til {
          font-size: 18px;
          font-family: FjallaOne;
          color: rgba(103, 103, 103, 1);
        }

        .r_line {
          width: 307px;
          height: 2px;
          background: rgba(255, 255, 255, 0.3);
          margin-top: 18px;
        }

        .footer_dy {
          margin-top: 43px;
          // background: #ccc;
          position: relative;
          height: 60px;

          .input_box {
            width: 403px;
            height: 54px;
            position: relative;
            margin-left: 28px;

            input {
              margin-top: 3px;
              width: 403px;
              height: 54px;
              outline: none;
              font-size: 14px;
              font-family: MyriadPro-Regular;
              font-weight: 400;
              // color: rgba(170, 170, 170, 1);
              box-sizing: border-box;
              padding-left: 35px;
              padding-right: 22px;
            }

            p {
              margin-top: 3px;
              position: absolute;
              left: 5px;
              top: 0;
              height: 54px;
              line-height: 54px;
              font-size: 14px;
              font-family: MyriadPro-Regular;
              font-weight: 400;
              color: rgba(170, 170, 170, 1);
              width: 100%;
              padding-left: 30px;
            }
          }

          .input_l_box {
            position: absolute;
            height: 60px;
            width: 35px;
            background: #2ad9fe;
            top: 0;
            left: 13.8px;
            transform: skewX(-25deg);
          }

          .input_r_box {
            position: absolute;
            height: 60px;
            width: 110px;
            background: #2ad9fe;
            top: 0;
            left: 416px;
            transform: skewX(-25deg);
            cursor: pointer;

            .button {
              background: #2ad9fe;
              border: none;
              margin: auto;
              transform: skewX(25deg);
              font-size: 16px;
              font-family: FjallaOne;
              font-weight: 400;
              color: #fff;
              line-height: 60px;
              display: block;
              outline: none;
              cursor: pointer;
            }
          }
        }
      }
    }

    .footer_img {
      margin: auto;
      width: 440px;
      height: 28px;
      margin: auto;
      // overflow: hidden;
      margin-top: 105px;
      img {
        width: 28px;
      }
      .wechet_box {
        display: inline-block;
        margin-left: 52px;
        cursor: pointer;
        position: relative;

        .biao {
          height: 26px;
        }

        .ma {
          display: none;
          position: absolute;
          left: -38px;
          top: 28px;
          width: 100px;
          height: 100px;
        }
      }

      a {
        margin-left: 52px;

        &:nth-child(1) {
          margin-left: 0;
        }

        img {
          height: 26px;
        }
      }
    }

    .footer_bottom {
      font-size: 15px;
      font-family: HiraginoSansGB-W3;
      font-weight: normal;
      color: rgba(255, 255, 255, 1);
      opacity: 0.34;
      margin: auto;
      margin-top: 92px;
      text-align: center;
    }
  }
}
</style>
