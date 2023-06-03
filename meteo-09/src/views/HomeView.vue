<script setup lang="ts">
import { ref, computed } from 'vue'
import { Weather, today, thisWeek, sixteenDays } from '../scripts/weather'
import { useWeather } from '../stores/weather'
import WeatherItem from '../components/WeatherItem.vue';

const weathersStore = useWeather()

const periods = ['Hoy', 'Esta semana', 'Próximos 16 días'] as const

type Period = typeof periods[number]

const selectedPeriod = ref<Period>(periods[0])

function selectPeriod (period: Period) {
  selectedPeriod.value = period
}

const weathers = computed<Weather[]>(() => [
  today,
  thisWeek,
  sixteenDays
].filter(weather => weather.period === selectedPeriod.value))
</script>

<template>
  {{ weathersStore.dt }} 
  <nav class="is-primary panel">
    <span class="panel-tabs">
      <!-- : -> v-bind: and @ -> v-on: -->
      <a v-for="period of periods" :key="period" :class="{ 'is-active': period === selectedPeriod }" @click="selectPeriod(period)">
        {{ period }}
      </a>
    </span>
    <WeatherItem v-for="weather of weathers" :key="weather.period" :weather="weather" />
  </nav>
</template>
