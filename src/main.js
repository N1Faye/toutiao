import Vue from 'vue'
import App from '@/App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
// import 'vant/lib/index.css'
import 'vant/lib/index.less'
import 'amfe-flexible'
import '@/styles/index.less'
import MyIcon from '@/components/MyIcon.vue'
import * as obj from '@/filters/index'

// Object.key()可以将obj内key组合成一个新数组
Object.keys(obj).forEach(key => {
  Vue.filter(key, obj[key])
})
Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  MyIcon,
  render: h => h(App)
}).$mount('#app')
