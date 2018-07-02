<template>
  <div id='dashboard'>
    <navbar logged-in></navbar>
    <div id="dashboard-content">
      <div class="container">
        <nav class="breadcrumb is-hidden-mobile" aria-label="breadcrumbs">
          <ul>
            <li v-for="(crumb, index) in breadcrumbs" :key="crumb.name" v-bind:class="{'is-active' : index === (breadcrumbs.length-1)}" >
              <a :href="crumb.path" >{{ crumb.name | capitalize }}</a>
            </li>
          </ul> 
        </nav>
        
        <div class="notification" v-bind:class="[{ 'is-hidden': notification.hidden }, notification.styleClass]">
          <button class="delete is-large" @click="notification.hidden = !notification.hidden"></button>
          {{ notification.message }}
        </div>

        <router-view v-on:notification="handleNotification"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
  name: 'dashboard',
  components: {
    Navbar
  },
  data () {
    return {
      notification: {
        hidden: true,
        styleClass: '',
        message: 'Default Notification - You should not see this!'
      },
      breadcrumbs: []
    }
  },
  mounted () {
    this.createBreadcrumbs()
  },
  methods: {
    handleNotification (notification) {
      // alert('Received emitted alert')
      this.notification.hidden = false
      this.notification.styleClass = notification.styleClass
      this.notification.message = notification.msg
    },
    createBreadcrumbs () {
      let paths = this.$route.path.split('/')
      paths.shift()
      let fullpath = ''
      paths.forEach((path) => {
        console.log(path)
        let p = {}
        p.name = path
        fullpath += '/' + path
        p.path = fullpath

        console.log(p)

        this.breadcrumbs.push(p)
      })
      console.log(this.breadcrumbs)
    }
  }
}
</script>

<style scoped>
.navbar {
  margin-bottom: 40px;
}

@media screen and (max-width: 768px) {
  #dashboard-content {
     margin: 0px 10px;
  }
}
</style>
