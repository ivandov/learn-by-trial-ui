<template>
  <div id='dashboard'>
    <navbar logged-in></navbar>
    <div id="dashboard-content">
      <div class="container">
        <nav class="breadcrumb is-hidden-mobile" aria-label="breadcrumbs">
          <ul>
            <li v-for="(crumb, index) in breadcrumbs" :key="index" v-bind:class="{'is-active' : index === (breadcrumbs.length-1)}" >
              <a :href="crumb.path" >{{ crumb.name | capitalize }}</a>
            </li>
          </ul> 
        </nav>
        <router-view/>
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
      breadcrumbs: []
    }
  },
  mounted () {
    this.createBreadcrumbs()
  },
  watch: {
    '$route' (to, from) {
      this.createBreadcrumbs()
    }
  },
  methods: {
    createBreadcrumbs () {
      this.breadcrumbs = []
      let paths = this.$route.path.split('/')
      paths.shift()
      let fullpath = ''
      paths.forEach((path) => {
        let p = {}
        p.name = path
        fullpath += '/' + path
        p.path = fullpath
        this.breadcrumbs.push(p)
      })
    }
  }
}
</script>

<style scoped>
.navbar {
  margin-bottom: 40px;
}

#dashboard-content {
    padding: 0px 10px;
}
</style>
