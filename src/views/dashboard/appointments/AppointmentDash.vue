<template>
  <section>
    <div class="columns">
      <div class="column is-4">
        <student-profile :id="this.$route.params.id"></student-profile>
        <br>
        <timers-and-counters />
      </div>
      <div class="column is-8">
        <router-view></router-view>  
      </div>
    </div>
  </section>
</template>

<script>
import StudentProfile from '@/components/student/Profile'
import TimersAndCounters from '@/components/cards/TimersAndCounters'

export default {
  components: {
    StudentProfile,
    TimersAndCounters
  },
  data () {
    return {
    }
  }
}
</script>

<style>

</style>
