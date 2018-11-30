import Block from './block.vue'
import BlockList from './blocklist.vue'
export default [{
  path: '/block/:block_height',
  name: 'Block',
  component: Block
}, {
  path: '/block_list',
  name: 'BlockList',
  component: BlockList
}]
