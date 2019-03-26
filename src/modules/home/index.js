import Home from './home.vue'

export default [{
    path: '/',
    name: 'Home',
    component: (r) => {
      require(["./home.vue"], r)
    }
  },
  {
    path: '*',
    name: '404',
    component: Home
  }
]
