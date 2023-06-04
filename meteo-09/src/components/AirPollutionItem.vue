<script setup lang="ts">
import { AirPollution } from '../scripts/airPollution';

defineProps<{
  airPollution: AirPollution
}>()
</script>

<template>
  <a class="panel-block is-flex is-flex-direction-column">
    <p>{{ airPollution.dt }}</p>
    {{ airPollution }}
  </a>
</template>