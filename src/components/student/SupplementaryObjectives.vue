<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">Supplementary Objectives</p>
      <a class="card-header-icon">
        <router-link :to="{name: 'StudentObjectiveAdd'}" class="button is-pulled-right is-info">Add Objective</router-link>
      </a>
    </header>
    <div class="card-content">
      <b-table :data="objectives">
        <template slot-scope="props">
          <b-table-column field="label" label="Label">
            {{ props.row.label }}
          </b-table-column>

          <b-table-column field="description" label="Description">
            {{ props.row.description }}
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
