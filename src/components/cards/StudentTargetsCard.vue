<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">Program Targets</p>
      <a class="card-header-icon">
        <!-- <router-link :to="{name: 'StudentTargetAdd'}" class="button is-info">Add Target</router-link> -->
        <button class="button is-info" @click="showTargetModal">Add Target</button>
      </a>
    </header>
    <div class="card-content">
      <!-- <b-table :data="targets" default-sort="startDate" detailed detail-key="id"> -->
      <b-table :data="targets" default-sort="startDate" striped hoverable>
        <template slot-scope="props">
          <b-table-column field="id" label="Label">
            <!-- <router-link :to="{name: 'StudentProgramEdit', params: {id: $route.params.id, programId: props.row.id}}">{{props.row.label}}</router-link> -->
            {{props.row.label}}
          </b-table-column>
          <b-table-column field="startDate" label="Start Date" sortable>
              {{ new Date(props.row.startDate).toLocaleDateString() }}
          </b-table-column>
          <b-table-column field="description" label="Description" width="300">
              {{props.row.description}}
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
import TargetForm from '@/components/forms/TargetForm.vue'

export default {
  props: {
    programId: ''
  },
  data () {
    return {
      targets: []
    }
  },
  mounted () {
    // this.getStudentPrograms(this.programId)
    // this.$root.$on('updateTargets', program => {
    //   console.log(program)
    //   this.getStudentPrograms(program.id)
    // })
    this.getStudentProgramTargets(this.programId)

    this.$root.$on('target', target => {
      // console.log(program)
      this.targets.push(target)
    })
  },
  methods: {
    async getStudentProgramTargets (id) {
      let uri = `/programs/${id}/targets`

      try {
        let resp = await this.$http.get(uri)
        this.targets = resp.data
      }
      catch (e) {
        // alert(e)
        this.$emit('notification', {
          msg: e.response.data.error.message,
          styleClass: 'is-warning'
        })
      }
    },

    showTargetModal () {
      this.$modal.open({
        parent: this,
        component: TargetForm,
        hasModalCard: true
      })
    }
  },
  watch: {
    programId: function (progId) {
      this.getStudentProgramTargets(progId)
    }
  }
}
</script>

<style>

</style>
