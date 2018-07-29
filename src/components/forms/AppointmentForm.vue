<template>
  <div class="card modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Optional Appointment Information</p>
    </header>
    <div class="modal-card-body">
      <p>These fields are optional, but may be useful for future review</p>
      <br>
      <div class="field">
        <label class="label">Notes</label>
        <div class="control">
          <textarea class="textarea" v-model="appointment.notes"></textarea>
        </div>
      </div>

    </div>
    <footer>
      <a class="card-footer-item" @click="completeAppointment">Complete Appointment</a>
    </footer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      appointment: {
        id: this.$route.params.appointmentId,
        notes: undefined
      }
    }
  },
  methods: {
    async completeAppointment () {
      let uri = `/appointments/${this.appointment.id}`
      try {
        this.appointment.endDate = Date.now()
        await this.$http.patch(uri, this.appointment)
        this.$emit('close')
        this.$router.push({name: 'Appointments'})
      }
      catch (e) {
        this.$toast.open({
          duration: 5000,
          message: `Error completing appointment: ${e.message}`,
          position: 'is-bottom',
          type: 'is-danger'
        })
      }
    }
  }
}
</script>

<style>

</style>
