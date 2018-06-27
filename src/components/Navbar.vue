<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="/">
          Learn By Trial
        </a>

        <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" v-on:click="showNav = !showNav" v-bind:class="{ 'is-active' : showNav }">
        <!-- <div class="navbar-burger" v-on:click="showNav = !showNav" v-bind:class="{ 'is-active' : showNav }"> -->
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div class="navbar-menu" v-bind:class="{ 'is-active' : showNav }">
        <div class="navbar-end">
          <a class="navbar-item">
            Login
          </a>
        </div>
      </div>
    </nav>
</template>

<script>

export default {
  name: 'navbar',
  data () {
    return {
      showNav: false
    }
  }
}
</script>

<style>
.navbar {
  border-radius: 0px;
}
</style>