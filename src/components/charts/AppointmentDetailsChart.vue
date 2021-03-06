<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">Appointment Details</p>
    </header>
    <div class="card-content">
      <bar-chart :chart-data="datacollection" :options="options" :height="200"></bar-chart>
    </div>
  </div>
</template>

<script>
  import BarChart from './BarChart.js'
  import * as chartUtils from '@/utils/chartUtils'

  export default {
    components: {
      BarChart
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
                  labelString: 'Sessions',
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
                  labelString: 'Duration (minutes)',
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
    mounted () {
      this.fetchAppointments()
    },
    methods: {
      async fetchAppointments () {
        let id = this.$route.params.id
        let uri = `/appointments?filter[where][studentId]=${id}&filter[include]=sessions`
        let resp = await this.$http.get(uri)
        this.appointments = resp.data
        this.fillData(this.appointments)
      },
      fillData (appointments) {
        // console.log('Plotting appointments: ' + JSON.stringify(appointments))

        let labels = [] // x axis labels
        let sessionCounts = []
        let durations = []

        appointments.forEach((apt, i) => {
          if (apt.sessions.length === 0) return
          // console.log(apt)
          let l = new Date(apt.date).toLocaleString().split(',')
          labels.push(l)
          durations.push(this.calculateDuration(apt))
          sessionCounts.push(apt.sessions.length)
        })

        this.datacollection = {
          labels: labels,
          datasets: [
            {
              label: 'Sessions per Appointment',
              data: sessionCounts,
              yAxisID: 'y-axis-1',
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1,
              type: 'line'
            },
            {
              label: 'Appointment Duration',
              data: durations,
              // backgroundColor: chartUtils.getRandomColor().background,
              borderColor: chartUtils.getRandomColor().border,
              yAxisID: 'y-axis-2',
              type: 'line',
              fill: false
            }
          ]
        }
      },
      calculateDuration (apt) {
        // console.log(apt)
        let duration = new Date(apt.endDate) - new Date(apt.date)
        let seconds = Math.floor(duration / 1000)
        let minutes = Math.ceil(seconds / 60)

        if (isNaN(minutes)) return undefined

        return minutes
      },
      getRandomInt () {
        return Math.floor(Math.random() * (50 - 5 + 1)) + 5
      }
    }
  }
</script>

<style>
  .small {
    max-width: 600px;
    max-height: 400px;
    margin:  150px auto;
  }
</style>