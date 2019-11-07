import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        // {
        //   path: '/',
        //   name: 'home',
        //   component: Home
        // },
        // {
        //   path: '/about',
        //   name: 'about',
        //   // route level code-splitting
        //   // this generates a separate chunk (about.[hash].js) for this route
        //   // which is lazy-loaded when the route is visited.
        //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        // }, {
        //       path: '/table',
        //       name: 'table',
        //       component: () => import(/* webpackChunkName: "about" */ './views/Table.vue')
        //   }
        {
            path: '/',
            redirect: '/login'
        },
        {
            name: 'login',
            path: '/login',
            component: () => import('./views/Login')
        },
        {
            name: 'Index',
            path: '/index',
            component: () => import('./views/Main'),
            children: [
                {
                    name: 'home',
                    path: '/home',
                    component: () => import('./views/Home')
                },
                {
                    name: 'about',
                    path: '/about',
                    component: () => import('./views/About')
                },
                {
                    name: 'table',
                    path: '/table',
                    component: () => import('./views/Table')
                }
                // , {
                //     name: 'liuzhi',
                //     path: '/liuzhi',
                //     component: () => import('./views/liuzhi')
                // },
                // {
                //     name: 'wutong',
                //     path: '/wutong',
                //     component: () => import('./views/WuTong')
                // },
                // {
                //     name:'zhy',
                //     path:'/zhy',
                //     component:()=>import('./views/Zhy')
                // }
                ,
                {
                    name: 'table',
                    path: '/table',
                    component: () => import('./views/Table')
                },
                {
                    name: 'orderList',
                    path: '/orders/orderList',
                    component: () => import('./views/orders/OrderList')
                },
                {
                    name: 'orderDetails',
                    path: '/orders/orderDetails',
                    component: () => import('./views/orders/OrderDetails')
                },
                {
                    name: 'refundList',
                    path: '/orders/refundList',
                    component: () => import('./views/orders/RefundList')
                },
                {
                    name: 'refundDetails',
                    path: '/orders/refundDetails',
                    component: () => import('./views/orders/RefundDetails')
                },

                {
                    name: 'catalog',
                    path: '/goods/catalog',
                    component: () => import('./views/goods/Catalog')
                },
                {
                    name: 'goodsList',
                    path: '/goods/list',
                    component: () => import('./views/goods/List')
                },
                {
                    name: 'goodsModel',
                    path: '/goods/model',
                    component: () => import('./views/goods/Model')
                },
                {
                    name:'MemberLevel',
                    path:'/member/memberLevel',
                    component:()=>import('./views/member/MemberLevel')
                },
                {
                    name:'MemberList',
                    path:'/member/memberList',
                    component:()=>import('./views/member/MemberList')
                },
                {
                    name:'CommodityStore',
                    path:'/goods/commodityStore',
                    component:()=>import('./views/goods/CommodityStore'),

                },
                {
                    name:'comment',
                    path:'/comment',
                    component:()=>import('./views/Comment'),

                }
                ]
        }

    ]
})
