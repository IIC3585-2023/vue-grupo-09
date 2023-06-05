<template>
  <figure :class="`image ${size} mb-2`">
    <img :src="imageSrc" :alt="altText" />
  </figure>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import cloudyImg from "../assets/cloudy.png";
import rainyImg from "../assets/rainy.png";
import sunImg from "../assets/sun.png";

export default defineComponent({
  props: {
    weather: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      default: "is-48x48",
    },
  },
  computed: {
    imageSrc(): string {
      if (this.weather === "Clouds") {
        return cloudyImg;
      } else if (this.weather === "Rain") {
        return rainyImg;
      } else if (this.weather === "Clear") {
        return sunImg;
      } else {
        return sunImg;
      }
    },
    altText(): string {
      if (this.weather === "Clouds") {
        return "cloudy day";
      } else if (this.weather === "Rain") {
        return "rainy day";
      } else if (this.weather === "Clear") {
        return "sunny day";
      } else {
        return "";
      }
    },
  },
});
</script>
