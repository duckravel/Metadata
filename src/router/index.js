import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/components/pages/Welcome'
import mictest from '@/components/mictest'
import TypeElement from '@/components/pages/TypeElement'
import speechElement from '@/components/pages/speechElement'
import TypeAnnotation from '@/components/pages/TypeAnnotation'
import speechAnnotation from '@/components/pages/speechAnnotation'
import Redirect from '@/components/pages/Redirect.vue'
import QUE from '@/components/pages/QUE.vue'
import help from '@/components/pages/help.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {path:'*',
    redirect:'welcome'},
    {
      path: '/welcome',
      name: 'welcome',
      component: Welcome
    },
    {
      path: '/mictest',
      name: 'mictest',
      component: mictest
    },
    {
      path: '/help',
      name: 'help',
      component: help
    },
    {
      path: '/type_element',
      name: 'type_element',
      component: TypeElement
    },
    {
      path: '/speech_element',
      name: 'speech_element',
      component: speechElement
    },
    {
      path: '/type_annotation',
      name: 'type_annotation',
      component: TypeAnnotation
    },
    {
      path: '/speech_annotation',
      name: 'speech_annotation',
      component: speechAnnotation
    },
    {
      path: '/redirect',
      name: 'Redirect',
      component: Redirect
    },
    {
      path: '/survey',
      name: 'survey',
      component: QUE,
    },
  ]
})
