// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App'
import 'bootstrap';
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUserSecret,fab, fas, far)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(VueAxios, axios)
Vue.config.productionTip = false
/* eslint-disable no-new */



new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  created() {
  this.$http.get('http://localhost:3000/restful/user').then(res=>{
    let user = res.data;
    Vue.prototype.$userid = user.userid;
    Vue.prototype.$firCase = user.firCase;
    Vue.prototype.$secCase = user.secCase;
    Vue.prototype.$case={isFin:false};
    Vue.prototype.$info = {};
    let time = new Date(); let date ={Year:time.getFullYear(),Month:time.getMonth()+1,Day:time.getDate()};
    this.$info.user={userid:this.$userid,date:`${date.Year}/${date.Month}/${date.Day}`,scenario1:`${this.$firCase}`,scenario2:`${this.$secCase}`};
    console.log(this.$userid,this.$firCase,this.$secCase);
  })  
  },
})
