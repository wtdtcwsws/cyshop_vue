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
                }
            ]
        }

    ]
})
