// import Address from './address.vue'

export default [{
  path: '/address/:address_name',
  name: 'Address',
  component: (r) => {
    require(["./address.vue"], r)
  }
}]
