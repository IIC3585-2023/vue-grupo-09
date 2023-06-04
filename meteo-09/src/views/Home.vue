<script setup lang="ts">
import Weathers from './Weathers.vue';
</script>

<template>
  <Suspense>
    <template #default>
      <Weathers />
    </template>
    <template #fallback>
      <progress class="progress is-primary"></progress>
    </template>
  </Suspense>
</template>

<style>
@import "https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css";
</style>
