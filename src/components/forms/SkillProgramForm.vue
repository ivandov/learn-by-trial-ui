<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">{{title}}</p>
    </header>
    <div class="card-content">
      <div class="field">
        <label class="label">Label</label>
        <div class="control">
          <input class="input" type="text" placeholder="Program label (e.g. Colors)" v-model="program.label">
        </div>
      </div>

      <div class="field">
        <label class="label">Abstract Objective</label>
        <div class="control">
          <input class="input" type="text" placeholder="Classify colors" v-model="program.objective">
        </div>
      </div>

      <b-field label="Start Date">
        <b-datepicker v-model="program.startDate" placeholder="Tap to select...">
          <!-- <button class="button is-primary"
              @click="date = new Date()">
              <b-icon icon="calendar-today"></b-icon>
              <span>Today</span>
          </button> -->
          <button class="button is-danger"
              @click="program.startDate = null">
              <b-icon icon="close"></b-icon>
              <span>Clear</span>
          </button>
        </b-datepicker>
      </b-field>

      <div class="field">
        <label class="label">Description</label>
        <div class="control">
          <textarea class="textarea" placeholder="Learn to differentiate all colors and properly respond to all color related questions" v-model="program.description"></textarea>
        </div>
      </div>
    </div>
    <footer class="card-footer">
      <a class="card-footer-item" @click="createProgram" v-if="create">Add</a>
      <a class="card-footer-item" @click="updateProgram" v-else>Edit</a>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'StudentProgramAdd',
  props: {
    create: Boolean
  },
  data () {
    return {
      program: {
        studentId: this.$route.params.id,
        startDate: new Date()
      },
      title: 'Add New Skill Program'
    }
  },
  mounted () {
    if (!this.create) {
      this.readProgram()
    }
  },
  methods: {
    async createProgram () {
      try {
        let res = await this.$http.post('/programs', this.program)

        // Assuming HTTP 2** code
        this.$router.push({name: 'Student', params: { id: this.$route.params.id }})
        this.$emit('notification', {
          msg: 'Skill Program ' + res.data.label + ' has been added successfully with id: ' + res.data.id,
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
    async readProgram () {
      this.title = 'Skill Program'

      try {
        let res = await this.$http.get(`/programs/${this.$route.params.programId}`)
        this.program = res.data
        this.program.startDate = new Date(this.program.startDate)
      }
      catch (error) {
        this.$emit('notification', {
          msg: error.response.data.error.message,
          styleClass: 'is-warning'
        })
      }
    },
    async updateProgram () {
      try {
        let res = await this.$http.post('/programs', this.program)

        // Assuming HTTP 2** code
        this.$router.push({name: 'Student', params: { id: this.$route.params.id }})
        this.$emit('notification', {
          msg: 'Skill Program ' + res.data.label + ' has been added successfully with id: ' + res.data.id,
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

<style>

</style>
