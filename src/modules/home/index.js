import Home from './home.vue'

export default [{
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '*',
    name: '404',
    component: Home
  }
]
