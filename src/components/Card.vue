<template>
  <div class="card has-text-centered">
    <div class="card-content">
      <p class="title">{{ title }}</p>
    </div>
    <footer class="card-footer">
      <a :href="viewLink" class="card-footer-item">View</a>
      <a :href="addLink" class="card-footer-item">Add</a>
      <!-- <a href="#" class="card-footer-item">Delete</a> -->
    </footer>
  </div>
</template>

<script>
export default {
  name: 'card',
  props: {
    title: String,
    viewLink: String,
    addLink: String
  },
  data () {
    return {}
  }
}
</script>

<style>
.card-content{
  min-height: 200px;
  justify-content: center;
  align-items: center;
  display: flex;
}
</style>
