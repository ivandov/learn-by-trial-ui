<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">{{title}}</p>
    </header>
    <div class="card-content">
      <div class="field">
        <label class="label">Label</label>
        <div class="control">
          <input class="input" type="text" placeholder="Classify Blue" v-model="target.label">
        </div>
      </div>

      <div class="field">
        <label class="label">Prompt Level</label>
        <div class="select is-fullwidth">
          <select v-model="target.promptLevel">
            <option value="0">No Prompting</option>
            <option value="1">Partial Prompting</option>
            <option value="2">Full Prompting</option>
          </select>
        </div>
      </div>

      <b-field label="Start Date">
        <b-datepicker v-model="target.startDate" placeholder="Tap to select...">
          <button class="button is-danger"
              @click="target.startDate = null">
              <b-icon icon="close"></b-icon>
              <span>Clear</span>
          </button>
        </b-datepicker>
      </b-field>

      <div class="field">
        <label class="label">Description</label>
        <div class="control">
          <textarea 
            class="textarea" 
            placeholder="Place multiple objects on table and have student point to the Blue object" 
            v-model="target.description">
          </textarea>
        </div>
      </div>
    </div>
    <footer class="card-footer">
      <a class="card-footer-item" @click="createTarget" v-if="create">Add</a>
      <a class="card-footer-item" @click="updateTarget" v-else>Edit</a>
    </footer>
  </div>
</template>

<script>
export default {
  props: {
    create: Boolean
  },
  data () {
    return {
      target: {
        skillProgramId: this.$route.params.programId,
        startDate: new Date(),
        promptLevel: 0
      },
      title: 'Add New Program Target'
    }
  },
  mounted () {
    console.log('form' + this.create)
    if (!this.create) {
      this.readTarget()
    }
  },
  methods: {
    async createTarget () {
      try {
        let res = await this.$http.post('/targets', this.target)
        this.$emit('notification', {
          msg: 'Skill Program ' + res.data.label + ' has been added successfully with id: ' + res.data.id,
          styleClass: 'is-success'
        })
        location.reload()
      }
      catch (error) {
        this.$emit('notification', {
          msg: error.response.data.error.message,
          styleClass: 'is-warning'
        })
      }
    },
    async readTarget () {
      this.title = 'Skill Program'
      try {
        let res = await this.$http.get(`/targets/${this.$route.params.targetId}`)
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
    async updateTarget () {
      try {
        let res = await this.$http.post('/targets', this.program)

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
