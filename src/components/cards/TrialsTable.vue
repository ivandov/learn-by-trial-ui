<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">Sessions</p>
      <div class="card-header-icon">
        <!-- <button class="button is-info is-outlined" @click="isSessionModalActive = true">Add Session</button> -->
        <button class="button is-info" @click="createTrial">Add Trial</button>
      </div>
    </header>
    <div class="card-content">
      <b-table :data="trials" default-sort="startDate" detail-key="id">

        <template slot="empty">
          <div class="content has-text-grey has-text-centered">
            <b-icon icon="emoticon-sad" size="is-medium"></b-icon>
            <p>Nothing here.</p>
          </div>
        </template>

        <template slot-scope="props">
          <b-table-column field="id" label="Date & Time" sortable>
            <!-- <router-link :to="{name: 'StudentProgramEdit', params: {id: $route.params.id, programId: props.row.id}}">{{props.row.label}}</router-link> -->
            {{props.row.date | moment("MM/DD/YYYY hh:mm a")}}
          </b-table-column>
          <b-table-column field="startDate" label="Trials">
            0
          </b-table-column>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showAddButton: Boolean
  },
  data () {
    return {
      isSessionModalActive: false,
      trials: [],
      sessionLabel: ''
    }
  },
  mounted () {
    this.getTrials()
  },
  methods: {
    createTrial () {
      this.$router.push({name: 'SessionPrograms'})
    },
    async getTrials () {
      let sessionId = this.$route.params.sessionId
      let uri = `/sessions/${sessionId}?filter[include]=trials`
      try {
        let getResp = await this.$http.get(uri)
        this.trials = getResp.data
      }
      catch (e) {
        this.$toast.open({
          duration: 3000,
          message: `Error getting trials: ${e.message}`,
          position: 'is-bottom',
          type: 'is-danger'
        })
      }
    }
  }
}
</script>

<style>

</style>
