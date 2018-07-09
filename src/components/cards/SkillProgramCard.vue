<template>
  <b-collapse class="card">
    <div slot="trigger" slot-scope="props" class="card-header">
      <p class="card-header-title">
        Skill Program
      </p>
      <a class="card-header-icon">
        <b-icon
            :icon="props.open ? 'menu-down' : 'menu-up'">
        </b-icon>
      </a>
    </div>
    <div class="card-content">
      <table class="table is-fullwidth is-hoverable">
        <tbody>
          <tr>
            <th>Label</th>
            <td>{{ program.label }}</td>
          </tr>
          <tr>
            <th>Objective</th>
            <td>{{ program.objective }}</td>
          </tr>
          <tr>
            <th>Start Date</th>
            <td>{{ program.startDate | moment('MM/DD/YYYY')}}</td>
          </tr>
          <tr>
            <th>Description</th>
            <td>{{ program.description }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </b-collapse>
</template>

<script>
export default {
  props: {
    id: String
  },
  data () {
    return {
      program: {},
      programs: []
    }
  },
  mounted () {
    this.getStudentProgram(this.id)
  },
  methods: {
    async getStudentProgram (id) {
      let uri = `/programs/${id}`

      try {
        let resp = await this.$http.get(uri)
        this.program = resp.data
        this.programs.push(resp.data)
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

</style>
