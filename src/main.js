import Vue from 'vue'
import Axios from 'axios'
import Buefy from 'buefy'
import VueMoment from 'vue-moment'

import App from './App'
import router from './router'

import 'mdi/css/materialdesignicons.css'

Vue.use(Buefy)
Vue.use(VueMoment)

let baseUrl = process.env.API_URL ? process.env.API_URL : location.protocol + '//' + location.hostname + ':3000/api'
Vue.prototype.$http = Axios.create({
  baseURL: baseUrl
  // headers: {
  //   Authorization: localStorage.getItem('lbt-token')
  // }
})

Vue.prototype.$http.interceptors.request.use(
  config => {
    config.headers.Authorization = localStorage.getItem('lbt-token')
    return config
  },
  error => Promise.reject(error)
)

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
