<script setup lang="ts">
import { Weather } from '../scripts/weather';

defineProps<{
  weather: Weather
}>()
</script>

<template>
  <div class="card">
    <div class="card-content">
      <figure v-if="weather.type_weather == 'Clouds'" class="image is-48x48">
        <img src="../assets/cloudy.png" alt="cloudy day">
      </figure>
      <figure v-else-if="weather.type_weather == 'Rain'" class="image is-48x48">
        <img src="../assets/rainy.png" alt="rainy day">
      </figure>
      <figure v-else-if="weather.type_weather == 'Clear'" class="image is-48x48">
        <img src="../assets/sun.png" alt="sunny day">
      </figure>
      <div class="media">
        <div class="media-content">
          <p class="title is-4">{{ weather.dt }}</p>
          <p class="subtitle is-6">{{weather.temp}}°C</p>
        </div>
      </div>

      

      <div class="content">
        <p>Se siente como: {{ weather.feels_like }}°C</p>
          <p>Presión atmosférica: {{ weather.pressure }}hPa</p>
          <p>Humedad: {{ weather.humidity }}%</p>
        <div class="tags has-addons">
          <span class="tag is-info is-medium">{{ weather.temp_min }}°C</span>
          <span class="tag is-primary is-medium">{{ weather.temp_max }}°C</span>
        </div>
      </div>
    </div>
  </div>
</template>