<template>
  <div class="columns is-centered">
    <div class="card column is-three-fifths">
      <div class="card-content">
        <p class="title">Add New Skill Program</p>

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

        <div class="field">
          <label class="label">Proposed Goal Date</label>
          <div class="control">
            <input class="input" type="date" placeholder="01/01/2017" v-model="program.goal_date">
          </div>
        </div>

        <div class="field">
          <label class="label">Description</label>
          <div class="control">
            <textarea class="textarea" placeholder="Learn to differentiate all colors and properly respond to all color related questions" v-model="program.description"></textarea>
          </div>
        </div>

      </div>
      <footer class="card-footer">
        <a class="card-footer-item" @click="addProgram">Add</a>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StudentProgramAdd',
  components: {
  },
  data () {
    return {
      program: {
        studentId: this.$route.params.id
      }
    }
  },
  methods: {
    async addProgram () {
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

