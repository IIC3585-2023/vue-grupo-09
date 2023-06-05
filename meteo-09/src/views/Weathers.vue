<script setup lang="ts">
import { watch } from 'vue';
import { useWeather } from '../stores/weather'
import { useCity } from '../stores/city';
import WeatherItem from '../components/WeatherItem.vue';
import { periodsTemp } from '../scripts/constants';

const weatherStore = useWeather()
const cityStore = useCity()

const fetchData = async () => {
  const { latitude, longitude } = cityStore.cities[cityStore.selectedCity]
  await Promise.all([
    weatherStore.fetchWeather(latitude, longitude),
    weatherStore.fetchWeathers(latitude, longitude)
  ])
}

await fetchData() // Initial fetch

watch(() => [cityStore.cities[cityStore.selectedCity].latitude, cityStore.cities[cityStore.selectedCity].longitude], async () => {
  await fetchData() // Fetch again when latitude or longitude changes
})
</script>

<template>
  <nav class="is-primary panel">
    <span class="panel-tabs">
      <!-- : -> v-bind: and @ -> v-on: -->
      <a v-for="period of periodsTemp" :key="period" :class="{ 'is-active': period === weatherStore.selectedPeriod }"
        @click="weatherStore.setSelectedPeriod(period)">
        {{ period }}
      </a>
    </span>
    <WeatherItem v-for="weather of weatherStore.filteredWeathers" :key="weather[0].dt" :weathers="weather.slice(1)"
      :dayWeather="weather[0]" />
  </nav>
</template>
