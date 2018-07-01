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

<style>
html{
  background-color: #E3F3F0;
}
</style>

