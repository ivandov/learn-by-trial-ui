<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <!-- <router-link :to="homeLink" class="navbar-item has-text-weight-bold">Learn By Trial</router-link> -->
        <router-link :to="homeLink" class="navbar-item has-text-weight-bold">
          <b-icon icon="home"></b-icon>
        </router-link>
        <router-link :to="homeLink" class="navbar-item has-text-weight-bold">Learn By Trial</router-link>
        <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" v-on:click="showNav = !showNav" v-bind:class="{ 'is-active' : showNav }">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div class="navbar-menu" v-bind:class="{ 'is-active' : showNav }">
        <div class="navbar-end">
          <a class="navbar-item has-text-right" @click="profile" v-if="showProfile">Profile</a>
          <hr class="navbar-divider">
          <a class="navbar-item has-text-right" @click="auth">{{ authText }}</a>
        </div>
      </div>

      <!-- <b-dropdown>
        <button class="button is-primary" slot="trigger">
            <span>Click me!</span>
            <b-icon icon="menu-down"></b-icon>
        </button>

        <b-dropdown-item>Action</b-dropdown-item>
        <b-dropdown-item>Another action</b-dropdown-item>
        <b-dropdown-item>Something else</b-dropdown-item>
      </b-dropdown> -->

      <!-- <div class="navbar-menu">
            <div class="navbar-end">
                <b-dropdown v-model="navigation" position="is-bottom-left">
                    <a class="navbar-item" slot="trigger">
                        <span>Menu</span>
                        <b-icon icon="menu-down"></b-icon>
                    </a>

                    <b-dropdown-item custom>
                        Logged in as <b>Admin</b>
                    </b-dropdown-item>
                    <hr class="dropdown-divider">
                    <b-dropdown-item value="settings">
                        <b-icon icon="account"></b-icon>
                        Profile
                    </b-dropdown-item>
                    <b-dropdown-item value="logout">
                        <b-icon icon="logout"></b-icon>
                        Logout
                    </b-dropdown-item>
                </b-dropdown>
            </div>
        </div> -->

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
      showNav: false,
      showProfile: localStorage.getItem('authenticated')
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
        this.doLogout()
      }
    },
    profile () {
      alert(`Token: ${localStorage.getItem('lbt-token')}`)
      this.$toast.open({
        duration: 3000,
        message: `Profile not implemented yet!`,
        position: 'is-bottom',
        type: 'is-danger'
      })
    },
    async doLogout () {
      try {
        if (localStorage.getItem('lbt-token') !== null) {
          let uri = `/analyst/logout?access_token=${localStorage.getItem('lbt-token')}`
          let res = await this.$http.post(uri)
          console.log(res)
        }

        localStorage.removeItem('authenticated')
        localStorage.removeItem('lbt-token')
        this.authText = 'Login'

        this.$toast.open({
          duration: 5000,
          message: 'Successfully logged out',
          position: 'is-bottom',
          type: 'is-warning'
        })

        this.$router.replace({name: 'Home'})
      }
      catch (e) {
        this.$toast.open({
          duration: 5000,
          message: e.response.data.error.message,
          position: 'is-bottom',
          type: 'is-danger'
        })
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
.navbar-item:hover{
  background-color: rgba(0, 0, 0, 0.05) !important;
}
.navbar-burger {
  color: white;
}

/* @media screen and (max-width: 1087px) {
  .navbar .navbar-menu .navbar-end {
    width: 200px;
    float: right;
    background-color: #6abfb0;
  }
} */

</style>