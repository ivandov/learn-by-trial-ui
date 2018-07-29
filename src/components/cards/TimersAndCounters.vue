<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">Timers & Counters</p>
    </header>
    <div class="card-content">
      <button :id="button.label + 'Button'" class="button is-fullwidth" v-for="button in buttons" :key="button.label" @click="buttonAction(button.label)">
        <b-icon icon="timer" v-if="button.type === 'timer'"></b-icon>
        <b-icon icon="counter" v-if="button.type === 'counter'"></b-icon>

        <div class="button-label has-text-left">{{button.label}}</div>

        <div class="button-value" v-if="button.type === 'counter'">{{button.value}}</div>
        <div class="button-value" v-if="button.type === 'timer'">
          <stopwatch initState="paused" :ref="button.label + 'Timer'" />
        </div>
      </button>
    </div>
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
      buttons: [
        {label: 'Smiled', type: 'counter', value: 0},
        {label: 'Screamed', type: 'counter', value: 0},
        {label: 'Sat Quietly', type: 'timer'}
      ]
    }
  },
  methods: {
    buttonAction (label) {
      this.buttons.forEach(button => {
        if (button.label === label) {
          if (button.type === 'counter') {
            button.value++
          }
          else {
            this.handleTimer(button.label)
          }
        }
      })
    },

    handleTimer (timerRef) {
      let timer = this.$refs[timerRef + 'Timer'][0]
      timer.state === 'paused' ? timer.resume() : timer.pause()

      let timerBtn = document.getElementById(timerRef + 'Button')
      timer.state === 'paused' ? timerBtn.classList.add('is-danger') : timerBtn.classList.remove('is-danger')
    }
  }
}
</script>

<style scoped>
button {
  margin-bottom: 10px;
}

.button-label {
  width: 90%
}
</style>
