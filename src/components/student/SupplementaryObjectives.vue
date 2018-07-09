<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">Supplementary Objectives</p>
      <a class="card-header-icon">
        <router-link :to="{name: 'StudentObjective'}" class="button is-pulled-right is-info is-outlined">Add Objective</router-link>
      </a>
    </header>
    <div class="card-content">
      <table class="table is-fullwidth is-hoverable">
        <thead>
          <tr>
            <th>Label</th>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="objective in objectives" :key="objective.id">
            <td>{{ objective.label }}</td>
            <td>{{ objective.type }}</td>
            <td>{{ objective.description }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      objectives: []
    }
  },
  mounted () {
    this.getStudentObjectives(this.$route.params.id)
  },
  methods: {
    async getStudentObjectives (id) {
      let uri = `/students/${id}/objectives`

      try {
        let resp = await this.$http.get(uri)
        this.objectives = resp.data
        console.log(resp)
      }
      catch (e) {
        // alert(e)
        this.$emit('notification', {
          msg: e.response.data.error.message,
          styleClass: 'is-warning'
        })
      }
    }
  }
}
</script>

<style>

</style>
