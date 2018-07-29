<template>
  <span id="time" v-html="time"></span>
</template>

<script>
  module.exports = {
    props: {
      showHours: {
        type: Boolean,
        default: false
      },
      initState: {
        type: String
      }
    },
    data: function () {
      return {
        state: this.initState,
        elapsedTime: 0,
        startTime: Date.now(),
        currentTime: Date.now(),
        interval: null
      }
    },
    mounted: function () {
      if (this.state === 'started') {
        this.start()
      }
    },
    destroyed: function () {
      clearInterval(this.interval)
    },
    computed: {
      time: function () {
        if (this.showHours) {
          return this.hours + ':' + this.minutes + ':' + this.seconds
        }
        else {
          return this.minutes + ':' + this.seconds
        }
      },
      milliseconds: function () {
        return this.currentTime - this.startTime
      },
      hours: function () {
        var lapsed = this.milliseconds
        var hrs = Math.floor((lapsed / 1000 / 60 / 60))
        return hrs >= 10 ? hrs : '0' + hrs
      },
      minutes: function () {
        var lapsed = this.milliseconds
        var min = Math.floor((lapsed / 1000 / 60) % 60)
        return min >= 10 ? min : '0' + min
      },
      seconds: function () {
        var lapsed = this.milliseconds
        var sec = Math.floor((lapsed / 1000) % 60)
        return sec >= 10 ? sec : '0' + sec
      }
    },
    methods: {
      start: function () {
        this.state = 'started'
        this.updateCurrentTime()
        this.interval = setInterval(this.updateCurrentTime, 1000)
      },
      pause: function () {
        this.state = 'paused'
        clearInterval(this.interval)
        this.elapsedTime = this.milliseconds
      },
      resume: function () {
        this.startTime = Date.now()
        this.start()
      },
      reset: function () {
        this.startTime = Date.now()
        this.currentTime = Date.now()
      },
      updateCurrentTime: function () {
        this.currentTime = Date.now() + this.elapsedTime
      }
    }
  }
</script>

