<script setup lang="ts">
import HomeView from './views/HomeView.vue';
</script>

<template>
  <div class="section">
    <div class="container">
      <Suspense>
        <template #default>
          <HomeView />
        </template>
        <template #fallback>
          <progress class="progress is-primary"></progress>
        </template>
      </Suspense>
    </div>
  </div>
</template>

<style>
@import "https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css";
</style>
