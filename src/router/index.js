import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home')
    },
    {
        path: "/register",
        name: "register",
        component: () => import("@/views/auth/Register"),
        meta: {title: "注册"},
    },
    {
        path: "/404",
        name: "404",
        component: () => import("@/views/error/FourOFour"),
        meta: {title: "404-NotFound"},
    },
    {  // 主要输入的是无效的地址，重室向到 404 页面
        path: "*",
        redirect: "/404",
        hidden: true,
    }
]

const router = new VueRouter({
    routes
})

export default router
