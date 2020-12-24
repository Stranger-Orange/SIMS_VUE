//入口文件，可以全局引入依赖（组件）
import Vue from 'vue'
import App from './App.vue'
import router from './router'

/*安装命令 npm i qs*/
import qs from 'qs'

/*安装命令 npm i aixos*/
import axios from 'axios'

/*安装命令 npm i element-ui -S*/
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$https = axios
Vue.prototype.$qs = qs

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
