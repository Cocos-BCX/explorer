// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue'
// author cocos-bcx team 
import App from './App'
import router from './router'
import VueI18n from 'vue-i18n'
import Vuex from 'vuex'
import VueLazyload from 'vue-lazyload'
import Highcharts from 'highcharts/highstock'
import VueClipboard from 'vue-clipboard2'
import qs from 'qs'
import cn from './il8n/lang/cn'
import en from './il8n/lang/en'
import {
  Pagination,
  MessageBox,
  Dialog
} from 'element-ui';
// import VuePaginate from 'vue-paginate'
// import defaults from './http/api';
Vue.component(MessageBox)
Vue.component(Pagination)
Vue.component(Dialog)
Vue.prototype.$qs = qs;
Vue.use(Vuex)
Vue.use(VueLazyload)
Vue.use(VueI18n)
Vue.use(VueClipboard)
Vue.prototype.$alert = MessageBox.alert;
// Vue.use(VueLazyload, {
//   preLoad: 1.3,
//   error: 'dist/error.png',
//   loading: 'dist/loading.gif',
//   attempt: 1
// })
const store = new Vuex.Store({})
const i18n = new VueI18n({
  locale: 'cn', // 语言标识, 通过切换locale的值来实现语言切换,this.$i18n.locale 
  messages: {
    en: {
      ...en
    }, // 中文语言包
    cn: {
      ...cn
    }
  }
})
store.registerModule('app', {
  state: {
    language: {
      name: 'English',
      type: 'cn'
    },
    defaults: {
      trade: '14 day Transaction History',
      address: '14 day Address Growth'
    }
  },
  mutations: {
    setLanguage(state, language) {
      state.language = language
    },
    setDefault(state, defaults) {
      state.defaults = defaults
    }
  }
})
Vue.config.productionTip = false
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0);
  var _hmt = _hmt || [];
  (function () {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?bab6d19be10a79632bc890001c815bbd";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
  })();
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  components: {
    App
  },
  template: '<App/>',
  methods: {
    moreChart() {
      var options = this.getMoreOptions(this.type)

      if (this.chart) {
        this.chart.destroy()
      };
      // 初始化 Highcharts 图表
      this.chart = new Highcharts.Chart('highcharts-more', options);
    }
  }
})
