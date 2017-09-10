import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App.vue'
import Client from './Client.vue'
import Admin from './Admin.vue'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', component: Client },
        { path: '/admin', component: Admin }
    ]
})

window.app = new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
