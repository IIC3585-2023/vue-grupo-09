<script setup lang="ts">
import { Weather } from '../scripts/weather';

defineProps<{
  weather: Weather
}>()
</script>

<template>
  <a class="panel-block is-flex is-flex-direction-column">
    <a>{{ weather.dt }}</a>
    <div>{{ weather.temp }}</div>
  </a>
</template>