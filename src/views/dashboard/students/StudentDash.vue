<template>
  <div class="columns">
    <div class="column is-4">
      <student-profile-card :id="this.$route.params.id" show-buttons force-open/>
    </div>
    <div class="column is-8">
      <router-view />
    </div>
  </div>
</template>

<script>
import StudentProfileCard from '@/components/cards/StudentProfileCard'

export default {
  name: 'Student',
  components: {
    StudentProfileCard
  },
  data () {
    return {}
  }
}
</script>

<style>
#studentProf table th {
  padding-left: 0px !important;
}
#studentProf button {
  margin-bottom: 5px;
  margin-top: auto;
}
</style>
