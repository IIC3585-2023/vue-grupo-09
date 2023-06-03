import { defineStore } from 'pinia'
import { Weather } from '../scripts/weather'

interface WeatherState {
  weather: Weather
  weathers: Weather[]
}

export const useWeather = defineStore('weathers', {
  state: (): WeatherState => ({
    weather: {
      dt: '',
      temp: 0,
      feels_like: 0,
      temp_min: 0,
      temp_max: 0,
      pressure: 0,
      humidity: 0
    },
    weathers: []
  }),

  actions: {
    updateWeather(weather: Weather) {
      this.weather = weather
    },
    updateWeathers(weathers: Weather[]) {
      this.weathers = weathers
    }
  }
})
