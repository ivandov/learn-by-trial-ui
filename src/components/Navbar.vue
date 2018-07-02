<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">        
        <router-link :to="homeLink" class="navbar-item has-text-weight-bold">Learn By Trial</router-link>
        <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" v-on:click="showNav = !showNav" v-bind:class="{ 'is-active' : showNav }">
        <!-- <div class="navbar-burger" v-on:click="showNav = !showNav" v-bind:class="{ 'is-active' : showNav }"> -->
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div class="navbar-menu" v-bind:class="{ 'is-active' : showNav }">
        <div class="navbar-end">
          <a class="navbar-item" @click="auth">
            {{ authText }}
          </a>
        </div>
      </div>
    </nav>
</template>

<script>

export default {
  name: 'navbar',
  props: {
    'logged-in': Boolean
  },
  data () {
    return {
      homeLink: '/',
      authLink: '/login',
      authText: 'Login',
      showNav: false
    }
  },
  mounted () {
    // if (this['logged-in'] === true) {
    //   this.homeLink = '/dashboard'
    // }
    if (localStorage.authenticated) {
      this.homeLink = '/dashboard'
      this.authLink = '/logout'
      this.authText = 'Logout'
    }
  },
  methods: {
    auth () {
      if (!localStorage.authenticated) {
        this.$router.push({name: 'Login'})
      }
      else {
        // perform logout
        localStorage.removeItem('authenticated')
        this.$router.replace({name: 'Home'})
      }
    }
  }
}
</script>

<style>
.navbar {
  border-radius: 0px;
}

.navbar-item {
  font-weight: bold !important;
  color: white;
}
</style>