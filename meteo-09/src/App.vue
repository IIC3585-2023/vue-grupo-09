<script setup lang="ts">
import NavBar from './components/NavBar.vue';
import Modal from './components/Modal.vue';
</script>

<template>
  <Modal />
  <div class="section">
    <div class="container">
      <NavBar />
      <RouterView />
    </div>
  </div>
</template>

<style>
@import "https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css";
</style>
