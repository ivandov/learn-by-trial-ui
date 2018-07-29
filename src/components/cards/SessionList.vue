<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">Sessions</p>
      <div class="card-header-icon">
        <button class="button is-info" @click="createSession">Add Session</button>
      </div>
    </header>
    <div class="card-content">
      <b-table :data="sessions" class="action-col" default-sort="startDate" detail-key="id" hoverable striped>

        <template slot="empty">
          <div class="content has-text-grey has-text-centered">
            <b-icon icon="emoticon-sad" size="is-medium"></b-icon>
            <p>Nothing here.</p>
          </div>
        </template>

        <template slot-scope="props">
          <b-table-column field="date" label="Start Time" sortable>
            <router-link :to="{name: 'SessionPrograms', params: { sessionId: props.row.id}}">
              {{ props.row.date | moment("MM/DD/YYYY hh:mm a") }}
            </router-link>
          </b-table-column>
          <b-table-column field="duration" label="Duration (minutes)" sortable>
            {{ calculateDuration(props.row) }}
          </b-table-column>
          <b-table-column field="label" label="Label">
            {{ props.row.label }}
          </b-table-column>
          <b-table-column field="notes" label="Notes">
            {{ props.row.notes }}
          </b-table-column>
          <b-table-column field="trials" label="Trials">
            {{props.row.trials.length}}
          </b-table-column>
          <b-table-column field="successRate" label="Success Rate" sortable>
            <span class="tag is-medium is-rounded" v-bind:class="[props.row.successRateClass]" v-show="props.row.trials.length > 0">{{calculateSuccessRate(props.row)}}%</span>
          </b-table-column>
          <b-table-column field="" label="" class="is-fullwidth">
            <button class="button is-info" @click="viewTrials(props.row.trials)">View Trials</button>
          </b-table-column>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
import TrialsModal from '@/components/modals/TrialsModal'
export default {
  props: {
    showAddButton: Boolean
  },
  components: {
    TrialsModal
  },
  data () {
    return {
      isSessionModalActive: false,
      sessions: [],
      sessionLabel: ''
    }
  },
  mounted () {
    this.getSessions()
  },
  methods: {
    async createSession () {
      let uri = `/sessions`
      let session = {
        date: Date.now(),
        appointmentId: this.$route.params.appointmentId
      }

      try {
        let sessResp = await this.$http.post(uri, session)
        this.$router.push({
          name: 'SessionPrograms',
          params: {
            id: this.$route.params.id,
            appointmentId: sessResp.data.appointmentId,
            sessionId: sessResp.data.id
          }
        })
      }
      catch (e) {
        this.$toast.open({
          duration: 3000,
          message: `Error creating session: ${e.message}`,
          position: 'is-bottom',
          type: 'is-danger'
        })
      }
    },

    async getSessions () {
      let appointmentId = this.$route.params.appointmentId
      let uri = `/sessions?filter[where][appointmentId]=${appointmentId}&filter[include]=trials`
      try {
        let getResp = await this.$http.get(uri)
        this.sessions = getResp.data
      }
      catch (e) {
        this.$toast.open({
          duration: 3000,
          message: `Error getting sessions: ${e.message}`,
          position: 'is-bottom',
          type: 'is-danger'
        })
      }
    },

    viewTrials (trials) {
      this.$modal.open({
        parent: this,
        component: TrialsModal,
        props: {
          initTrials: trials
        },
        hasModalCard: true
      })
    },

    calculateDuration (session) {
      // console.log(session)
      let duration = new Date(session.endDate) - new Date(session.date)
      let seconds = Math.floor(duration / 1000)
      let minutes = Math.ceil(seconds / 60)

      if (isNaN(minutes)) return 'Uncompleted'

      return minutes
    },

    calculateSuccessRate (session) {
      let trials = session.trials

      if (trials.length === 0) return undefined

      let correctCount = 0
      trials.forEach((trial) => {
        if (trial.correctAnswer) correctCount += 1
      })

      session.successRate = Math.round(correctCount / trials.length * 100)
      session.successRateClass = 'is-warning'
      if (session.successRate > 66) session.successRateClass = 'is-success'
      if (session.successRate <= 33) session.successRateClass = 'is-danger'

      return session.successRate
    }
  }
}
</script>

<style scoped>
.action-col td:last-child::before{
  content: none !important;
}
.action-col td:last-child :first-child{
  width:100% !important;
}
</style>

