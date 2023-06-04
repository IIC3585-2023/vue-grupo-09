<script setup lang="ts">
import { Weather } from '../scripts/weather';

defineProps<{
  weather: Weather
}>()
</script>

<template>
  <div class="card">
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <p class="title is-4">{{ weather.dt }}</p>
          <p class="subtitle is-6">{{weather.type_weather}}</p>
        </div>
        <div class="media-right">
          <figure v-if="weather.type_weather == 'Clouds'" class="image is-48x48">
            <img src="../assets/cloudy.png" alt="cloudy day">
          </figure>
          <figure v-else-if="weather.type_weather == 'Rain'" class="image is-48x48">
            <img src="../assets/rainy.png" alt="rainy day">
          </figure>
          <figure v-else-if="weather.type_weather == 'Clear'" class="image is-48x48">
            <img src="../assets/sun.png" alt="sunny day">
          </figure>
        </div>
      </div>

      <div class="content">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Phasellus nec iaculis mauris. <a>@bulmaio</a>.
        <a href="#">#css</a> <a href="#">#responsive</a>
        <br>
        <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
      </div>
    </div>
  </div>
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