<script setup lang="ts">
import { useModal } from '../composables/modal';

const modal = useModal();
</script>

<template>
  <div class="navbar">
    <div class="navbar-start">
      <div class="buttons">
        <button class="button" @click="modal.showModal">Add City</button>
      </div>
    </div>
    <div class="navbar-end">
      <div class="buttons">
        <!-- <RouterLink class="button" to="/map">Map</RouterLink> -->
        <RouterLink class="button" to="/">Temperaturas</RouterLink>
        <RouterLink class="button" to="/air-pollution">Contaminación del Aire</RouterLink>
      </div>
    </div>
  </div>
  <Teleport to="#modal">
    Content
  </Teleport>
</template>