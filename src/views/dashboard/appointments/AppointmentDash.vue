<template>
  <section>
    <div class="columns">
      <div class="column is-4">
        <student-profile-card :id="this.$route.params.id"></student-profile-card>
        <div v-if="showSessionDetails">
          <br>
          <session-details v-if="showSessionDetails" />
          <br v-if="showSessionDetails">
          <timers-and-counters />
        </div>
      </div>
      <div class="column is-8">
        <router-view></router-view>
      </div>
    </div>
  </section>
</template>

<script>
import StudentProfileCard from '@/components/cards/StudentProfileCard'
import SessionDetails from '@/components/cards/SessionDetails'
import TimersAndCounters from '@/components/cards/TimersAndCounters'

export default {
  components: {
    StudentProfileCard,
    TimersAndCounters,
    SessionDetails
  },
  data () {
    return {
      // showSessionDetails: false
    }
  },
  computed: {
    showSessionDetails: function () {
      // console.log('hi')
      if (this.$route.name === 'SessionPrograms' || this.$route.name === 'SessionTrial') return true
      else return false
    }
  },
  mounted () {
    console.log(this.$route)
    // this.$root.$on('showSessionDetails', () => {
    //   this.showSessionDetails = true
    // })
  }
}
</script>

<style>

</style>
