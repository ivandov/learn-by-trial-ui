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
      <table class="table is-fullwidth is-hoverable">
        <tbody>
          <tr>
            <th>Name</th>
            <td>{{ student.name }}</td>
          </tr>
          <tr>
            <th>Birthdate</th>
            <td>{{ student.birthdate | moment("MM/DD/YYYY") }}</td>
          </tr>
          <tr>
            <th>Sex</th>
            <td>{{ student.sex }}</td>
          </tr>
          <tr>
            <th>Race</th>
            <td>{{ student.race }}</td>
          </tr>
        </tbody>
      </table>

      <footer v-if="this.showButtons">
        <button class="button is-info is-fullwidth" @click="appointments">View Appointments</button>
        <button class="button is-success is-fullwidth" @click="caregiver">Add Caregiver</button>
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
      this.$toast.open({
        duration: 3000,
        message: `Appointments not implemented yet!`,
        position: 'is-bottom',
        type: 'is-danger'
      })
    },
    caregiver () {
      this.$toast.open({
        duration: 3000,
        message: `Caregiver not implemented yet!`,
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
