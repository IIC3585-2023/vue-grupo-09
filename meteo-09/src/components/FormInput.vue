<script setup lang="ts">
import { Status } from '../scripts/validation'

defineProps<{
  name: string
  modelValue: string
  status: Status
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', newValue: string): void
}>()

function handleInput(e: Event) {
  const value = (e.target as HTMLInputElement).value
  emit('update:modelValue', value)
}
</script>

<template>
  <div class="field">
    <label :for="name" class="label">{{ name }}</label>
    <div class="control">
      <input type="text" class="input" :id="name" :value="modelValue" @input="handleInput">
    </div>

    <p class="is-danger help" v-if="!status.valid">{{ status.message }}</p>
  </div>
</template>