// import Block from './block.vue'
// import BlockList from './blocklist.vue'
export default [{
  path: '/block/:block_height',
  name: 'Block',
  component: (r) => {
    require(["./block.vue"], r)
  }
}, {
  path: '/block_list',
  name: 'BlockList',
  component: (r) => {
    require(["./blocklist.vue"], r)
  }
}]
