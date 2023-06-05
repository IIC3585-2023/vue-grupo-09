<script setup lang="ts">
import { Weather } from "../scripts/weather";
import LineItem from "../components/LineItem.vue";
import { DateTime } from "luxon";
import { useCity } from "../stores/city";

const cityStore = useCity();

defineProps<{
  weathers: Weather[];
  dayWeather: Weather;
}>();
</script>

<template>
  <div class="card my-2 weather-card"
    :style="`background-image: url(${cityStore.cities[cityStore.selectedCity].imageURL})`">
    <div class="card-content">
      <div class="is-flex is-justify-content-space-between">
        <p class="title is-1 has-text-white">
          {{
            DateTime.fromFormat(dayWeather.dt, "ff").toFormat(
              "cccc, d LLLL yyyy"
            )
          }}
        </p>
        <p class="title is-2 has-text-white mr-6 has-text-weight-light">
          Santiago,
        </p>
      </div>
      <div class="is-flex is-justify-content-space-between">
        <p class="subtitle is-4 has-text-white">
          {{ DateTime.fromFormat(dayWeather.dt, "ff").toFormat("HH:mm") }}
        </p>
        <p class="title is-3 has-text-white mr-6 has-text-weight-light">
          Chile
        </p>
      </div>

      <br />

      <div class="content has-text-grey has-text-bold">
        <p>Se siente como: {{ dayWeather.feels_like }}°C</p>
        <p>Presión atmosférica: {{ dayWeather.pressure }}hPa</p>
        <p>Humedad: {{ dayWeather.humidity }}%</p>
      </div>
      <LineItem :weathers="weathers" :dayWeather="dayWeather" />
    </div>
  </div>
</template>

<style scoped>
.weather-card {
  background-size: cover;
  background-position: center;
}
</style>
