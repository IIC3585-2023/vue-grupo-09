<script setup lang="ts">
import NavBar from './components/NavBar.vue';
import Modal from './components/Modal.vue';
import { useCity } from './stores/city';

const cityStore = useCity();

if (localStorage.getItem('cities')) {
  cityStore.setCities(JSON.parse(localStorage.getItem('cities')!));
}
</script>

<template>
  <Modal />
  <div class="section">
    <div class="container">
      <div class="app-header">
        <h1 class="app-name">ClimaPuro</h1>
        <p class="app-slogan">Información precisa sobre el clima y la calidad del aire en tiempo real</p>
      </div>
      <NavBar />
      <RouterView />
    </div>
  </div>
</template>

<style>
@import "https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css";

.app-header {
  text-align: center;
  margin-bottom: 20px;
}

.app-name {
  font-size: 24px;
  font-weight: bold;
}

.app-slogan {
  font-size: 14px;
  color: #888;
}
</style>
