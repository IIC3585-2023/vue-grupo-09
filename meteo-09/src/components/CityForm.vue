<script setup lang="ts">
import { ref, computed } from 'vue';
import FormInput from './FormInput.vue';
import { City } from '../scripts/city';
import { validate, required, isValidLatitude, isValidLongitude } from '../scripts/validation';

const name = ref('');
const nameStatus = computed(() => {
  return validate(name.value, [required]);
})

const latitude = ref('');
const latitudeStatus = computed(() => {
  return validate(latitude.value, [required, isValidLatitude]);
})

const longitude = ref('');
const longitudeStatus = computed(() => {
  return validate(longitude.value, [required, isValidLongitude]);
})

const isInvalid = computed(() => {
  return !nameStatus.value.valid || !latitudeStatus.value.valid || !longitudeStatus.value.valid;
})

function handleSubmit() {
  const newCity: City = {
    name: name.value,
    latitude: Number(latitude.value),
    longitude: Number(longitude.value),
  }
  console.log(newCity);
}
</script>

<template>
  <form class="form" @submit.prevent="handleSubmit">
    <FormInput name="Nombre de la ciudad" v-model="name" :status="nameStatus" />
    <!-- v-model is equivalent to:
      <CustomInput
        :modelValue="searchText"
        @update:modelValue="newValue => searchText = newValue"
      /> -->
    <FormInput name="Latitud" v-model="latitude" :status="latitudeStatus" />
    <FormInput name="Longitud" v-model="longitude" :status="longitudeStatus" />
    <button class="button is-primary" :disabled="isInvalid">Añadir</button>
  </form>
</template>

<style scoped>
.form {
  background: white;
  padding: 30px;
  margin-top: 50px;
}
</style>
