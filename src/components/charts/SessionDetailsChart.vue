<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">Session Details</p>
    </header>
    <div class="card-content">
      <line-chart :chart-data="datacollection" :options="options" :height="200"></line-chart>
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
        datacollection: null,
        options: {
          scales: {
            yAxes: [
              {
                id: 'y-axis-1',
                display: true,
                position: 'left',
                ticks: {
                  beginAtZero: true
                },
                scaleLabel: {
                  labelString: 'Trials',
                  display: true
                }
              },
              {
                id: 'y-axis-2',
                // type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                display: true,
                position: 'right',
                // grid line settings
                gridLines: {
                  drawOnChartArea: false // only want the grid lines for one axis to show up
                },
                scaleLabel: {
                  labelString: 'Duration (seconds)',
                  display: true
                }
              }
            ],
            xAxes: [{
              ticks: {
                autoSkip: false
              },
              scaleLabel: {
                labelString: 'Session Date & Time',
                display: true
              }
            }]
          }
        }
      }
    },
    mounted () {
      this.fetchData()
    },
    methods: {
      async fetchData () {
        this.appointments = await this.fetchAppointments()
        let appointmentIds = this.appointments.map(a => a.id)
        this.sessions = await this.fetchSessions(appointmentIds)
        // console.log('this.sessions', this.sessions)

        this.setChartData(this.sessions)
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

      setChartData (sessions) {
        // console.log('Plotting sessions:', sessions)
        let labels = [] // x axis labels
        let trialCounts = []
        let durations = []

        sessions.forEach((session, i) => {
          if (session.trials.length === 0) return
          // console.log(apt)
          let l = new Date(session.date).toLocaleString().split(',')[1]
          labels.push(l)
          durations.push(chartUtils.calculateDuration(session, 'seconds'))
          trialCounts.push(session.trials.length)
        })

        let colors1 = chartUtils.getRandomColor()
        let colors2 = chartUtils.getRandomColor()

        this.datacollection = {
          labels: labels,
          datasets: [
            {
              label: 'Trials per Session',
              data: trialCounts,
              yAxisID: 'y-axis-1',
              backgroundColor: colors1.background,
              borderColor: colors1.border,
              borderWidth: 1
            },
            {
              label: 'Session Duration',
              data: durations,
              backgroundColor: colors2.background,
              borderColor: colors2.border,
              yAxisID: 'y-axis-2',
              fill: false
            }
          ]
        }
      }
    }
  }
</script>