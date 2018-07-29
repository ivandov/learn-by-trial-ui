<template>
  <div class="columns">
    <div class="column is-6">
      <!-- <random-chart /> -->
      <appointments-chart />
      
    </div>
    <div class="column is-6">
      <trial-duration />
    </div>
  </div>
</template>

<script>
import RandomChart from '@/components/charts/RandomChart'
import AppointmentsChart from '@/components/charts/AppointmentsChart'
import TrialDuration from '@/components/charts/TrialDuration'
export default {
  components: {
    AppointmentsChart,
    RandomChart,
    TrialDuration
  },
  data () {
    return {
      appointments: [],
      sessions: [],
      trials: []
    }
  },
  created () {
    // let studentId = this.$route.params.id
    // this.fetchAppointments(studentId)
  },
  methods: {
  }
}
</script>

<style>

</style>
