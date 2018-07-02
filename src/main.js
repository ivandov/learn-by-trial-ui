import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import VueMoment from 'vue-moment'

// import 'bulma/css/bulma.css'
// import 'bulmaswatch/minty/_variables.scss'
// import 'bulmaswatch/minty/_overrides.scss'
import 'bulmaswatch/minty/bulmaswatch.min.css'
// import 'bulma-checkradio/dist/css/bulma-checkradio.min.css'

const axios = Axios.create({
  baseURL: process.env.API_URL
})
Vue.prototype.$http = axios

Vue.use(VueMoment)

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
