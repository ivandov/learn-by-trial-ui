<template>
  <div class="tile is-ancestor">
    <div class="tile is-vertical is-parent">
      <div class="tile is-child box">
        <p class="title">
          Skill Programs
          <router-link :to="{name: 'StudentProgramAdd'}" class="button is-pulled-right is-info is-outlined">
            Add Skill Program
          </router-link>
        </p>
        <table class="table is-fullwidth is-hoverable">
          <thead>
            <tr>
              <th>Label</th>
              <th>Objective</th>
              <th>Goal Date</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="program in programs" :key="program.id">
              <!-- <td><a :href="student.id">{{ student.name }}</a></td> -->
              <!-- <td><router-link :to="{name: 'StudentProgramAdd', params: { id: student.id}}">{{student.name}}</router-link></td> -->
              <td>{{ program.label }}</td>
              <td>{{ program.objective }}</td>
              <td>{{ program.goal_date | moment("MM/DD/YYYY") }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="tile is-child box">
        <p class="title">
          Supplementary Objectives
          <router-link :to="{name: 'StudentObjectiveAdd'}" class="button is-pulled-right is-info is-outlined">
            Add Objective
          </router-link>
        </p>
        <table class="table is-fullwidth is-hoverable">
          <thead>
            <tr>
              <th>Label</th>
              <th>Type</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="objective in objectives" :key="objective.id">
              <!-- <td><a :href="student.id">{{ student.name }}</a></td> -->
              <!-- <td><router-link :to="{name: 'StudentProgramAdd', params: { id: student.id}}">{{student.name}}</router-link></td> -->
              <td>{{ objective.label }}</td>
              <td>{{ objective.type }}</td>
              <td>{{ objective.description }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="tile is-4 is-parent">
      <div class="tile is-child box">
        <p class="title">Student Profile</p>
        <table id="studentProfTable" class="table is-fullwidth is-hoverable">
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

        <button class="button is-info is-outlined is-fullwidth">View Trials</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Student',
  data () {
    return {
      student: {},
      programs: [],
      objectives: []
    }
  },
  mounted () {
    this.getStudentProfile(this.$route.params.id)
    this.getStudentPrograms(this.$route.params.id)
    this.getStudentObjectives(this.$route.params.id)
  },
  methods: {
    async getStudentProfile (id) {
      let uri = `/students/${id}`

      try {
        let resp = await this.$http.get(uri)
        this.student = resp.data
        console.log(resp)
      }
      catch (e) {
        // alert(e)
        this.$emit('notification', {
          msg: e.response.data.error.message,
          styleClass: 'is-warning'
        })
      }
    },
    async getStudentPrograms (id) {
      let uri = `/students/${id}/skillPrograms`

      try {
        let resp = await this.$http.get(uri)
        this.programs = resp.data
        console.log(resp)
      }
      catch (e) {
        // alert(e)
        this.$emit('notification', {
          msg: e.response.data.error.message,
          styleClass: 'is-warning'
        })
      }
    },
    async getStudentObjectives (id) {
      let uri = `/students/${id}/supplementaryObjectives`

      try {
        let resp = await this.$http.get(uri)
        this.objectives = resp.data
        console.log(resp)
      }
      catch (e) {
        // alert(e)
        this.$emit('notification', {
          msg: e.response.data.error.message,
          styleClass: 'is-warning'
        })
      }
    }
  }
}
</script>

<style>
#studentProfTable th {
  padding-left: 0px !important;
}
#studentProfTable button {
  margin-top: auto;
}
</style>
