<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">Skill Programs</p>
      <a class="card-header-icon">
        <router-link :to="{name: 'StudentProgramAdd'}" class="button is-info">Add Skill Program</router-link>
      </a>
    </header>
    <div class="card-content">
      <b-table :data="programs">
        <template slot-scope="props">
          <b-table-column field="id" label="Label">
            <router-link :to="{name: 'StudentProgramEdit', params: {id: $route.params.id, programId: props.row.id}}">{{props.row.label}}</router-link>
          </b-table-column>

          <b-table-column field="objective" label="Objective">
            {{ props.row.objective }}
          </b-table-column>

          <b-table-column field="targets" label="Targets">
            {{ props.row.targets.length }}
          </b-table-column>

          <b-table-column field="startDate" label="Start Date">
              {{ new Date(props.row.startDate).toLocaleDateString() }}
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
      programs: []
    }
  },
  mounted () {
    this.getStudentPrograms(this.$route.params.id)
  },
  methods: {
    async getStudentPrograms (id) {
      let uri = `/students/${id}/programs?filter[include]=targets`

      try {
        let resp = await this.$http.get(uri)
        this.programs = resp.data
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
