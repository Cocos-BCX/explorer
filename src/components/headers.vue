<template>
  <div class="content">
    <div class="nav_box">
      <div class="nav" :class="$i18n.locale === 'cn'? 'cn' : 'en'">
        <div class="nav_list_box">
          <div class="nav_home lt">
            <a class="nav_home_click">{{$t('home.header.homepage')}}</a>
          </div>
          <div class="nav_develop lt">
            <a class="nav_browser_click" @mouseenter="Devs()">
              <span :class="hover? 'active' : ''">{{$t('home.header.develop')}}</span>
            </a>
            <div class="nav_develop_more" v-if="!hover"></div>
            <div class="nav_develop_more_close" v-if="hover"></div>
            <div class="nav_develop_list" @mouseleave="LeaveDevs()">
              <transition name="slide-fade">
                <div class="nav_develop_list_box" v-if="hover">
                  <!-- <div class="nav_develop_list_trans"> -->
                  <div class="dev_a">{{$t('home.header.developPlan')}}</div>
                  <div class="dev_a">{{$t('home.header.developApi')}}</div>
                  <div class="dev_a">{{$t('home.header.developsq')}}</div>
                  <!-- </div> -->
                </div>
              </transition>
            </div>
          </div>
          <div class="nav_jl lt">
            <a class="nav_browser_click" target="_blank">{{$t('home.header.jili')}}</a>
          </div>
          <div class="nav_st lt">
            <a class="nav_st_click">{{$t('home.header.stproduct')}}</a>
          </div>
          <div class="nav_action lt">
            <a class="nav_st_click">{{$t('home.header.action')}}</a>
          </div>
          <div class="nav_browser lt">
            <a class="nav_st_click active">{{$t('home.header.browser')}}</a>
          </div>
          <div class="nav_about lt">
            <a class="nav_st_click">{{$t('home.header.about')}}</a>
            <!-- <div class="nav_about_more"></div> -->
          </div>
        </div>
      </div>
      <div class="lang_box lt" @click="chooseLanguage">
        <div class="lang">
          <div class="now">{{language.name }}</div>
        </div>
        <transition name="slide-fade">
          <div class="choose_lang_box" v-if="language_box">
            <div
              class="chinese"
              @click="updateOption({     
             name: '中文',
      type: 'cn'})"
            >中文</div>
            <div
              class="english"
              @click="updateOption( {
      name: 'English',
      type: 'en'
    })"
            >English</div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "loading",
  props: ["height"],
  data() {
    return {
      hover: false,
      language_box: false,
      baseurl: "http://cocos.dev.cjfan.net"
    };
  },
  computed: {
    ...mapState({
      language: state => state.app.language,
      defaults: state => state.app.defaults
    })
    // ...mapMutations({ setLanguage: 'updateOption' })
  },
  mounted() {
    // this.selectedOption = this.selected;
    // if (this.placeholder) {
    //   this.placeholderText = "English";
    // }
    console.log(this.$route.path);
    this.urls = this.getQueryVariable("language") || "";
    if (this.urls) {
      this.$i18n.locale = "en";
    } else {
      let name = localStorage.getItem("language_name");
      let type = localStorage.getItem("language_type");
      let option =
        name && type
          ? {
              name,
              type
            }
          : this.language;
      this.$store.commit("setLanguage", option);
      this.name = localStorage.getItem("language_name") || "English";
      this.$i18n.locale = option.type === "en" ? "en" : "cn";
    }
  },
  methods: {
    Devs() {
      this.hover = true;
    },
    LeaveDevs() {
      this.hover = false;
    },
    chooseLanguage() {
      this.language_box = !this.language_box;
    },
    updateOption(option) {
      console.log(this.language_box);
      localStorage.setItem("language_name", option.name);
      localStorage.setItem("language_type", option.type);
      this.$store.commit("setLanguage", option);
      this.showMenu = false;
      // this.$emit("updateOption", this.language);
      this.$i18n.locale = option.type === "en" ? "en" : "cn";
      //   let language = this.$i18n.messages[this.$i18n.locale];
      //   this.$store.commit("setDefault", language);
      // this.$store.commit("setDefault", this.$t("home.charts"));
    },
    getQueryVariable(variable) {
      var query = window.location.search.substring(1);
      var vars = query.split("&");
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
          return pair[1];
        }
      }
      return false;
    },
    toggleMenu() {
      this.showMenu = !this.showMenu;
    }
  }
};
</script>
<style scoped lang="less">
.content {
  font-size: 14px;
  height: 568px;
  width: 100%;
  font-family: PingFangSC-Regular, sans-serif;
  // float: left;
  background: url(https://jdi.cocosbcx.net/image/explorer/bg-banner.png)
    no-repeat 50%;
  overflow: hidden;
  .lt {
    float: left;
    margin-left: 47px;
    font-weight: 300;
  }
  .en {
    .lt {
      float: left;
      margin-left: 29px;
    }
  }
  .cn {
    .nav_list_box {
      margin-left: 20px;
    }
  }
  .nav_box {
    width: 1200px;
    display: flex;
    margin: auto;
    .lt {
      a {
        cursor: pointer;
      }
    }
    margin-top: 15px;
    .nav {
      width: 683px;
      height: 41px;
      background: rgba(103, 103, 103, 1);
      transform: skewX(-30deg);
      margin-left: 420px;
      float: left;
      .nav_list_box {
        transform: skewX(30deg);
        .active {
          color: #2ad9fe;
        }
        display: flex;
        // justify-content: center;
        align-items: center;
        a {
          color: #bebebe;
          line-height: 41px;

          &:hover {
            color: #2ad9fe;
          }
        }
        .nav_develop {
          position: relative;
          span.active {
            color: #2ad9fe;
          }
          .nav_develop_click {
            z-index: 3;
          }

          .nav_develop_more_close {
            // display: none;
            width: 0;
            height: 0;
            border-width: 0 4px 6px;
            border-style: solid;
            border-color: transparent transparent #2ad9fe;
            position: absolute;
            top: 17px;
            right: -14px;
            cursor: pointer;
          }

          .nav_develop_more {
            width: 0;
            height: 0;
            border-width: 6px 4px 0;
            border-style: solid;
            border-color: #bebebe transparent transparent;
            position: absolute;
            top: 18px;
            right: -14px;
            cursor: pointer;
          }

          .nav_develop_list {
            position: absolute;
            width: 83px;
            top: 0px;
            left: -10px;
            cursor: pointer;

            .nav_develop_list_box {
              margin-top: 46px;
              width: 83px;
              height: 88px;
              overflow: hidden;
              background: rgba(51, 51, 51, 1);
              opacity: 0.76;
              .nav_develop_list_trans {
                padding-top: 2px;
                width: 83px;
                height: 86px;
                background: rgba(51, 51, 51, 1);
                opacity: 0.76;
                transform: translateY(-88px);
                transition: all 0.3s;
                overflow: hidden;
              }
            }

            .dev_a {
              display: block;
              margin-top: 12px;
              height: 12px;
              line-height: 12px;
              margin-left: 11px;
              font-size: 12px;
              color: #bebebe;

              &:hover {
                color: #2ad9fe;
              }
            }
          }
        }

        .nav_about {
          position: relative;

          .nav_about_click {
            z-index: 3;
          }

          .nav_about_more_close {
            // display: none;
            width: 0;
            height: 0;
            border-width: 0 4px 6px;
            border-style: solid;
            border-color: transparent transparent #2ad9fe;
            position: absolute;
            top: 17px;
            right: -14px;
            cursor: pointer;
          }

          .nav_about_more {
            width: 0;
            height: 0;
            border-width: 6px 4px 0;
            border-style: solid;
            border-color: #bebebe transparent transparent;
            position: absolute;
            top: 18px;
            right: -14px;
            cursor: pointer;
          }

          .nav_about_list {
            display: none;
            position: absolute;
            // width: 83px;
            top: 0px;
            left: -10px;
            overflow: hidden;
            cursor: pointer;

            .nav_about_list_box {
              margin-top: 46px;
              // width: 83px;
              height: 88px;
              overflow: hidden;

              .nav_about_list_trans {
                padding-top: 2px;
                width: 107px;
                height: 63px;
                background: rgba(51, 51, 51, 1);
                opacity: 0.76;
                transform: translateY(-88px);
                transition: all 0.3s;
                overflow: hidden;
              }
            }

            .dev_a {
              display: block;
              margin-top: 12px;
              height: 12px;
              line-height: 12px;
              margin-left: 11px;
              font-size: 12px;
              color: #bebebe;

              &:hover {
                color: #2ad9fe;
              }
            }
          }
        }
      }
    }
    .slide-fade-enter-active {
      transition: all 0.3s ease;
    }
    .slide-fade-leave-active {
      transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
    }
    .slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
      transform: translateX(60px);
      opacity: 0;
    }
    .lang_box {
      width: 73px;
      height: 41px;
      // right: 180px;
      float: left;
      background: rgba(42, 217, 254, 1);
      transform: skewX(-30deg);
      margin-left: 20px;
      cursor: pointer;
      // position: absolute;

      .lang {
        transform: skewX(30deg);
        box-sizing: border-box;
        margin: auto;
        margin-left: 10px;

        .now {
          background: url(/static/image/white.png) 2px 5px no-repeat;
          margin-top: 13px;
          font-size: 11px;
          width: 100%;
          font-family: PingFang-SC-Regular;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          text-align: center;
        }
      }

      .choose_lang_box {
        // display: none;
        transform: skewX(30deg);
        position: absolute;
        background: #fff;
        width: 73px;
        height: 60px;
        left: 17.5px;
        top: 41px;
        font-size: 11px;
        background: rgba(0, 0, 0, 0.3);
        div {
          height: 30px;
          color: #fff;
          line-height: 30px;
          text-align: center;
        }
      }
    }
  }
}
</style>
