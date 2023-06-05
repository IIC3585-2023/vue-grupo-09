<script setup lang="ts">
import { watch } from 'vue';
import { useAirPollution } from '../stores/airPollution'
import { useCity } from '../stores/city';
import { periodsPol } from '../scripts/constants';
import AirPollutionItem from './AirPollutionItem.vue';

const airPollutionStore = useAirPollution()
const cityStore = useCity()

const fetchData = async () => {
  const { latitude, longitude } = cityStore.cities[cityStore.selectedCity]
  await Promise.all([
    airPollutionStore.fetchAirPollution(latitude, longitude),
    airPollutionStore.fetchAirPollutions(latitude, longitude)
  ])
}

await fetchData()

watch(() => [cityStore.cities[cityStore.selectedCity].latitude, cityStore.cities[cityStore.selectedCity].longitude], async () => {
  await fetchData()
})
</script>

<template>
  <nav class="is-primary panel">
    <span class="panel-tabs">
      <!-- : -> v-bind: and @ -> v-on: -->
      <a v-for="period of periodsPol" :key="period" :class="{ 'is-active': period === airPollutionStore.selectedPeriod }"
        @click="airPollutionStore.setSelectedPeriod(period)">
        {{ period }}
      </a>
    </span>
    <AirPollutionItem v-for="airPollution of airPollutionStore.filteredAirPollutions" :key="airPollution.dt"
      :weather="airPollution" :air-pollution="airPollution" />
  </nav>
</template>
