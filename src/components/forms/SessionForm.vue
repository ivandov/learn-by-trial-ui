<template>
  <div class="card modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Optional Session Information</p>
    </header>
    <div class="modal-card-body">
      <p>These fields are optional, but may be useful for future review</p>
      <br>
      <div class="field">
        <label class="label">Label</label>
        <div class="control">
          <input class="input" type="text" placeholder="Colors Session" v-model="session.label">
        </div>
      </div>

      <div class="field">
        <label class="label">Notes</label>
        <div class="control">
          <textarea class="textarea" v-model="session.notes"></textarea>
        </div>
      </div>

    </div>
    <footer>
      <a class="card-footer-item" @click="completeSession">Complete Session</a>
    </footer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      session: {
        id: this.$route.params.sessionId,
        label: undefined,
        notes: undefined
      }
    }
  },
  methods: {
    async completeSession () {
      let uri = `/sessions/${this.session.id}`
      try {
        this.session.endDate = Date.now()
        await this.$http.patch(uri, this.session)
        this.$emit('close')
        this.$router.push({name: 'AppointmentMain'})
      }
      catch (e) {
        this.$toast.open({
          duration: 5000,
          message: `Error completing session: ${e.message}`,
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
