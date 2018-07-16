<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">Supplementary Objectives</p>
      <a class="card-header-icon">
        <button class="button is-info" @click="showObjectiveModal">Add Objective</button>
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
import ObjectiveForm from '@/components/forms/ObjectiveForm.vue'

export default {
  data () {
    return {
      objectives: []
    }
  },
  mounted () {
    this.getStudentObjectives(this.$route.params.id)

    this.$root.$on('objective', objective => {
      this.objectives.push(objective)
    })
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
        this.$toast.open({
          duration: 3000,
          message: e.response.data.error.message,
          position: 'is-bottom',
          type: 'is-danger'
        })
      }
    },
    showObjectiveModal () {
      this.$modal.open({
        parent: this,
        component: ObjectiveForm,
        hasModalCard: true
      })
    }
  }
}
</script>
