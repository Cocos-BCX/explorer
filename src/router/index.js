// import Vue from 'vue'
import Router from 'vue-router'
import Home from '../modules/home'
import Block from '../modules/block'
import Address from '../modules/address'
import Hash from '../modules/hash'
import Stopcock from '../modules/stopcock'

Vue.use(Router)
// Home包含404放最后
export default new Router({
  mode: 'history',
  routes: [
    ...Block,
    ...Address,
    ...Hash,
    ...Stopcock,
    ...Home
  ]
})
