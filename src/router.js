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
          name:'Main',
          path:'/main',
          component:()=>import('./views/Main'),

      },
      {
          name:'About',
          path:'/about',
          component:()=>import('./views/About'),

      },
      {
          name:'MemberLevel',
          path:'/level',
          component:()=>import('./views/member/MemberLevel'),

      },
      {
          name:'MemberList',
          path:'/member',
          component:()=>import('./views/member/MemberList')
      },
      {
          name:'CommodityStore',
          path:'/store',
          component:()=>import('./views/CommodityStore'),

      }]
})
