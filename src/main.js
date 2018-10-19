import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

const app = new Vue({
  router,
  render: h => h(App)
})

app.$mount('#app')

window.app = app
