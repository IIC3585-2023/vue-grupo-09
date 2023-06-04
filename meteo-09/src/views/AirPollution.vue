<script setup lang="ts">
import AirPollutions from '../components/AirPollutions.vue';
</script>

<template>
  <Suspense>
    <template #default>
      <AirPollutions />
    </template>
    <template #fallback>
      <progress class="progress is-primary"></progress>
    </template>
  </Suspense>
</template>