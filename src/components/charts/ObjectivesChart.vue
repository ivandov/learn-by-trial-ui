<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">Supplementary Objectives</p>
    </header>
    <div class="card-content">
      <p>
        <span class="has-text-weight-bold">Note: </span>
        Only sessions with recorded Trials are displayed
      </p>
      <br>
      <line-chart :chart-data="chartData" :options="options" height="100"></line-chart>
    </div>
  </div>
</template>

<script>
  import LineChart from './LineChart.js'
  import * as chartUtils from '@/utils/chartUtils'

  export default {
    components: {
      LineChart
    },
    data () {
      return {
        height: 300,
        allObjectives: [],
        chartData: null,
        options: {
          title: {
            display: true,
            text: 'Success Rate of Supplementary Objectives per Session'
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true
                },
                scaleLabel: {
                  labelString: '% Trials with Objective met',
                  display: true
                }
              }
            ],
            xAxes: [{
              ticks: {
                autoSkip: false
              },
              scaleLabel: {
                labelString: 'Appointment Date & Time',
                display: true
              }
            }]
          }
        }
      }
    },
    computed: {
      myStyles () {
        return {
          height: `${this.height}px`,
          position: 'relative'
        }
      }
    },
    async mounted () {
      this.allObjectives = await this.fetchSupplementaryObjectives()
      this.fetchData()
    },
    methods: {
      async fetchData () {
        this.appointments = await this.fetchAppointments()
        let appointmentIds = this.appointments.map(a => a.id)
        this.sessions = await this.fetchSessions(appointmentIds)

        // get objective information per session & remove sessions with no trials
        let sessionObjectives = this.sessions.map(s => this.getObjectiveSucessPerSession(s))
        sessionObjectives = sessionObjectives.filter(o => {
          return o !== undefined
        })
        // console.log('Session objectives:', sessionObjectives)

        this.setChartData(sessionObjectives)
      },

      getObjectiveSucessPerSession (session) {
        // console.log('Session:', session)
        let sessionObjectives = {date: session.date}
        let trials = session.trials

        // FIXME this may eventually not be needed if sessions validate trial length
        if (trials.length === 0) return undefined

        // get all objectives for the specified student
        this.allObjectives.forEach((o) => {
          sessionObjectives[o.label] = {}
          sessionObjectives[o.label].count = 0
        })

        // count the occurences of a student's objective across all trials in a session
        trials.forEach(trial => {
          let recordedObjectives = trial.supplementaryObjectives
          recordedObjectives.forEach(o => {
            sessionObjectives[o].count += 1
          })
        })

        // calculate the percentage of times the objective was seen
        Object.keys(sessionObjectives).map(function (key, index) {
          if (key === 'date') return
          sessionObjectives[key].percent = sessionObjectives[key].count / trials.length * 100
        })

        return sessionObjectives
      },

      async fetchSupplementaryObjectives () {
        let id = this.$route.params.id
        let uri = `/objectives?filter[where][studentId]=${id}`
        let resp = await this.$http.get(uri)
        return resp.data
      },

      async fetchAppointments () {
        let id = this.$route.params.id
        let uri = `/appointments?filter[where][studentId]=${id}`
        let resp = await this.$http.get(uri)
        return resp.data
      },

      async fetchSessions (appIds) {
        let filter = {
          where: {
            appointmentId: {
              inq: appIds
            }
          },
          include: 'trials'
        }

        let uri = `/sessions?filter=${JSON.stringify(filter)}`
        let resp = await this.$http.get(uri)
        return resp.data
      },

      setChartData (sessObjs) {
        console.log(sessObjs)
        console.log(this.allObjectives)

        // let sessLabels = sessObjs.map((o,index) => new Date(o.date).toLocaleString().split(',')[0])
        let sessLabels = sessObjs.map((o, index) => index)
        console.log(sessLabels)

        let chartData = {
          labels: sessLabels
        }

        let datasets = []
        this.allObjectives.forEach(objective => {
          objective = objective.label
          let color = chartUtils.getRandomColor()
          let dataset = {
            label: objective,
            backgroundColor: color.background,
            borderColor: color.border,
            data: [],
            fill: false
          }

          sessObjs.forEach(sessObj => {
            dataset.data.push(sessObj[objective].percent)
          })
          datasets.push(dataset)
        })
        // console.log('Datasets: ', datasets)

        chartData.datasets = datasets

        this.chartData = chartData
      }
    }
  }
</script>

<style scoped>

canvas {
  height: 400px !important;
}

</style>
