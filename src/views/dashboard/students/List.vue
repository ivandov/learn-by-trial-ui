<template>
  <div class="columns is-centered">
    <div class="column is-12">
      <div class="card">
        <header class="card-header">
          <p class="card-header-title title">All Students</p>
        </header>
        <div class="card-content">
          <table class="table is-fullwidth is-hoverable">
            <thead>
              <tr>
                <th>Name</th>
                <th>Birthdate</th>
                <th>Sex</th>
                <th>Race</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="student in students" :key="student.id">
                <td><router-link :to="{name: 'Student', params: { id: student.id}}">{{student.name}}</router-link></td>
                <td>{{ student.birthdate | moment("MM/DD/YYYY") }}</td>
                <td>{{ student.sex }}</td>
                <td>{{ student.race }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Students',
  data () {
    return {
      students: []
    }
  },
  mounted () {
    this.getStudents()
  },
  methods: {
    async getStudents () {
      let uri = process.env.API_URL + '/students'
      let res = await this.$http.get(uri)
      this.students = res.data
    }
  }
}
</script>

<style>

</style>
