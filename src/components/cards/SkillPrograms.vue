<template>
  <div class="card modal-card">
    <header class="card-header">
      <p class="card-header-title">Skill Programs</p>
    </header>
    <div class="card-content">
      <div class="columns is-multiline is-mobile is-centered">
        <div class="column is-4-tablet is-half-mobile colored-cards" v-for="program in programs" :key="program.id">
          <div class="card has-text-centered colored-card" @click="showTargetsModal(program)">
            <div class="card-content">
              <p class="is-size-3-tablet is-size-4-mobile">{{program.label}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TargetsModal from '@/components/modals/TargetsModal.vue'

export default {
  componets: {
    TargetsModal
  },
  data () {
    return {
      programs: [],
      modal: {
        title: '',
        description: '',
        targets: []
      },
      // modalProgramId: ''
      isTargetModalActive: false
    }
  },
  mounted () {
    this.getPrograms()
  },
  methods: {
    async getPrograms () {
      let uri = `/students/${this.$route.params.id}/programs?filter[include]=targets`

      try {
        let progResp = await this.$http.get(uri)

        let progs = progResp.data
        // progs.push.apply(progResp.data)
        // progs.push(progResp.data)
        // progs.push({label: 'test1'})
        // progs.push({label: 'test2'})
        // progs.push({label: 'test3'})
        // progs.push({label: 'test4'})
        // progs.push({label: 'test5'})
        // progs.push({label: 'test6'})

        this.programs = progs
        // console.log(this.programs)
      }
      catch (err) {
        this.$toast.open({
          duration: 3000,
          message: `Error getting programs: ${err.message}`,
          position: 'is-bottom',
          type: 'is-danger'
        })
      }
    },

    showTargetsModal (program) {
      if (!program.id) {
        this.$toast.open({
          duration: 3000,
          message: `This card was added to test the layout - choose a non "Test" card`,
          position: 'is-bottom',
          type: 'is-danger'
        })
        return
      }

      this.$modal.open({
        parent: this,
        props: {
          program: program
        },
        component: TargetsModal,
        hasModalCard: true
      })
    }
  }
}
</script>

<style>
.collapse.card {
  margin-bottom: 5px;
}

.card-footer.trial {
  padding: 5px;
}
</style>
