<template>
  <div class="columns">
    <div class="column is-4">
      <student-profile :id="this.$route.params.id" ></student-profile>
    </div>
    <div class="column">
      <objective-form :create="this.create"/>
    </div>
    <div class="column" v-if="!this.create">
      <target-list show-add-button/>
    </div>
  </div>
</template>

<script>
import StudentProfile from '@/components/student/Profile'
import ObjectiveForm from '@/components/forms/ObjectiveForm'

export default {
  props: {
    create: Boolean
  },
  components: {
    StudentProfile,
    ObjectiveForm
  },
  data () {
    return {}
  }
}
</script>

<style>

</style>
