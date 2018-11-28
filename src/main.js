// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueI18n from 'vue-i18n'
import Vuex from 'vuex'
import VueLazyload from 'vue-lazyload'
import Highcharts from 'highcharts/highstock'
import VueClipboard from 'vue-clipboard2'
// import VuePaginate from 'vue-paginate'

// Vue.use(VuePaginate)
Vue.use(Vuex)
Vue.use(VueLazyload)
Vue.use(VueI18n)
Vue.use(VueClipboard)

// Vue.use(VueLazyload, {
//   preLoad: 1.3,
//   error: 'dist/error.png',
//   loading: 'dist/loading.gif',
//   attempt: 1
// })
const store = new Vuex.Store({})
const i18n = new VueI18n({
  locale: 'zh-CN', // 语言标识, 通过切换locale的值来实现语言切换,this.$i18n.locale 
  messages: {
    'zh-CN': require('./il8n/lang/cn'), // 中文语言包
    'en-US': require('./il8n/lang/en') // 英文语言包
  }
})
store.registerModule('app', {
  state: {
    language: {
      name: '中文',
      type: 'en'
    }
  },
  mutations: {
    setLanguage(state, language) {
      state.language = language
    }
  }
})
Vue.config.productionTip = false

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
