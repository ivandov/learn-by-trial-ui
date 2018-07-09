<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">        
        <router-link :to="homeLink" class="navbar-item has-text-weight-bold">Learn By Trial</router-link>
        <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" v-on:click="showNav = !showNav" v-bind:class="{ 'is-active' : showNav }">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div class="navbar-menu" v-bind:class="{ 'is-active' : showNav }">
        <div class="navbar-end">
          <a class="navbar-item has-text-right" @click="profile">Profile</a>
          <hr class="navbar-divider">
          <a class="navbar-item has-text-right" @click="auth">{{ authText }}</a>
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
        this.authText = 'Login'
        this.$router.replace({name: 'Home'})
      }
    },
    profile () {
      this.$toast.open({
        duration: 3000,
        message: `Profile not implemented yet!`,
        position: 'is-bottom',
        type: 'is-danger'
      })
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
.navbar-burger {
  color: white;
}
</style>