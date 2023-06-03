import { defineStore } from 'pinia'

interface WeatherState {
  dt: string
}

export const useWeather = defineStore('weathers', {
  state: (): WeatherState => ({
    dt: 'Hola'
  }),

  actions: {
    updateWeather(dt: string) {
      this.dt = dt
    }
  }
})
