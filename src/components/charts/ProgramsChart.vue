<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">Skill Programs</p>
    </header>
    <div class="card-content">
      <bar-chart :chart-data="datacollection" :options="options"></bar-chart>
    </div>
  </div>
</template>