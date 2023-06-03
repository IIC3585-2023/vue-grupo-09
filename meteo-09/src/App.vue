<script setup lang="ts">
import HomeView from './views/HomeView.vue';
</script>
<!-- <script lang="ts">
var info = {}
export default {
  mounted() {
    fetch('https://api.openweathermap.org/data/2.5/forecast?lat=-33.45694&lon=-70.64827&appid=ddec887a4abcfa9dca8520346d2b065c&units=metric&lang=es')
      .then(response => response.json())
      .then(data => {
        // Aquí puedes acceder a los datos de respuesta y utilizarlos en tu componente
        info = data;
        console.log(info);
      })
      .catch(error => {
        // Manejo de errores
        console.error(error);
      });
  }
}
</script> -->

<template>
  <div class="section">
    <div class="container">
      <HomeView />
    </div>
  </div>
</template>

<style>
@import "https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css";
</style>
