import Hash from './hash.vue'
import HashList from './hashlist.vue'

export default [{
  path: '/hash/:trans_id',
  name: 'Hash',
  component: Hash
}, {
  path: '/hash_list',
  name: 'HashList',
  component: HashList
}]
