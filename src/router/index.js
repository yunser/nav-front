import Vue from 'vue'
import Router from 'vue-router'

const Home = resolve => require(['@/views/Home'], resolve)
const Keyboard = resolve => require(['@/views/Keyboard'], resolve)
const KeyboardHelp = resolve => require(['@/views/KeyboardHelp'], resolve)
const Help = resolve => require(['@/views/Help'], resolve)
const All = resolve => require(['@/views/All'], resolve)
const Error404 = resolve => require(['@/views/error/Error404'], resolve)

Vue.use(Router)

let routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/keyboard',
        component: Keyboard
    },
    {
        path: '/keyboard/help',
        component: KeyboardHelp
    },
    {
        path: '/all',
        component: All
    },
    {
        path: '/help',
        component: Help
    },
    {
        path: '*',
        component: Error404
    }
]

let router = new Router({
    mode: 'history',
    routes: routes,
    scrollBehavior (to, from, savedPosition) {
        return {
            x: 0,
            y: 0
        }
    }
})

export default router
