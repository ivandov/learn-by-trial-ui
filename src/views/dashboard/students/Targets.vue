<template>
  <div class="columns">
    <div class="column is-4">
      <student-profile-card :id="this.$route.params.id" :open="false" />
      <br>
      <!-- <program-card :id="this.$route.params.programId"/> -->
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
import StudentProfileCard from '@/components/cards/StudentProfileCard'
import TargetList from '@/components/cards/TargetList'
import TargetForm from '@/components/forms/TargetForm'

export default {
  props: {
    create: Boolean
  },
  components: {
    StudentProfileCard,
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
