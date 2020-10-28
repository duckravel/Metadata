import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/components/Welcome'
import TypeElement from '@/components/pages/TypeElement'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: Welcome
    },
    {
      path: '/type_element',
      name: 'type_element',
      component: TypeElement
    }
  ]
})
