<template>
  <div class="card modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Add Supplementary Objective</p>
    </header>
    <div class="modal-card-body">
      <div class="field">
        <label class="label">Label</label>
        <div class="control">
          <input class="input" type="text" placeholder="Objective label (e.g. Make eye contact)" v-model="objective.label">
        </div>
      </div>

      <div class="field">
        <label class="label">Description</label>
        <div class="control">
          <textarea class="textarea" placeholder="Student maintained eye contact during Trial" v-model="objective.description"></textarea>
        </div>
      </div>

    </div>
    <footer>
      <a class="card-footer-item" @click="addObjective">Add</a>
    </footer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      objective: {
        studentId: this.$route.params.id
      }
    }
  },
  methods: {
    async addObjective () {
      try {
        let res = await this.$http.post('/objectives', this.objective)
        this.$root.$emit('objective', res.data)
        this.$emit('close')
        this.$toast.open({
          duration: 5000,
          message: 'Supplementary Objective ' + res.data.label + ' has been added successfully',
          position: 'is-bottom',
          type: 'is-success'
        })
      }
      catch (error) {
        this.$toast.open({
          duration: 5000,
          message: error.response.data.error.message,
          position: 'is-bottom',
          type: 'is-warning'
        })
      }
    },
    async getObjective (id) {
      try {
        let res = await this.$http.get('/objectives', id)
        console.log(res)
        // Assuming HTTP 2** code
        // this.$router.push({name: 'Student', params: { id: this.$route.params.id }})
      }
      catch (error) {
      }
    }
  }
}
</script>

