<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <div class="tile">
      <!-- The magical tile element! -->
    </div>
    
    <div class="columns">
      <div class="column">1</div>
      <div class="column">2</div>
      <div class="column">3</div>
      <div class="column">4</div>
      <div class="column">5</div>
    </div>


    <a class="button">
      Button
    </a>

    <a class="button is-primary">
      Primary button
    </a>

    <a class="button is-large">
      Large button
    </a>

    <a class="button is-loading">
      Loading button
    </a>

  </div>
</template>

<script>

export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js PWA'
    }
  }
}
</script>

<style lang="css">
/* @import "bulma/sass/utilities/_all" */
/* @import "bulma/sass/grid/columns" */

/* @import "bulma/sass/utilities/_all" */
/* @import "bulma/sass/elements/button.sass" */

/* @import ../ */
/* @import "bulma" */
</style>