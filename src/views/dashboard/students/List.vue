<template>
  <div class="columns is-centered">
    <div class="column is-12">
      <div class="card">
        <header class="card-header">
          <p class="card-header-title">All Students</p>
        </header>
        <div class="card-content">
          <b-field>
            <b-input placeholder="Search..."
                type="search"
                icon="magnify"
                v-model="search_query.name">
            </b-input>
          </b-field>

          <b-table :data="filter">
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
            </template>

            <template slot="empty">
                <section class="section">
                    <div class="content has-text-grey has-text-centered">
                        <p>
                            <b-icon
                                icon="emoticon-sad"
                                size="is-large">
                            </b-icon>
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
export default {
  name: 'Students',
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
      let uri = process.env.API_URL + '/students'
      let res = await this.$http.get(uri)
      this.students = res.data
    }
  }
}
</script>

<style>

</style>
