<template>
  <div class="columns">
    <div class="column is-4">
      <student-profile :id="this.$route.params.id" ></student-profile>
    </div>
    <div class="column">
      <program-form :create="this.create"/>
    </div>
    <div class="column" v-if="!this.create">
      <target-list show-add-button/>
    </div>
  </div>
</template>

<script>
import StudentProfile from '@/components/student/Profile'
import ProgramForm from '@/components/forms/SkillProgramForm'
import TargetList from '@/components/cards/TargetList'

export default {
  name: 'StudentProgramAdd',
  props: {
    create: Boolean
  },
  components: {
    StudentProfile,
    ProgramForm,
    TargetList
  },
  data () {
    return {}
  }
}
</script>

<style>
#addTarget {
  display: flex;
}
</style>
