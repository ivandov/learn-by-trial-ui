<template>
  <div id="app">
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
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
  @import "@/assets/styles.scss";
</style>