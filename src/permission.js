import router from './router'
import store from './store'
import getPageTitle from '@/utils/get-page-title'

import NProgress from 'nprogress' // 访问进度条
import 'nprogress/nprogress.css'
import {getToken} from "@/utils/auth"; // progress bar style

NProgress.configure({showSpinner: false}) // 进度条 NProgress Configuration

// 导航守卫
router.beforeEach(async (to, from, next) => {
    // 开启进度条
    NProgress.start()
    // 根据配置的路由 获取 meta: {title: "xxx"}, 在浏览器顶部标签显示 title
    document.title = getPageTitle(to.meta.title)
    // 把拿到的 title 追加到 灵魂深触-经历网 的前面
    const hasToken = getToken();

    if (hasToken) {
        if (to.path === '/login') {
            // 登录，跳转首页
            next({path: '/'})
            NProgress.done() // 停止进度条
        } else {
            // 获取用户信息
            await store.dispatch('user/getInfo')
            next()
        }
    } else if (!to.meta.requireAuth)
    {
        next()
    }
    else {
        next('/login')
    }
})

router.afterEach(() => {
    // finish progress bar
    NProgress.done()
})
