<template>
  <b-collapse class="card" :open="open">
    <div slot="trigger" slot-scope="props" class="card-header">
      <p class="card-header-title">
        {{title}}
      </p>
      <a class="card-header-icon">
        <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"></b-icon>
      </a>
    </div>
    <div class="card-content">
      <table class="table is-fullwidth is-hoverable is-narrow">
        <tbody>
          <tr>
            <th>Birthdate</th>
            <td>{{ student.birthdate | moment("MM/DD/YYYY") }}</td>
          </tr>
          <tr>
            <th>Sex</th>
            <td>
              {{ student.sex }}
              <b-icon :icon="student.sex === 'Male' ? 'gender-male' : 'gender-female'" />
            </td>
          </tr>
          <tr>
            <th>Race</th>
            <td>{{ student.race }}</td>
          </tr>
        </tbody>
      </table>

      <footer v-if="this.showButtons">
        <button class="button is-info is-fullwidth" @click="appointments">Appointments</button>
        <button class="button is-warning is-fullwidth" @click="programs">Skill Programs & Targets</button>
        <button class="button is-danger is-fullwidth" @click="objectives">Supplementary Objectives</button>
        <button class="button is-success is-fullwidth" @click="caregiver">Caregivers</button>
      </footer>
    </div>
  </b-collapse>
</template>

<script>
export default {
  name: 'Student',
  props: {
    id: String,
    showButtons: Boolean,
    forceOpen: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      open: true,
      title: 'Student Profile',
      student: {
        birthdate: Date.now() // default to remove VueMoment warning
      }
    }
  },
  created () {
    this.toggleCollapse()
  },
  mounted () {
    this.getStudentProfile(this.id)
  },
  methods: {
    async getStudentProfile (id) {
      let uri = `/students/${id}`

      try {
        let resp = await this.$http.get(uri)
        this.student = resp.data

        let appostrophe = this.student.name.endsWith('s') ? '\'' : '\'s'
        this.title = this.student.name + appostrophe + ' Profile'
      }
      catch (e) {
        // alert(e)
        this.$emit('notification', {
          msg: e.response.data.error.message,
          styleClass: 'is-warning'
        })
      }
    },
    appointments () {
      this.$root.$emit('showAppointments')
    },
    programs () {
      this.$root.$emit('showPrograms')
    },
    objectives () {
      this.$root.$emit('showObjectives')
    },
    caregiver () {
      this.$toast.open({
        duration: 3000,
        message: `Caregivers not implemented yet!`,
        position: 'is-bottom',
        type: 'is-danger'
      })
    },
    toggleCollapse () {
      // console.log(screen)
      if (screen.height <= 768 && !this.forceOpen) {
        this.open = false
      }
    }
  }
}
</script>

<style scoped>
/* table th {
  padding-left: 0px !important;
} */
button {
  margin-bottom: 5px;
  margin-top: auto;
}
</style>
