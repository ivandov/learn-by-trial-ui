<template>
  <div class="card modal-card">
    <header class="card-header">
      <p class="card-header-title">{{program.label}} - Targets</p>
    </header>
    <div class="card-content">
      <span class="has-text-weight-bold">Description:</span>
      <span>{{program.description}}</span>
      <br><br>
      <b-collapse class="card" v-for="target in program.targets" :key="target.id" :open="false">
        <div slot="trigger" slot-scope="props" class="card-header">
            <p class="card-header-title">{{target.label}}</p>
            <a class="card-header-icon">
              <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"></b-icon>
            </a>
        </div>
        <div class="card-content">
          <div class="content">{{target.description}}</div>
        </div>
        <footer class="card-footer trial">
          <!-- <router-link class="button is-fullwidth is-success" :to="{name: 'SessionTrial'}">Start Trial</router-link> -->
          <button class="button is-fullwidth is-success" @click="startTrial(program, target)">Start Trial</button>
        </footer>
      </b-collapse>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    program: Object
  },
  data () {
    return {}
  },
  mounted () {
  },
  methods: {
    startTrial (program, target) {
      this.$emit('close')
      this.$router.push({
        name: 'SessionTrial',
        query: {
          program: program.id,
          target: target.id
        }
      })
    }
  }
}
</script>

<style>

</style>
