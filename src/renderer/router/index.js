import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/views/Login').default
    },
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/main',
      name: 'main-page',
      component: require('@/views/Main').default
    }
  ]
})
