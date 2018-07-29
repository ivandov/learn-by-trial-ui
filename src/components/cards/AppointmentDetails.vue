<template>
  <b-collapse class="card">
    <div slot="trigger" slot-scope="props" class="card-header">
        <p class="card-header-title">Appointment Details</p>
        <a class="card-header-icon">
          <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"></b-icon>
        </a>
    </div>
    <div class="card-content">
      <div style="margin-bottom:10px;">
        <span>Started: </span>
        <div class="is-pulled-right">
          {{appointment.date | moment("MM/DD/YYYY hh:mm a")}}
        </div>
      </div>

      <!-- <div style="margin-bottom:10px;">
        <span>Sessions: </span>
        <div class="is-pulled-right">
          {{appointment.sessions.length}}
        </div>
      </div> -->

      <button class="button is-success is-fullwidth" @click="completeSession">Complete Appointment</button>
    </div>
  </b-collapse>
</template>

<script>
import AppointmentForm from '@/components/forms/AppointmentForm'
import Stopwatch from '@/components/Stopwatch'
export default {
  components: {
    AppointmentForm,
    Stopwatch
  },
  data () {
    return {
      appointment: {
        sessions: []
      }
    }
  },
  mounted () {
    this.getAppointment()
  },
  methods: {
    async getAppointment () {
      let appointmentId = this.$route.params.appointmentId

      try {
        let resp = await this.$http.get(`/appointments/${appointmentId}?filter[include]=sessions`)
        this.appointment = resp.data
        console.log(resp.data)
      }
      catch (e) {
        this.$toast.open({
          duration: 5000,
          message: e.response.data.error.message,
          position: 'is-bottom',
          type: 'is-warning'
        })
      }
    },

    completeSession () {
      this.$modal.open({
        parent: this,
        component: AppointmentForm,
        hasModalCard: true
      })
    }
  }
}
</script>

<style scoped>
</style>
