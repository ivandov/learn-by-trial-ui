<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">Timers & Counters</p>
    </header>
    <div class="card-content">
      <button class="button is-fullwidth" v-for="button in buttons" :key="button.label" @click="buttonAction(button.label)">
        <div class="button-label has-text-left">{{button.label}}</div>
        <div class="button-value">{{button.count}}</div>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      buttons: [
        {label: 'Smiles', count: 0},
        {label: 'Screams', count: 0}
      ]
    }
  },
  methods: {
    buttonAction (label) {
      this.buttons.forEach(button => {
        if (button.label === label) {
          button.count++
        }
      })
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
