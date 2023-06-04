<script setup lang="ts">
import { useAirPollution } from '../stores/airPollution'
import { periods } from '../scripts/constants';
import AirPollutionItem from './AirPollutionItem.vue';

const airPollutionStore = useAirPollution()

await Promise.all([
  airPollutionStore.fetchAirPollution(),
  airPollutionStore.fetchAirPollutions()
])
</script>

<template>
  <nav class="is-primary panel">
    <span class="panel-tabs">
      <!-- : -> v-bind: and @ -> v-on: -->
      <a v-for="period of periods" :key="period" :class="{ 'is-active': period === airPollutionStore.selectedPeriod }"
        @click="airPollutionStore.setSelectedPeriod(period)">
        {{ period }}
      </a>
    </span>
    <AirPollutionItem v-for="airPollution of airPollutionStore.filteredAirPollutions" :key="airPollution.dt"
      :weather="airPollution" :air-pollution="airPollution" />
  </nav>
</template>