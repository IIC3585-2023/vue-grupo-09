<script setup lang="ts">
import { ref } from 'vue'
const periods = ['Hoy', 'Esta semana', 'Próximos 16 días']

const selectedPeriod = ref(periods[0])

function selectPeriod (period: string) {
  selectedPeriod.value = period
}
</script>

<template>
  <nav class="is-primary panel">
    <span class="panel-tabs">
      <!-- : -> v-bind: and @ -> v-on: -->
      <a v-for="period of periods" :key="period" :class="{ 'is-active': period === selectedPeriod }" @click="selectPeriod(period)">
        {{ period }}
      </a>
    </span>
    {{ selectedPeriod }}
  </nav>
</template>
