<script setup lang="ts">
import { Weather } from "../scripts/weather";
import { DateTime } from "luxon";
import WeatherIcon from "./WeatherIcon.vue";

defineProps<{
  weather: Weather;
}>();
</script>
<template>
  <div
    class="bg-light-grey column is-1 is-flex is-flex-direction-column is-align-items-center is-justify-content-space-around"
  >
    <p class="title is-5 mb-2 has-text-white">
      {{
        DateTime.fromFormat(weather.dt, "ff").startOf("hour").toFormat("HH:mm")
      }}
    </p>
    <weather-icon :weather="weather.type_weather" />
    <div class="tag has-background-grey-light has-text-black is-medium">
      {{ weather.temp }}°C
    </div>
  </div>
</template>

<style scoped>
.bg-light-grey {
  background-color: #3e3636d4;
  border: 2px solid #5b5454d4;
  border-radius: 5%;
  margin: 0 4px;
}
</style>
