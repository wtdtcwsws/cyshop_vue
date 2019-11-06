import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
      {
          path: '/',
          redirect:'/login'
      },
      {
          name:'login',
          path:'/login',
          component:()=>import('./views/Login')
      },
      {
          name:'luohai',
          path:'/luohai',
          component:()=>import('./views/luohai')
      }
  ]
})
