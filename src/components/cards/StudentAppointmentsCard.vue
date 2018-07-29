<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">Appointments</p>
      <a class="card-header-icon">
        <button class="button is-info" @click="createAppointment">Add Appointment</button>
      </a>
    </header>
    <div class="card-content">
      <b-table :data="appointments">
        <template slot-scope="props">
          <b-table-column field="date" label="Date & Time">
            {{ props.row.date | moment("MM/DD/YYYY hh:mm a") }}
          </b-table-column>

          <b-table-column field="duration" label="Duration (minutes)" sortable>
            {{ calculateDuration(props.row) }}
          </b-table-column>

          <b-table-column field="sessions" label="Sessions">
            {{ props.row.sessions.length }}
          </b-table-column>
        </template>

        <template slot="empty">
          <div class="content has-text-grey has-text-centered">
            <b-icon icon="emoticon-sad" size="is-medium"></b-icon>
            <p>Nothing here.</p>
          </div>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      appointments: []
    }
  },
  mounted () {
    this.getStudentAppointments(this.$route.params.id)
  },
  methods: {
    async createAppointment () {
      let uri = '/appointments/'

      let appointment = {
        date: Date.now(),
        studentId: this.$route.params.id
      }

      let appRes = await this.$http.post(uri, appointment)

      this.$router.push({
        name: 'AppointmentMain',
        params: {
          id: appRes.data.studentId.toString(),
          appointmentId: appRes.data.id
        }
      })
    },

    async getStudentAppointments (id) {
      let uri = `/students/${id}/appointments?filter[include]=sessions`

      try {
        let resp = await this.$http.get(uri)
        this.appointments = resp.data
      }
      catch (e) {
        this.$toast.open({
          duration: 3000,
          message: e.response.data.error.message,
          position: 'is-bottom',
          type: 'is-danger'
        })
      }
    },

    calculateDuration (session) {
      // console.log(session)
      let duration = new Date(session.endDate) - new Date(session.date)
      let seconds = Math.floor(duration / 1000)
      let minutes = Math.ceil(seconds / 60)

      if (isNaN(minutes)) return 'Uncompleted'

      return minutes
    }
  }
}
</script>
