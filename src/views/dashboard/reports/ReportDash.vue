<template>
  <div class="columns is-multiline">
    <div class="column is-6">
      <!-- <random-chart /> -->
      <appointments-chart />
    </div>
    <div class="column is-6 is-12-tablet">
      <!-- <trial-duration /> -->
      <objectives-chart />
    </div>
  </div>
</template>

<script>
import RandomChart from '@/components/charts/RandomChart'
import AppointmentsChart from '@/components/charts/AppointmentsChart'
import TrialDuration from '@/components/charts/TrialDuration'
import ObjectivesChart from '@/components/charts/ObjectivesChart'

export default {
  components: {
    AppointmentsChart,
    RandomChart,
    TrialDuration,
    ObjectivesChart
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
