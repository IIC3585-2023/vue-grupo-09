<script setup lang="ts">
import { Weather } from '../scripts/weather';

defineProps<{
  weather: Weather
}>()
</script>

<template>
  <a class="panel-block is-flex is-flex-direction-column">
    <p>{{ weather.dt }}</p>
    <p>Temperatura actual: {{ weather.temp }}°C</p>
    <p>Se siente como: {{ weather.feels_like }}°C</p>
    <p>Temperatura mínima: {{ weather.temp_min }}°C</p>
    <p>Temperatura máxima: {{ weather.temp_max }}°C</p>
    <p>Presión atmosférica: {{ weather.pressure }}hPa</p>
    <p>Humedad: {{ weather.humidity }}%</p>
  </a>
</template>