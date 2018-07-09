<template>
  <div class="columns">
    <div class="column is-4">
      <student-profile :id="this.$route.params.id" :open="false"></student-profile>
      <br>
      <program-card :id="this.$route.params.programId"/>
    </div>
    <div class="column">
      <target-list/>
    </div>
    <div class="column">
      <target-form create/>
    </div>
  </div>
</template>

<script>
import StudentProfile from '@/components/student/Profile'
import ProgramCard from '@/components/cards/SkillProgramCard'
import TargetList from '@/components/cards/TargetList'
import TargetForm from '@/components/forms/TargetForm'

export default {
  props: {
    create: Boolean
  },
  components: {
    StudentProfile,
    ProgramCard,
    TargetList,
    TargetForm
  },
  data () {
    return {}
  },
  mounted () {
    console.log(this.create)
  }
}
</script>

<style>
#addTarget {
  display: flex;
}
</style>
