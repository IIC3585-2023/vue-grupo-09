<script setup lang="ts">
import { useAirPollution } from '../stores/airPollution'

const airPollutionStore = useAirPollution()

await airPollutionStore.fetchAirPollution()
</script>

<template>
  <div class="columns">
    <div class="column">
      <div class="box">
        {{ airPollutionStore.airPollution }}
      </div>
    </div>
  </div>
</template>