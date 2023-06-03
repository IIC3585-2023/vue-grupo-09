<script setup lang="ts">
import HomeView from './views/HomeView.vue';
</script>
<script lang="ts">
import { DateTime } from 'luxon';
import { useWeather } from './stores/weather';
import { Weather } from './scripts/weather';

export default {
  mounted() {
    fetch('https://api.openweathermap.org/data/2.5/weather?lat=-33.45694&lon=-70.64827&appid=ddec887a4abcfa9dca8520346d2b065c&units=metric&lang=es')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const weather: Weather = {
          dt: DateTime.fromSeconds(data.dt).toLocal().toFormat('ff') || '',
          temp: data.main.temp,
          feels_like: data.main.feels_like,
          temp_min: data.main.temp_min,
          temp_max: data.main.temp_max,
          pressure: data.main.pressure,
          humidity: data.main.humidity,
        };
        useWeather().updateWeather(weather);
      })
      .catch(error => {
        console.error(error);
      });

    fetch('https://api.openweathermap.org/data/2.5/forecast?lat=-33.45694&lon=-70.64827&appid=ddec887a4abcfa9dca8520346d2b065c&units=metric&lang=es')
    .then(response => response.json())
      .then(data => {
        console.log(data);
        const { list } = data;
        const weathers = list.map((weather: { dt: number; main: { temp: number; feels_like: number; temp_min: number; temp_max: number; pressure: number; humidity: number; }; }) => {
          return {
            dt: DateTime.fromSeconds(weather.dt).toLocal().toFormat('ff') || '',
            temp: weather.main.temp,
            feels_like: weather.main.feels_like,
            temp_min: weather.main.temp_min,
            temp_max: weather.main.temp_max,
            pressure: weather.main.pressure,
            humidity: weather.main.humidity,
          };
        })
        useWeather().updateWeathers(weathers);
      })
      .catch(error => {
        console.error(error);
      });
  }
}
</script>

<template>
  <div class="section">
    <div class="container">
      <HomeView />
    </div>
  </div>
</template>

<style>
@import "https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css";
</style>
