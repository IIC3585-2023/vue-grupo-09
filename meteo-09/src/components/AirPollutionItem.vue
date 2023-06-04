<script setup lang="ts">
import { AirPollution } from '../scripts/airPollution';

defineProps<{
  airPollution: AirPollution
}>()

const aqiColors: { [key: number]: string } = {
  1: 'is-success',
  2: 'is-warning is-light',
  3: 'is-warning',
  4: 'is-danger is-light',
  5: 'is-danger',
}
</script>

<template>
  <div class="card my-2">
    <div class="card-content">
      <div class="content">
        <span :class="`tag is-medium ${aqiColors[airPollution.aqi]}`">
          AQI (Índice de Calidad del Aire):
          {{ airPollution.aqi }}
        </span>
      </div>
      <div class="content">
        <p class="title is-4">{{ airPollution.dt }}</p>
        <table class='table'>
          <thead>
            <tr>
              <th>CO (μg/m3)</th>
              <th>NO (μg/m3)</th>
              <th>NO<sub>2</sub> (μg/m3)</th>
              <th>O<sub>3</sub> (μg/m3)</th>
              <th>SO<sub>2</sub> (μg/m3)</th>
              <th>NH<sub>3</sub> (μg/m3)</th>
              <th>PM<sub>2.5</sub> (μg/m3)</th>
              <th>PM<sub>10</sub> (μg/m3)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ airPollution.co }}</td>
              <td>{{ airPollution.no }}</td>
              <td>{{ airPollution.no2 }}</td>
              <td>{{ airPollution.o3 }}</td>
              <td>{{ airPollution.so2 }}</td>
              <td>{{ airPollution.nh3 }}</td>
              <td>{{ airPollution.pm2_5 }}</td>
              <td>{{ airPollution.pm10 }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>