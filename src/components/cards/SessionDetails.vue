<template>
  <b-collapse class="card">
    <div slot="trigger" slot-scope="props" class="card-header">
        <p class="card-header-title">Session Details</p>
        <a class="card-header-icon">
          <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"></b-icon>
        </a>
    </div>
    <div class="card-content">
      <!-- <div class="content">{{target.description}}</div> -->
      <div style="margin-bottom:10px;">
        <span>Total Duration:</span>
        <div class="is-pulled-right">
          <stopwatch initState="started" ref="sessionTimer" />
        </div>
      </div>
      <button class="button is-info is-fullwidth" @click="showTrials" style="margin-bottom:10px;">View Trials</button>
      <button class="button is-success is-fullwidth" @click="completeSession">Complete Session</button>
    </div>
  </b-collapse>
</template>

<script>
import TrialsModal from '@/components/modals/TrialsModal'
import SessionForm from '@/components/forms/SessionForm'
import Stopwatch from '@/components/Stopwatch'
export default {
  components: {
    TrialsModal,
    SessionForm,
    Stopwatch
  },
  methods: {
    showTrials () {
      this.$modal.open({
        parent: this,
        component: TrialsModal,
        hasModalCard: true
      })
    },
    completeSession () {
      this.$modal.open({
        parent: this,
        component: SessionForm,
        hasModalCard: true
      })
    }
  }
}
</script>

<style scoped>
</style>
