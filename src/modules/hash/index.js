// import Hash from './hash.vue'
// import HashList from './hashlist.vue'

export default [{
  path: '/hash/:trans_id',
  name: 'Hash',
  component: (r) => {
    require(["./hash.vue"], r)
  }
}, {
  path: '/hash_list',
  name: 'HashList',
  component: (r) => {
    require(["./hashlist.vue"], r)
  }
}]
