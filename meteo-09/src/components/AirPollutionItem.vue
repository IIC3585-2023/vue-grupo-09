<script setup lang="ts">
import { AirPollution } from '../scripts/airPollution';

defineProps<{
  airPollution: AirPollution
}>()
</script>

<template>
  <div class="card my-2">
    <div class="card-content">
      <div class="content">
        <span v-if="airPollution.aqi <= 50" class="tag is-success is-medium">AQI: {{ airPollution.aqi }}</span>
        <span v-if="airPollution.aqi > 50 && airPollution.aqi <= 150" class="tag is-warning is-medium">AQI: {{ airPollution.aqi }}</span>
        <span v-if="airPollution.aqi > 150" class="tag is-danger is-medium">AQI: {{ airPollution.aqi }}</span>
      </div> 
      <div class="content">
        <p class="title is-4">{{ airPollution.dt }}</p>
        <table class='table'>
          <thead>
            <tr>
              <th>CO</th>
              <th>NO</th>
              <th>NO2</th>
              <th>O3</th>
              <th>SO2</th>
              <th>NH3</th>
              <th>PM 2.5</th>
              <th>PM 10</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{airPollution.co}}</td>
              <td>{{airPollution.no}}</td>
              <td>{{airPollution.no2}}</td>
              <td>{{airPollution.o3}}</td>
              <td>{{airPollution.so2}}</td>
              <td>{{airPollution.nh3}}</td>
              <td>{{airPollution.pm2_5}}</td>
              <td>{{airPollution.pm10}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>