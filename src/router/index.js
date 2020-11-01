import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/components/Welcome'
import TypeElement from '@/components/pages/TypeElement'
import SoundElement from '@/components/pages/SoundElement'
import TypeAnnotation from '@/components/pages/TypeAnnotation'
import SoundAnnotation from '@/components/pages/SoundAnnotation'
import Redirect from '@/components/pages/Redirect.vue'
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
    },
    {
      path: '/sound_element',
      name: 'sound_element',
      component: SoundElement
    },
    {
      path: '/type_annotation',
      name: 'type_annotation',
      component: TypeAnnotation
    },
    {
      path: '/sound_annotation',
      name: 'sound_annotation',
      component: SoundAnnotation
    },
    {
      path: '/redirect',
      name: 'Redirect',
      component: Redirect
    },
  ]
})
