<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
</script>
<script lang="ts">
  var info = {}
  export default {
    mounted() {
      fetch('https://api.openweathermap.org/data/2.5/forecast?lat=-33.45694&lon=-70.64827&appid=ddec887a4abcfa9dca8520346d2b065c')
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
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
