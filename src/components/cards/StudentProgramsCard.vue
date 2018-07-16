<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">Skill Programs</p>
      <a class="card-header-icon">
        <!-- <router-link :to="{name: 'StudentProgramAdd'}" class="button is-info">Add Skill Program</router-link> -->
        <button class="button is-info" @click="showAddProgramModal">Add Skill Program</button>
      </a>
    </header>
    <div class="card-content">
      <b-table :data="programs" hoverable striped :selected.sync="selected">
        <template slot-scope="props">
          <b-table-column field="id" label="Program Label">
            <!-- <router-link :to="{name: 'StudentProgram', params: {id: $route.params.id, programId: props.row.id}}">{{props.row.label}}</router-link> -->
            <a @click="selected = props.row">{{props.row.label}}</a>
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

        <!-- <template slot="detail" slot-scope="props">
          <p>{{props.row.description}}</p>
        </template> -->
      </b-table>
    </div>
  </div>
</template>

<script>
import SkillProgramForm from '@/components/forms/SkillProgramForm.vue'

export default {
  data () {
    return {
      programs: [],
      selected: {}
    }
  },
  mounted () {
    this.getStudentPrograms(this.$route.params.id)

    this.$root.$on('program', program => {
      console.log(program)
      this.programs.push(program)
    })
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
    },

    showAddProgramModal () {
      this.$modal.open({
        parent: this,
        component: SkillProgramForm,
        hasModalCard: true
      })
    }
  },
  watch: {
    selected: function (selectedProgram) {
      this.$root.$emit('updateTargets', {
        id: selectedProgram.id
      })
    }
  }
}
</script>

<style>

</style>
