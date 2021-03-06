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
    // 登录
    {
        name: "login",
        path: "/login",
        component: () => import("@/views/auth/Login"),
        meta: {title: "登录"},
    },
    {
        path: "/404",
        name: "404",
        component: () => import("@/views/error/404"),
        meta: {title: "404"},
    },
    {  // 主要输入的是无效的地址，重室向到 404 页面
        path: "*",
        redirect: "/404",
        hidden: true,
    },
    // 发布
    {
        name: "post-create",
        path: "/post/create",
        component: () => import("@/views/post/Create"),
        meta: {title: "信息发布", requireAuth: true},
    },
    // 详情
    {
        name: "post-detail",
        path: "/post/:id",
        component: () => import("@/views/post/Detail"),
        meta: {title: "详情"},
    },
    // 编辑
    {
        name: 'topic-edit',
        path: '/topic/edit/:id',
        component: () => import('@/views/post/Edit'),
        meta: {
            title: '编辑',
            requireAuth: true
        }
    },
    // 标签
    {
        name: 'tag',
        path: '/tag/:name',
        component: () => import('@/views/tag/Tag'),
        meta: {title: '主题列表'}
    },
    // 检索
    {
        name: 'search',
        path: '/search',
        component: () => import('@/views/Search'),
        meta: {title: '检索'}
    }
]

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch((err) => err);
};

const router = new VueRouter({
    routes
})

export default router
