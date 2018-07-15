<template>
  <b-modal :active.sync="isSessionModalActive">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">New Session Label</p>
      </header>
      <div class="card-content">
        <div class="field">
          <!-- <label class="label">Session Label</label> -->
          <div class="control">
            <input class="input" type="text" placeholder="Session 1 - Colors Program" v-model="sessionLabel">
          </div>
        </div>
      </div>
      <footer class="card-footer">
        <a class="card-footer-item" @click="createSession">Start Session</a>
      </footer>
    </div>
  
  </b-modal>
</template>

<script>
export default {

}
</script>

<style>

</style>
