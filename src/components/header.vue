<template>
  <div class="header">
    <div class="banner">
      <div class="content-box">
        <div class="content">
          <div>
            <div class="logo" @click="goHome()">
              <img v-lazy="'/static/image/logo.png'" alt>
            </div>
            <!-- <div class="language" @@blur="changeLanguage()">
              <div class="name">English</div>
              <div class="icon"></div>
            </div>-->
            <dropdown :options="select" :selected="selected" :updateOption="methodToRunOnSelect"></dropdown>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import dropdown from "./dropdown";
export default {
  name: "Header",
  data() {
    return {
      select: [{ name: "English", type: "en" }, { name: "中文", type: "cn" }],
      selected: { name: "中文", type: "cn" }
    };
  },
  components: {
    dropdown
  },
  mounted() {},
  methods: {
    goHome() {
      this.$router.push({ path: "/" });
    },
    methodToRunOnSelect(payload) {
      this.selected = payload;
    }
  }
};
</script>
<style scoped lang="less" rel="stylesheet/less">
.banner {
  height: 118px;
  width: 100%;
  border-bottom: 1px solid rgba(230, 230, 230, 1);
  .content-box {
    width: 1440px;
    margin: 0 auto;
    height: 118px;
    .content {
      height: 118px;
      margin: 0 auto;
      width: 1200px;
      display: flex;
      flex-direction: column;
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
        width: 74px;
        height: 27px;
        margin-top: 66px;
        border-radius: 3px;
        opacity: 0.5;
        border: 1px solid #666;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        color: #666;
        .icon {
          width: 0;
          height: 0;
          border: 6px solid;
          border-color: rgba(102, 102, 102, 1) transparent transparent
            transparent;
          margin: 6px 0 0 3px;
        }
      }
    }
  }
}
@media (min-width: 1200px) and (max-width: 1440px) {
  .banner {
    height: 98px;
    .content-box {
      width: 1200px;
      height: 98px;
      .content {
        height: 98px;
        width: 1000px;
        .logo {
          margin-top: 25px;
          width: 110px;
          height: 48px;
          img {
            width: 110px;
            height: 48px;
          }
        }
        .language {
          width: 74px;
          height: 62px;
          margin-top: 55px;
          border-radius: 3px;
          opacity: 0.5;
          font-size: 12px;
          .icon {
            border: 5px solid;
            margin: 5px 0 0 3px;
          }
        }
      }
    }
  }
}
@media (max-width: 1200px) {
  .banner {
    height: 83px;
    .content-box {
      width: 1024px;
      height: 83px;
      .content {
        height: 83px;
        width: 853px;
        .logo {
          margin-top: 21px;
          width: 94px;
          height: 41px;
          img {
            width: 94px;
            height: 41px;
          }
        }
        .language {
          width: 63px;
          height: 53px;
          margin-top: 47px;
          border-radius: 3px;
          opacity: 0.5;
          font-size: 10px;
          .icon {
            border: 4px solid;
            margin: 4px 0 0 2px;
          }
        }
      }
    }
  }
}
</style>