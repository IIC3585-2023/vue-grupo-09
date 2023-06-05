<script setup lang="ts">
import { useWeather } from "../stores/weather";
import WeatherItem from "../components/WeatherItem.vue";
import { periods } from "../scripts/constants";

const weatherStore = useWeather();

await Promise.all([weatherStore.fetchWeather(), weatherStore.fetchWeathers()]);
</script>

<template>
  <nav class="is-primary panel">
    <span class="panel-tabs">
      <!-- : -> v-bind: and @ -> v-on: -->
      <a
        v-for="period of periods"
        :key="period"
        :class="{ 'is-active': period === weatherStore.selectedPeriod }"
        @click="weatherStore.setSelectedPeriod(period)"
      >
        {{ period }}
      </a>
    </span>
    <WeatherItem
      v-for="weather of weatherStore.filteredWeathers"
      :key="weather[0].dt"
      :weathers="weather.slice(1)"
      :dayWeather="weather[0]"
    />
  </nav>
</template>
