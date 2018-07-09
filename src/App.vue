<template>
  <div id="app">
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
// import SideMenu from '@/components/SideMenu'

export default {
  name: 'app',
  components: {
    Navbar
  }
}
</script>

<style lang="scss">
  @import "~bulmaswatch/minty/_variables";
  @import "~bulma";
  @import "~buefy/src/scss/buefy";
  @import "~bulmaswatch/minty/_overrides";
</style>

<style>
html{
  background-color: #E3F3F0;
}

#app {
  margin-bottom: 10px;
}
</style>

