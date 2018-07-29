<template>
  <section>
    <div class="columns">
      <div class="column is-4">
        <student-profile-card :id="this.$route.params.id"></student-profile-card>
        <br>
        <session-details v-show="showSessionDetails" />
        <br v-show="showSessionDetails">
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
import SessionDetails from '@/components/cards/SessionDetails'
import TimersAndCounters from '@/components/cards/TimersAndCounters'
import TrialsTable from '@/components/cards/TrialsTable'

export default {
  components: {
    StudentProfileCard,
    TimersAndCounters,
    SessionDetails,
    TrialsTable
  },
  data () {
    return {
      showSessionDetails: false,
      showTrials: false
    }
  },
  mounted () {
    this.$root.$on('showSessionDetails', () => {
      this.showSessionDetails = true
    })
  }
}
</script>

<style>

</style>
