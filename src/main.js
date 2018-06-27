import Vue from 'vue'
import App from './App'
import router from './router'

// import 'bulma/css/bulma.css'
// import 'bulmaswatch/minty/_variables.scss'
// import 'bulmaswatch/minty/_overrides.scss'
import 'bulmaswatch/minty/bulmaswatch.min.css'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
