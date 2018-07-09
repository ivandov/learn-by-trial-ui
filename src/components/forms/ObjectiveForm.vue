<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">Add New Supplementary Objective</p>
    </header>
    <div class="card-content">
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
    <footer class="card-footer">
      <a class="card-footer-item" @click="addObjective" v-if="create">Add</a>
      <a class="card-footer-item" @click="editObjective" v-else>Edit</a>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'StudentObjectiveAdd',
  props: {
    create: Boolean
  },
  data () {
    return {
      types: [
        'Checkbox',
        'Options'
      ],
      objective: {
        studentId: this.$route.params.id
      }
    }
  },
  mounted () {
    if (!this.create) this.getObjective(this.$route.params.objective_id)
  },
  methods: {
    async addObjective () {
      try {
        let res = await this.$http.post('/objectives', this.objective)

        // Assuming HTTP 2** code
        this.$router.push({name: 'Student', params: { id: this.$route.params.id }})
        this.$emit('notification', {
          msg: 'Supplementary Objective ' + res.data.label + ' has been added successfully with id: ' + res.data.id,
          styleClass: 'is-success'
        })
      }
      catch (error) {
        this.$emit('notification', {
          msg: error.response.data.error.message,
          styleClass: 'is-warning'
        })
      }
    },
    async getObjective (id) {
      try {
        let res = await this.$http.get('/objectives', id)

        // Assuming HTTP 2** code
        this.$router.push({name: 'Student', params: { id: this.$route.params.id }})
        this.$emit('notification', {
          msg: 'Supplementary Objective ' + res.data.label + ' has been added successfully with id: ' + res.data.id,
          styleClass: 'is-success'
        })
      }
      catch (error) {
        this.$emit('notification', {
          msg: error.response.data.error.message,
          styleClass: 'is-warning'
        })
      }
    }
  }
}
</script>

