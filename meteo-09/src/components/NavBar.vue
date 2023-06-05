<script setup lang="ts">
import { ref, watch } from 'vue';
import CityForm from './CityForm.vue';
import { useModal } from '../composables/modal';
import { useCity } from '../stores/city';

const modal = useModal();
const cityStore = useCity();

const selectedCityIdx = ref(cityStore.selectedCity);

function onCityChange() {
  cityStore.setSelectedCity(selectedCityIdx.value);
}

watch(() => cityStore.selectedCity, (newIdx) => {
  selectedCityIdx.value = newIdx;
});
</script>

<template>
  <div class="navbar">
    <div class="navbar-start">
      <div class="control">
        <div class="select">
          <select v-model="selectedCityIdx" @change="onCityChange">
            <option v-for="(city, idx) in cityStore.cities" :key="city.name" :value="idx">{{ city.name }}</option>
          </select>
        </div>
      </div>
      <button class="button mx-2" @click="modal.showModal">Añadir ciudad</button>
    </div>
    <div class="navbar-end">
      <div class="buttons">
        <!-- <RouterLink class="button" to="/map">Map</RouterLink> -->
        <RouterLink class="button" to="/">Temperaturas</RouterLink>
        <RouterLink class="button" to="/air-pollution">Contaminación del aire</RouterLink>
      </div>
    </div>
  </div>
  <Teleport to="#modal">
    <CityForm />
  </Teleport>
</template>
