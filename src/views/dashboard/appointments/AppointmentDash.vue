<template>
  <div class="columns">
    <div class="column is-4">
      <student-profile :id="this.$route.params.id" show-buttons></student-profile>
    </div>
    <div class="column is-8">
      <student-skill-programs/>
      <br>
      <student-supplementary-objectives/>
    </div>
  </div>
</template>

<script>
import StudentProfile from '@/components/student/Profile'
import StudentSkillPrograms from '@/components/student/SkillPrograms'
import StudentSupplementaryObjectives from '@/components/student/SupplementaryObjectives'

export default {
  name: 'Student',
  components: {
    StudentProfile,
    StudentSkillPrograms,
    StudentSupplementaryObjectives
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
