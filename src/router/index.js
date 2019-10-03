import Vue from 'vue'
import Router from 'vue-router'

const Home = resolve => require(['@/views/Home'], resolve)
const Keyboard = resolve => require(['@/views/Keyboard'], resolve)
const KeyboardHelp = resolve => require(['@/views/KeyboardHelp'], resolve)
const Help = resolve => require(['@/views/Help'], resolve)
const Site = resolve => require(['@/views/Site'], resolve)
const SiteDetail = resolve => require(['@/views/SiteDetail'], resolve)
const All = resolve => require(['@/views/All'], resolve)
const Me = resolve => require(['@/views/Me'], resolve)
const UrlDetail = resolve => require(['@/views/UrlDetail'], resolve)

const Group = resolve => require(['@/views/Group'], resolve)
const GroupDetail = resolve => require(['@/views/GroupDetail'], resolve)
const GroupAdd = resolve => require(['@/views/GroupAdd'], resolve)

const Error404 = resolve => require(['@/views/error/Error404'], resolve)
const OauthCallback = resolve => require(['@/views/oauth/Callback'], resolve)

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
        path: '/sites',
        component: Site
    },
    {
        path: '/sites/:id',
        component: SiteDetail
    },
    {
        path: '/me',
        component: Me
    },
    {
        path: '/urls/:id',
        component: UrlDetail
    },
    {
        path: '/url/add',
        component: UrlDetail
    },
    {
        path: '/all',
        component: All
    },
    {
        path: '/url/group',
        component: Group
    },
    {
        path: '/groups/:id',
        component: GroupDetail
    },
    {
        path: '/group/add',
        component: GroupAdd
    },
    {
        path: '/help',
        component: Help
    },
    {
        path: '/oauth/callback',
        component: OauthCallback
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
