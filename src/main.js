// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faUserSecret,fab, fas, far)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false
/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  components: { App },
  // data(){return {userid:'123'}},
  template: '<App/>',
  created() {
    
  Vue.prototype.userid='123'
  },
})
