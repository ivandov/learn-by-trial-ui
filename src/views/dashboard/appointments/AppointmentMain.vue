<template>
  <section>
    <div class="columns" v-show="shownCards.includes('sessions')">
      <div class="column is-12">
        <session-list showAddButton/>
      </div>
    </div>
    <!-- <div class="columns" v-show="shownCards.includes('programs')">
      <div class="column">
        <student-objectives-card/>
      </div>
    </div> -->
  </section>
</template>

<script>
import SessionList from '@/components/cards/SessionList'

export default {
  props: ['appointmentId'],
  components: {
    SessionList
  },
  data () {
    return {
      shownCards: ['sessions'],
      programId: ''
    }
  },
  mounted () {
    // console.log(this.appointmentId)
  }
}
</script>

<style>

</style>
