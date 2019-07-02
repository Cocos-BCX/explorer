<template>
  <div class="btn-group">
    <li
      @click="toggleMenu()"
      class="dropdown-toggle languag"
      :class="setClass()"
      v-if="language.name !== undefined"
    >
      {{language.name }}
      <span class="icon" :class="setClass()"></span>
    </li>

    <li
      @click="toggleMenu()"
      class="dropdown-toggle languae"
      :class="setClass()"
      v-if="language.name === undefined"
    >
      {{placeholderText}}
      <span class="icon" :class="setClass()"></span>
    </li>
    <ul class="dropdown-menu" v-if="showMenu">
      <li v-for="(option,index) in options" :key="index">
        <a href="javascript:void(0)" @click="updateOption(option)">{{ option.name }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { stat } from "fs";
export default {
  data() {
    return {
      selectedOption: {
        name: "",
        type: ""
      },
      showMenu: false,
      disabledGroup: this.$i18n.messages[this.$i18n.locale],
      urls: ""
    };
  },
  props: {
    options: {
      type: [Array, Object]
    },
    styles: [String],
    selected: {},
    placeholder: [String]
  },
  mounted() {
    var lang = navigator.language || navigator.userLanguage; //常规浏览器语言和IE浏览器
    lang = lang.substr(0, 2);
    this.$i18n.locale = lang === "zh" ? "zh" : "en";
    this.selectedOption = this.selected;
    if (this.placeholder) {
      this.placeholderText = "English";
    }
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
  computed: {
    ...mapState({
      language: state => state.app.language,
      defaults: state => state.app.defaults
    })
    // ...mapMutations({ setLanguage: 'updateOption' })
  },
  methods: {
    updateOption(option) {
      localStorage.setItem("language_name", option.name);
      localStorage.setItem("language_type", option.type);
      this.$store.commit("setLanguage", option);
      this.showMenu = false;
      this.$emit("updateOption", this.language);
      this.$i18n.locale = option.type === "en" ? "en" : "cn";
      //   let language = this.$i18n.messages[this.$i18n.locale];
      //   this.$store.commit("setDefault", language);
      this.$store.commit("setDefault", this.$t("home.charts"));
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
    },
    setClass() {
      if (this.styles === "white") {
        return "white";
      }
      if (this.showMenu) {
        return "border";
      } else {
        return "";
      }
    }
  }
};
</script>

<style>
.btn-group {
  min-width: 74px;
  height: 40px;
  position: relative;
  float: right;
}
.btn-group a:hover {
  text-decoration: none;
}
.dropdown-toggle {
  cursor: pointer;
  float: right;
  width: 74px;
  height: 27px;
  margin-top: 45px;
  border-radius: 3px;
  opacity: 0.5;
  border: 1px solid #666;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #666;
}
.border {
  color: #388df4;
  border: 1px solid #388df4;
}

.white {
  color: white;
  border: 1px solid white;
}
.dropdown-menu {
  position: absolute;
  top: 200%;
  left: 0;
  z-index: 1000;
  float: left;
  width: 74px;
  padding: 4px 0;
  list-style: none;
  font-size: 14px;
  text-align: left;
  background-color: #fff;
  border: 1px solid #ccc;
  background-clip: padding-box;
  width: 74px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  border-radius: 3px;
}

.dropdown-menu > li > a {
  padding: 5px 14px;
  display: block;
  clear: both;
  font-weight: normal;
  line-height: 1.6;
  color: #333333;
  white-space: nowrap;
  text-decoration: none;
}
.dropdown-menu > li > a:hover {
  /* background: #efefef; */
  color: #388df4;
}
.dropdown-menu > li {
  overflow: hidden;
  width: 100%;
  position: relative;
  margin: 0;
}
.icon {
  width: 0;
  height: 0;
  border: 6px solid;
  border-color: rgba(102, 102, 102, 1) transparent transparent transparent;
  margin: 6px 0 0 3px;
}
span.border {
  border-color: #388df4 transparent transparent transparent;
}

span.white {
  border-color: white transparent transparent transparent;
}
li {
  list-style: none;
}
@media (max-width: 1440px) {
  .btn-group {
    min-width: 62px;
    height: 33px;
  }
  .dropdown-toggle {
    width: 63px;
    height: 23px;
    margin-top: 37px;
    font-size: 11px;
  }
  .dropdown-menu {
    width: 62px;
    padding: 4px 0;
    font-size: 10px;
    width: 62px;
  }

  .dropdown-menu > li > a {
    padding: 4px 12px;
  }
}
</style>