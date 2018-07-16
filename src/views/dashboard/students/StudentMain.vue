<template>
  <section>
    <div class="columns" v-show="shownCards.includes('programs')">
      <div class="column is-12">
        <student-programs-card/>
      </div>
    </div>
    <div class="columns" v-show="shownCards.includes('objectives')">
      <div class="column">
        <student-objectives-card/>
      </div>
    </div>
    <div class="columns" v-if="shownCards.includes('targets')">
      <div class="column">
        <student-targets-card :program-id="programId"/>
      </div>
    </div>
    <div class="columns" v-if="shownCards.includes('appointments')">
      <div class="column">
        <student-appointments-card />
      </div>
    </div>
  </section>
</template>

<script>
import StudentAppointmentsCard from '@/components/cards/StudentAppointmentsCard'
import StudentProgramsCard from '@/components/cards/StudentProgramsCard'
import StudentTargetsCard from '@/components/cards/StudentTargetsCard.vue'
import StudentObjectivesCard from '@/components/cards/StudentObjectivesCard'

export default {
  name: 'Student',
  components: {
    StudentAppointmentsCard,
    StudentProgramsCard,
    StudentTargetsCard,
    StudentObjectivesCard
  },
  data () {
    return {
      shownCards: ['programs', 'objectives'],
      programId: ''
    }
  },
  mounted () {
    this.showAppointments()
    this.showPrograms()
    this.showTargets()
    this.showObjectives()
  },
  methods: {
    async showAppointments () {
      this.$root.$on('showAppointments', () => {
        this.shownCards = ['appointments']
      })
    },
    async showPrograms () {
      this.$root.$on('showPrograms', () => {
        this.shownCards = ['programs']
      })
    },
    async showTargets () {
      this.$root.$on('updateTargets', data => {
        this.shownCards = ['programs', 'targets']
        this.programId = data.id
      })
    },
    async showObjectives () {
      this.$root.$on('showObjectives', () => {
        this.shownCards = ['objectives']
      })
    }
  }
}
</script>

