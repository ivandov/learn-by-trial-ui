<template>
  <div class="columns is-multiline">
    <div class="column is-6">
      <appointment-details-chart />
    </div>
    <div class="column is-6">
      <session-details-chart />
    </div>
    <div class="column is-6 is-12-tablet">
      <!-- <trial-duration /> -->
      <objectives-chart />
    </div>
  </div>
</template>

<script>
import AppointmentDetailsChart from '@/components/charts/AppointmentDetailsChart'
import SessionDetailsChart from '@/components/charts/SessionDetailsChart'
import TrialDuration from '@/components/charts/TrialDuration'
import ObjectivesChart from '@/components/charts/ObjectivesChart'

export default {
  components: {
    AppointmentDetailsChart,
    SessionDetailsChart,
    TrialDuration,
    ObjectivesChart
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style>

</style>
