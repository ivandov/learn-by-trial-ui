<template>
  <div>
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">Skill Programs</p>
      </header>
      <div class="card-content">
        <div class="columns is-multiline is-mobile is-centered">
          <div class="column is-4-tablet is-half-mobile program-card-col" v-for="program in programs" :key="program.id">
            <div class="card has-text-centered program-card" @click="selectTarget(program)">
              <div class="card-content">
                <p class="is-size-3-tablet is-size-4-mobile">{{program.label}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- <targets-modal :program-id="modalProgramId"/> -->


    <b-modal :active.sync="isTargetModalActive">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">{{modal.title}} - Targets</p>
      </header>
      <div class="card-content">
        <span class="has-text-weight-bold">Description:</span>
        <span>{{modal.description}}</span>
        <br><br>
        <b-collapse class="card" v-for="target in modal.targets" :key="target.id" :open="false">
            <div slot="trigger" slot-scope="props" class="card-header">
                <p class="card-header-title">{{target.label}}</p>
                <a class="card-header-icon">
                  <b-icon
                      :icon="props.open ? 'menu-down' : 'menu-up'">
                  </b-icon>
                </a>
            </div>
            <div class="card-content">
              <div class="content">{{target.description}}</div>
            </div>
            <footer class="card-footer trial">
              <button class="button is-fullwidth is-success">Start Trial</button>
            </footer>
        </b-collapse>
      </div>
    </div>
  </b-modal>

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
        progs.push({label: 'test1'})
        progs.push({label: 'test2'})
        progs.push({label: 'test3'})
        progs.push({label: 'test4'})
        progs.push({label: 'test5'})
        progs.push({label: 'test6'})

        this.programs = progs
        console.log(this.programs)
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

    async selectTarget (program) {
      if (!program.id) {
        this.$toast.open({
          duration: 3000,
          message: `This card was added to test the layout - choose a non "Test" card`,
          position: 'is-bottom',
          type: 'is-danger'
        })

        return
      }

      this.modal.title = program.label
      this.modal.description = program.description
      this.modal.targets = program.targets

      this.isTargetModalActive = true
    }
  }
}
</script>

<style scoped>
.program-card .card-content{
  justify-content: center;
  align-items: center;
  display: flex;
}

.program-card {
  cursor: pointer;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  /* box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1); */
}

.program-card-col:nth-of-type(5n+1) .card-content{
  background-color: #96D6F2;
}
.program-card-col:nth-of-type(5n+2) .card-content{
  background-color: #FDEF8D;
}
.program-card-col:nth-of-type(5n+3) .card-content{
  background-color: #BFDA83;
}
.program-card-col:nth-of-type(5n+4) .card-content{
  background-color: #E97758;
}
.program-card-col:nth-of-type(5n+5) .card-content{
  background-color: #FBA971;
}

@media only screen and (max-width: 600px) {
  .program-card .card-content{
    min-height: 150px;
  }
}

@media only screen and (min-width: 600px) {
  .program-card .card-content{
    min-height: 200px;
  }
}

.collapse.card {
  margin-bottom: 5px;
}

.card-footer.trial {
  padding: 5px;
}
</style>
