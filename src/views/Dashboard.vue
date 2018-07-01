<template>
  <div id='dashboard'>
    <navbar></navbar>
    <section id="dashboard-content">
      <div class="container">
        <div class="notification" v-bind:class="[{ 'is-hidden': notification.hidden }, notification.styleClass]">
          <button class="delete" @click="notification.hidden = !notification.hidden"></button>
          {{ notification.message }}
        </div>
        <router-view v-on:notification="handleNotification"></router-view>
      </div>
    </section>
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
        message: 'This is a notification message'
      }
    }
  },
  methods: {
    handleNotification (notification) {
      alert('Received emitted alert')
      this.notification.hidden = false
      this.notification.styleClass = notification.styleClass
      this.notification.message = notification.msg
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
