<script setup lang="ts">
import { ref } from 'vue'
import { useWeather } from '../stores/weather'
import WeatherItem from '../components/WeatherItem.vue';

const weatherStore = useWeather()

const periods = ['Ahora', 'Próximos 5 días'] as const

type Period = typeof periods[number]

const selectedPeriod = ref<Period>(periods[0])

function selectPeriod (period: Period) {
  selectedPeriod.value = period
}

// const weathers = computed<Weather[]>(() => [
//   today,
//   thisWeek,
//   sixteenDays
// ].filter(weather => weather.period === selectedPeriod.value))
</script>

<template>
  <nav class="is-primary panel">
    <span class="panel-tabs">
      <!-- : -> v-bind: and @ -> v-on: -->
      <a v-for="period of periods" :key="period" :class="{ 'is-active': period === selectedPeriod }" @click="selectPeriod(period)">
        {{ period }}
      </a>
    </span>
    <WeatherItem v-if="selectedPeriod === 'Ahora'" :weather="weatherStore.weather" />
    <WeatherItem v-else v-for="weather of weatherStore.weathers" :key="weather.dt" :weather="weather" />
  </nav>
</template>
