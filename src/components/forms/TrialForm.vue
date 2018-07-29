<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">Trial {{trialNumber}}</p>
      <a class="card-header-icon">
        <button class="button" v-bind:class="{ 'is-danger': timerPaused }" @click="handleTimer">
          <b-icon icon="timer"></b-icon>
          <stopwatch initState="started" ref="timer"/>
        </button>
      </a>
    </header>
    <div class="card-content">
      <p>
        <span class="has-text-weight-bold">Program: </span>
        <b-tooltip :label="program.description" dashed multilined>
          {{program.label}}
        </b-tooltip>
      </p>
      <p>
        <span class="has-text-weight-bold">Target: </span>
        {{target.label}}
        <!-- <b-tooltip :label="target.description" dashed multilined>
          {{target.label}}
        </b-tooltip> -->
      </p>
      <p>
        <span class="has-text-weight-bold">Prompt Level: </span>
        <span v-if="target.promptLevel == 0" class="_has-text-success">
          <b-icon
              icon="check-circle"
              size="is-small"
              type="is-success">
          </b-icon>
          No Prompting
        </span>
        <span v-if="target.promptLevel == 1" class="_has-text-warning">
          <b-icon
              icon="alert"
              size="is-small"
              type="is-warning">
          </b-icon>
          Partial Prompting
        </span>
        <span v-if="target.promptLevel == 2" class="_has-text-danger">
          <b-icon
              icon="alert-octagon"
              size="is-small"
              type="is-danger">
          </b-icon>
          Full Prompting
        </span>
      </p>
      <p>
        <span class="has-text-weight-bold">Description: </span>
        <br class="is-hidden-tablet">
        {{target.description}}
      </p>

      <br>

      <div class="field">
        <label class="label">Given Answer</label>
        <div class="control">
          <b-field>
            <b-radio-button v-model="trial.correctAnswer"
                native-value="false"
                type="is-danger">
                <b-icon icon="close"></b-icon>
                <span>Incorrect</span>
            </b-radio-button>

            <b-radio-button v-model="trial.correctAnswer"
                native-value="true"
                type="is-success">
                <b-icon icon="check"></b-icon>
                <span>Correct</span>
            </b-radio-button>
          </b-field>
        </div>
      </div>

      <div class="field">
        <label class="label">Supplementary Objectives</label>
        <div class="control">
          <div class="columns is-mobile">
            <div class="column is-6 is-clearfix" v-for="supplObjective in supplObjectives" :key="supplObjective.id">
              <b-checkbox v-model="trial.supplementaryObjectives" :native-value="supplObjective.label">
                <b-tooltip :label="supplObjective.description" type="is-info" multilined dashed>
                  <span class="is-size-6">{{supplObjective.label}}
                  </span>
                </b-tooltip>
              </b-checkbox>
              <!-- <b-tooltip class="is-pulled-right" :label="supplObjective.description" type="is-info" multilined size="is-medium">
                <b-icon
                  icon="alert-circle"
                  type="is-info">
                </b-icon>
              </b-tooltip> -->
            </div>
          </div>
        </div>
      </div>

      <div class="field">
        <label class="label">Notes</label>
        <div class="control">
          <textarea
            class="textarea"
            placeholder="Trial Notes"
            v-model="trial.notes">
          </textarea>
        </div>
      </div>
    </div>
    <footer class="card-footer">
      <button class="button is-warning is-fullwidth">Clear</button>
      <button class="button is-success is-fullwidth" @click="createTrial">Add</button>
    </footer>
  </div>
</template>

<script>
import Stopwatch from '@/components/Stopwatch'
export default {
  components: {
    Stopwatch
  },
  data () {
    return {
      timerPaused: false,
      program: {},
      target: {},
      trialNumber: 0,
      supplObjectives: [],
      trial: {
        sessionId: this.$route.params.sessionId,
        date: Date.now(),
        behaviorTechId: 'admin', // FIXME this needs to be replaced with the logged in user id
        correctAnswer: 'true',
        supplementaryObjectives: []
      }
    }
  },
  mounted () {
    this.getTrialCount()
    this.getProgramAndTarget()
    this.getSupplementaryObjectives()
  },
  methods: {
    handleTimer () {
      console.log(this.$refs.timer.time)
      this.$refs.timer.state === 'paused' ? this.$refs.timer.resume() : this.$refs.timer.pause()
      this.timerPaused = this.$refs.timer.state === 'paused'
    },

    async getTrialCount () {
      let trials = await this.$http.get(`sessions/${this.$route.params.sessionId}/trials/count`)
      this.trialNumber = trials.data.count + 1
    },

    async getProgramAndTarget () {
      let program = await this.$http.get(`programs/${this.$route.query.program}`)
      let target = await this.$http.get(`targets/${this.$route.query.target}`)
      this.program = program.data
      this.target = target.data
      this.trial.program = this.program.label
      this.trial.target = this.target.label
    },

    async getSupplementaryObjectives () {
      let studentId = this.$route.params.id
      let uri = `/objectives?filter[where][studentId]=${studentId}`
      try {
        let getResp = await this.$http.get(uri)
        this.supplObjectives = getResp.data
      }
      catch (e) {
        this.$toast.open({
          duration: 3000,
          message: `Error getting supplementary objectives: ${e.message}`,
          position: 'is-bottom',
          type: 'is-danger'
        })
      }
    },

    async createTrial () {
      try {
        this.trial.duration = Math.floor(this.$refs.timer.milliseconds / 1000)

        await this.$http.post('/trials', this.trial)
        // console.log(resp)
        this.$toast.open({
          duration: 5000,
          message: 'Trial recorded successfully!',
          position: 'is-bottom',
          type: 'is-success'
        })
        this.$router.push({name: 'SessionPrograms'})
      }
      catch (e) {
        this.$toast.open({
          duration: 5000,
          message: e.response.data.error.message,
          position: 'is-bottom',
          type: 'is-warning'
        })
      }
    }
  }
}
</script>

<style>
button{
  margin: 5px 5px;
}
</style>
