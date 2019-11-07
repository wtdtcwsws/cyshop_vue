import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
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
                    name: '404',
                    path: '/404',
                    component: () => import('@/components/layout/404')
                },
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
                ,
                {
                    name: 'table',
                    path: '/table',
                    component: () => import('./views/Table')
                },{
                    name: 'orderList',
                    path: '/orders/orderList',
                    component: () => import('./views/OrderList')
                },{
                    name: 'orderDetails',
                    path: '/orders/orderDetails',
                    component: () => import('./views/OrderDetails')
                },
                {
                    name: 'catalog',
                    path: '/goods/catalog',
                    component: () => import('./views/goods/Catalog')
                }
                ,
                {
                    name: 'rolelists',
                    path: '/rolelists',
                    component: () => import('./views/role/RoleList')
                }
                ,
                {
                    name: 'userlists',
                    path: '/userlists',
                    component: () => import('./views/role/UserList')
                }
            ]
        }

    ]
})
