<template>
  <div class="columns is-centered">
    <div class="column is-12">
      <div class="card">
        <header class="card-header">
          <p class="card-header-title">All Students</p>
          <div class="card-header-icon">
            <button class="button is-info" @click="showAddStudentModal">Add Student</button>
          </div>
        </header>
        <div class="card-content">
          <b-field>
            <b-input placeholder="Search by name... "
                type="is-info"
                icon="magnify"
                v-model="search_query.name">
            </b-input>
          </b-field>
          <br>
          <b-table :data="filter" class="action-col" hoverable striped>
            <template slot-scope="props">
              <b-table-column field="name" label="Name">
                <router-link :to="{name: 'Student', params: { id: props.row.id}}">{{ props.row.name }}</router-link>
              </b-table-column>

              <b-table-column field="date" label="Birthdate">
                {{ new Date(props.row.birthdate).toLocaleDateString() }}
              </b-table-column>

              <b-table-column label="Sex">
                <b-icon 
                  :icon="props.row.sex === 'Male' ? 'gender-male' : 'gender-female'">
                </b-icon>
                {{ props.row.sex }}
              </b-table-column>

              <b-table-column field="race" label="Race">
                {{ props.row.race }}
              </b-table-column>

              <b-table-column field="" label="" v-if="appointments" class="is-fullwidth">
                <button class="button is-success" @click="createAppointment(props.row.id)">Start Appointment</button>
              </b-table-column>
            </template>

            <template slot="empty">
              <section class="section">
                <div class="content has-text-grey has-text-centered">
                  <p>
                    <b-icon icon="emoticon-sad" size="is-large"></b-icon>
                  </p>
                  <p>Nothing here.</p>
                </div>
              </section>
            </template>
          </b-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StudentForm from '@/components/forms/StudentForm.vue'

export default {
  props: {
    appointments: Boolean
  },
  data () {
    return {
      students: [],
      search_query: {
        name: ''
      }
    }
  },
  mounted () {
    this.getStudents()
  },
  computed: {
    filter: function () {
      var nameRegex = new RegExp(this.search_query.name, 'i')
      var students = []
      this.students.forEach((student) => {
        if (student.name.match(nameRegex)) students.push(student)
      })
      return students
    }
  },
  methods: {
    async getStudents () {
      let res = await this.$http.get('/students')
      this.students = res.data
    },

    async createAppointment (studentId) {
      let uri = '/appointments/'

      let appointment = {
        date: Date.now(),
        studentId: studentId
      }

      let appRes = await this.$http.post(uri, appointment)

      this.$router.push({
        name: 'AppointmentMain',
        params: {
          id: appRes.data.studentId.toString(),
          appointmentId: appRes.data.id
        }
      })
    },

    showAddStudentModal () {
      this.$modal.open({
        parent: this,
        component: StudentForm,
        hasModalCard: true
      })
    }
  }
}
</script>

<style scoped>
.action-col td:last-child::before{
  content: none !important;
}
.action-col td:last-child :first-child{
  width:100% !important;
}
</style>
