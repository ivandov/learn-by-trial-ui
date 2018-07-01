<template>
  <section>
    <div class="columns">
      <div class="column is-4">
        <card title="Students" view-link="students" add-link="students/add" ></card>
      </div>
    </div>
  </section>
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
