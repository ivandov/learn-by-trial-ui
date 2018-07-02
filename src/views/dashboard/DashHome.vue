<template>
  <div class="columns is-centered">
    <!-- <div class="column is-4">
      <card title="Students" view-link-component="Students" add-link-component="StudentAdd" ></card>
    </div>
    <div class="column is-4">
      <card title="Trials" view-link-component="Students" add-link-component="StudentAdd" ></card>
    </div> -->
    <div class="column is-4">
      <card title="Students" view-link="/dashboard/students" add-link="/dashboard/students/add" ></card>
    </div>
    <div class="column is-4">
      <card title="Trials" view-link="" add-link="" ></card>
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card'

export default {
  name: 'DashHome',
  components: {
    Card
  },
  data () {
    return {
    }
  }
}
</script>

<style>

</style>
