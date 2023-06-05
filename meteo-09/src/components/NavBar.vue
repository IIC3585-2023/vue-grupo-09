<script setup lang="ts">
import CityForm from './CityForm.vue';
import { useModal } from '../composables/modal';
import { useCity } from '../stores/city';

const modal = useModal();

const cityStore = useCity();

function onCityChange(event: Event) {
  const selectedCityIdx = Number((event.target as HTMLSelectElement).value);
  cityStore.setSelectedCity(selectedCityIdx);
}
</script>

<template>
  <div class="navbar">
    <div class="navbar-start">
      <div class="control">
        <div class="select">
          <select @change="onCityChange">
            <option v-for="(city, idx) in cityStore.cities" :key="city.name" :value="idx">{{ city.name }}</option>
          </select>
        </div>
      </div>
      <button class="button" @click="modal.showModal">Añadir ciudad</button>
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