<template>
  <div>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">Sessions</p>
      <div class="card-header-icon">
        <!-- <button class="button is-info is-outlined" @click="isSessionModalActive = true">Add Session</button> -->
        <button class="button is-info" @click="createSession">Add Session</button>
      </div>
    </header>
    <div class="card-content">
      <b-table :data="sessions" default-sort="startDate" detail-key="id">

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
  <b-modal :active.sync="isSessionModalActive">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">New Session Label</p>
      </header>
      <div class="card-content">
        <div class="field">
          <!-- <label class="label">Session Label</label> -->
          <div class="control">
            <input class="input" type="text" placeholder="Session 1 - Colors Program" v-model="sessionLabel">
          </div>
        </div>
      </div>
      <footer class="card-footer">
        <a class="card-footer-item" @click="createSession">Start Session</a>
      </footer>
    </div>
  </b-modal>
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
          name: 'SessionDash',
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
      let uri = `/sessions?filter[where][appointmentId]=${appointmentId}`
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
    }
  }
}
</script>

<style>

</style>
