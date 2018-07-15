<template>
  <div class="columns is-centered">
    <div class="column is-4">
      <card title="Students" view-link="/dashboard/students" add-link="/dashboard/students/add" ></card>
    </div>
    <div class="column is-4">
      <div class="card has-text-centered">
        <div class="card-content">
          <p class="title">Appointments</p>
        </div>
        <footer class="card-footer">
          <a class="card-footer-item" href="/dashboard/appointments">New Appointment</a>
        </footer>
      </div>
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
