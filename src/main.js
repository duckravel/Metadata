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
  this.$http.get(process.env.APIGET).then(res=>{
    let user = res.data;
    Vue.prototype.$userid = user.userid;
    Vue.prototype.$firCase = user.firCase;
    Vue.prototype.$secCase = user.secCase;
    Vue.prototype.$case={isFin:false};
    Vue.prototype.$timelog=[];
    Vue.prototype.$info = {};
    let time = new Date(); let date ={Year:time.getFullYear(),Month:time.getMonth()+1,Day:time.getDate()};
    this.$info.user={userid:this.$userid,date:`${date.Year}/${date.Month}/${date.Day}`,scenario1:`${this.$firCase}`,scenario2:`${this.$secCase}`,s1Time:0,s2Time:0};
    this.$info.meta={userid:this.$userid,anno_1:'',anno_2:'',anno_3:'',anno_4:'',anno_5:'',ele_1:'',ele_2:'',ele_3:'',ele_4:'',ele_5:''};
  })  
  },
})
