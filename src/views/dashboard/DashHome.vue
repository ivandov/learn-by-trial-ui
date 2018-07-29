<template>
  <div class="columns is-multiline is-mobile is-centered">
    <div class="column is-4-tablet is-12-mobile colored-cards">
      <div class="card has-text-centered colored-card" @click="goToStudents">
        <div class="card-content">
          <p class="is-size-3-tablet is-size-4-mobile">Students</p>
        </div>
      </div>
    </div>
    <div class="column is-4-tablet is-12-mobile colored-cards">
      <div class="card has-text-centered colored-card" @click="goToReports">
        <div class="card-content">
          <p class="is-size-3-tablet is-size-4-mobile">Reports</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Card from '@/components/Card'

export default {
  name: 'DashHome',
  data () {
    return {
    }
  },
  methods: {
    goToStudents () {
      this.$router.push({name: 'Students'})
    },
    goToReports () {
      // this.$toast.open({
      //   duration: 3000,
      //   message: `Reports not implemented yet!`,
      //   position: 'is-bottom',
      //   type: 'is-danger'
      // })
      this.$router.push({name: 'Reports'})
    }
  }
}
</script>