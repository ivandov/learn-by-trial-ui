<template>
  <b-table :data="targets" default-sort="startDate" detailed detail-key="id">
    <template slot="empty">
      <div class="content has-text-grey has-text-centered">
        <b-icon icon="emoticon-sad" size="is-medium"></b-icon>
        <p>Nothing here.</p>
      </div>
    </template>

    <template slot-scope="props">
      <b-table-column field="id" label="Label">
        <!-- <router-link :to="{name: 'StudentProgramEdit', params: {id: $route.params.id, programId: props.row.id}}">{{props.row.label}}</router-link> -->
        {{props.row.label}}
      </b-table-column>
      <b-table-column field="startDate" label="Start Date" sortable>
          {{ new Date(props.row.startDate).toLocaleDateString() }}
      </b-table-column>
    </template>

    <template slot="detail" slot-scope="props">
      <p>{{props.row.description}}</p>
    </template>
  </b-table>
</template>

<script>
export default {
  props: {
    programId: String
  },
  data () {
    return {
      targets: []
    }
  },
  mounted () {
    this.getStudentPrograms(this.programId)
  },
  methods: {
    async getStudentPrograms (id) {
      let uri = `/programs/${id}/targets`

      try {
        let resp = await this.$http.get(uri)
        this.targets = resp.data
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
