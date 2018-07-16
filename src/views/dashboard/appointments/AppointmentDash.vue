<template>
  <section>
    <div class="columns">
      <div class="column is-4">
        <student-profile-card :id="this.$route.params.id"></student-profile-card>
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
import StudentProfileCard from '@/components/cards/StudentProfileCard'
import TimersAndCounters from '@/components/cards/TimersAndCounters'

export default {
  components: {
    StudentProfileCard,
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
