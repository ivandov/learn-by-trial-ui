<template>
  <div class="card has-text-centered">
    <div class="card-content">
      <p class="title">{{ title }}</p>
    </div>
    <footer class="card-footer">
      <a :href="viewLink" class="card-footer-item">View</a>
      <a :href="addLink" class="card-footer-item">Add</a>
      <!-- <router-link :to="{path: viewLinkComponent}" class="card-footer-item">View</router-link>
      <router-link :to="{name: addLinkComponent}" class="card-footer-item">Add</router-link> -->
    </footer>
  </div>
</template>

<script>
export default {
  name: 'card',
  props: {
    title: String,
    viewLink: String,
    addLink: String,
    viewLinkComponent: String,
    addLinkComponent: String
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
