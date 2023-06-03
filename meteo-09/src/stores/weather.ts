import { defineStore } from 'pinia'
import { DateTime } from 'luxon'
import { Weather } from '../scripts/weather'
import { Period } from '../scripts/constants'

interface WeatherState {
  weather: Weather
  weathers: Weather[]
  selectedPeriod: Period
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
    weathers: [],
    selectedPeriod: 'Ahora'
  }),

  actions: {
    setSelectedPeriod(period: Period) {
      this.selectedPeriod = period
    },
    updateWeather(weather: Weather) {
      this.weather = weather
    },
    updateWeathers(weathers: Weather[]) {
      this.weathers = weathers
    }
  },

  getters: {
    filteredWeathers: (state): Weather[] => {
      switch (state.selectedPeriod) {
        case 'Ahora':
          return [state.weather]
        case 'Hoy':
          return state.weathers.filter(weather => DateTime.fromFormat(weather.dt, 'ff').hasSame(DateTime.now().toLocal(), 'day'))
        case 'Mañana':
          return state.weathers.filter(weather => DateTime.fromFormat(weather.dt, 'ff').hasSame(DateTime.now().toLocal().plus({ days: 1 }), 'day'))
        case 'Próximos 5 días':
          return state.weathers
      }
    }
  }
})
