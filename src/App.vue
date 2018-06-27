<template>
  <div id="app">
    <navbar></navbar>
    
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
    // SideMenu
  }
}
</script>
