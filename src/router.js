import Vue from 'vue'
import Router from 'vue-router'
import StreamBreak from '@/views/StreamBreak'
import Admin from '@/views/Admin'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', name: 'stream', component: StreamBreak },
    { path: '/admin', name: 'admin', component: Admin }
  ]
})
