<script setup lang="ts">
import { computed } from 'vue';
import NavBar from './components/NavBar.vue';
import { useModal } from './composables/modal';

const modal = useModal();

const modalStyle = computed(() => {
  return {
    display: modal.show.value ? 'block' : 'none',
  };
});
</script>

<template>
  <div class="modal" style="color: white" :style="modalStyle">
    <div class="modal-background">
      <div class="modal-content">
        <div id="modal"></div>
      </div>
    </div>
    <button class="modal-close is-large" @click="modal.hideModal"></button>
  </div>

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
