<script setup lang="ts">
import { Weather } from "../scripts/weather";
import WeatherIcon from "./WeatherIcon.vue";
import SmallWeatherItem from "./SmallWeatherItem.vue";
import { ref } from "vue";

const isCollapsed = ref(false);

defineProps<{
  weathers: Weather[];
  dayWeather: Weather;
}>();

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value;
};

const getTranslationValue = (index: number) => {
  return isCollapsed.value ? `-${index * 107}%` : "0";
};

const getOpacityValue = () => {
  return isCollapsed.value ? 0 : 1;
};

const lowestValue = (weather: Weather[], daily: Weather): number => {
  const allWeathers = [daily, ...weather];
  const value = allWeathers.reduce((minTemp, obj) => {
    if (obj.temp_min < minTemp) {
      return obj.temp;
    }
    return minTemp;
  }, Infinity);
  return value;
};

const biggestValue = (weather: Weather[], daily: Weather): number => {
  const allWeathers = [daily, ...weather];
  const value = allWeathers.reduce((minTemp, obj) => {
    if (obj.temp_max > minTemp) {
      return obj.temp;
    }
    return minTemp;
  }, -Infinity);
  return value;
};
</script>

<template>
  <div class="columns pt-6 pb-4">
    <div class="bg-light-grey column is-3">
      <div
        class="py-2 is-flex is-flex-direction-row pl-3 is-flex is-flex-direction-row"
      >
        <weather-icon
          class="mr-6 mt-3"
          size="is-128x128"
          :weather="dayWeather.type_weather"
        />
        <div
          class="is-flex is-flex-direction-column is-align-items-center is-justify-content-space-around"
        >
          <div style="white-space: nowrap">
            <p class="tag is-6 mb-2 has-text-white has-background-grey">
              Máxima{{ console.log(dayWeather) }}
            </p>
            <p class="title is-3 mb-2 has-text-white">
              {{ Math.round(biggestValue(weathers, dayWeather)) }}°C
            </p>
          </div>
          <div>
            <p class="tag is-6 mb-2 has-text-white has-background-grey">
              Mínima
            </p>
            <p class="title is-3 mb-2 has-text-white">
              {{ Math.round(lowestValue(weathers, dayWeather)) }}°C
            </p>
          </div>
        </div>
        <button class="buttoncito is-small" @click="toggleCollapse"></button>
      </div>
    </div>

    <SmallWeatherItem
      :class="{ SmallWeatherItem, collapsed: isCollapsed }"
      v-for="(weather, index) in weathers"
      :key="index"
      :weather="weather"
      :style="{
        transform: `translateX(${getTranslationValue(index)})`,
        opacity: getOpacityValue(),
      }"
    />
  </div>
</template>

<style scoped>
.SmallWeatherItem {
  transition: transform 1s ease-out, opacity 0.7s ease-in 0.2s;
}

.bg-light-grey {
  background-color: #3e3636d4;
  border: 2px solid #5b5454d4;
  border-radius: 5%;
  margin: 0 4px;
}

.buttoncito {
  width: 30px;
  margin-left: 20px;
  background-color: #3e3636d4;
}
</style>
