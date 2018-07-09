import Vue from 'vue'
import Axios from 'axios'
import Buefy from 'buefy'
import VueMoment from 'vue-moment'

import App from './App'
import router from './router'

import 'mdi/css/materialdesignicons.css'

Vue.use(Buefy)
Vue.use(VueMoment)
Vue.prototype.$http = Axios.create({baseURL: process.env.API_URL})

Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
