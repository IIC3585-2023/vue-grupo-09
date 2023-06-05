<script setup lang="ts">
import { ref, computed } from 'vue';
import FormInput from './FormInput.vue';
import { City } from '../scripts/city';
import { validate, required, isValidLatitude, isValidLongitude } from '../scripts/validation';
import { useCity } from '../stores/city';
import { useModal } from '../composables/modal';

const modal = useModal();
const cityStore = useCity();

const name = ref('');
const nameStatus = computed(() => {
  return validate(name.value, [required]);
})

const country = ref('');
const countryStatus = computed(() => {
  return validate(country.value, [required]);
})

const latitude = ref('');
const latitudeStatus = computed(() => {
  return validate(latitude.value, [required, isValidLatitude]);
})

const longitude = ref('');
const longitudeStatus = computed(() => {
  return validate(longitude.value, [required, isValidLongitude]);
})

const imageURL = ref('');
const imageURLStatus = computed(() => {
  return validate(imageURL.value, [required]);
})

const isInvalid = computed(() => {
  return !nameStatus.value.valid || !latitudeStatus.value.valid || !longitudeStatus.value.valid;
})

function handleSubmit() {
  const newCity: City = {
    name: name.value,
    country: country.value,
    latitude: Number(latitude.value),
    longitude: Number(longitude.value),
    imageURL: imageURL.value,
  }

  cityStore.addCity(newCity)
  modal.hideModal()
}
</script>

<template>
  <form class="form" @submit.prevent="handleSubmit">
    <FormInput name="Nombre de la ciudad" v-model="name" :status="nameStatus" />
    <FormInput name="País de la ciudad" v-model="country" :status="countryStatus" />
    <FormInput name="Latitud" v-model="latitude" :status="latitudeStatus" />
    <FormInput name="Longitud" v-model="longitude" :status="longitudeStatus" />
    <FormInput name="URL de la imagen" v-model="imageURL" :status="imageURLStatus" />
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
