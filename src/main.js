import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 全局样式文件
import '@/assets/app.css'
import '@/permission'

// 2.又一日期格式化组件
import format from 'date-fns/format'

// 1.日期格式化第三方库
import relativeTime from 'dayjs/plugin/relativeTime';
// 国际化
import 'dayjs/locale/zh-cn'
const dayjs = require('dayjs');

// 相对时间插件
dayjs.extend(relativeTime)

dayjs.locale('zh-cn') // use locale globally
dayjs().locale('zh-cn').format() // use locale in a specific instance

Vue.prototype.dayjs = dayjs;//可以全局使用dayjs


// 2.又一日期格式化组件
Vue.filter('date', (date) => {
    return format(new Date(date), 'yyyy-MM-dd')
})

Vue.use(Buefy);
Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
