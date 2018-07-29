<template>
  <div class="card modal-card" style="width: auto">
    <header class="modal-card-head">
      <p class="modal-card-title">Trials</p>
    </header>
    <div class="modal-card-body">
      <b-table :data="trials">
        <template slot="empty">
          <div class="content has-text-grey has-text-centered">
            <b-icon icon="emoticon-sad" size="is-medium"></b-icon>
            <p>Nothing here.</p>
          </div>
        </template>

        <template slot-scope="props">
          <b-table-column field="correctAnswer" label="">
            <!-- {{props.row.correctAnswer}} -->
            <b-icon icon="check-circle" v-show="props.row.correctAnswer" type="is-success"></b-icon>
            <b-icon icon="close-circle" v-show="!props.row.correctAnswer" type="is-danger"></b-icon>
          </b-table-column>
          <b-table-column field="date" label="Date & Time" sortable>
            {{props.row.date | moment("MM/DD/YYYY hh:mm a")}}
          </b-table-column>
          <b-table-column field="program" label="Program" sortable>
            {{props.row.program}}
          </b-table-column>
          <b-table-column field="target" label="Target" sortable>
            {{props.row.target}}
          </b-table-column>
          <b-table-column field="duration" label="Duration (seconds)" sortable>
            {{props.row.duration}}
          </b-table-column>
          <b-table-column field="supplementaryObjectives" label="Suppl. Objectives">
            <p v-for="objective in props.row.supplementaryObjectives" :key="objective">
              {{objective}}
            </p>
          </b-table-column>
          <b-table-column field="notes" label="Notes">
            {{props.row.notes}}
          </b-table-column>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    initTrials: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
      trials: this.initTrials
    }
  },
  mounted () {
    if (this.trials.length === 0) this.getTrials()
  },
  methods: {
    async getTrials () {
      let sessionId = this.$route.params.sessionId
      let uri = `/trials?filter[where][sessionId]=${sessionId}`
      // let uri = `/sessions/${sessionId}?filter[include]=trials`
      try {
        let getResp = await this.$http.get(uri)
        console.log(getResp)
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
