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
    async fetchWeather() {
      await fetch('https://api.openweathermap.org/data/2.5/weather?lat=-33.45694&lon=-70.64827&appid=ddec887a4abcfa9dca8520346d2b065c&units=metric&lang=es')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const weather: Weather = {
          dt: DateTime.fromSeconds(data.dt).toLocal().toFormat('ff') || '',
          temp: data.main.temp,
          feels_like: data.main.feels_like,
          temp_min: data.main.temp_min,
          temp_max: data.main.temp_max,
          pressure: data.main.pressure,
          humidity: data.main.humidity,
        };
        useWeather().updateWeather(weather);
      })
      .catch(error => {
        console.error(error);
      });
    },
    async fetchWeathers() {
      await fetch('https://api.openweathermap.org/data/2.5/forecast?lat=-33.45694&lon=-70.64827&appid=ddec887a4abcfa9dca8520346d2b065c&units=metric&lang=es')
    .then(response => response.json())
      .then(data => {
        console.log(data);
        const { list } = data;
        const weathers = list.map((weather: { dt: number; main: { temp: number; feels_like: number; temp_min: number; temp_max: number; pressure: number; humidity: number; }; }) => {
          return {
            dt: DateTime.fromSeconds(weather.dt).toLocal().toFormat('ff') || '',
            temp: weather.main.temp,
            feels_like: weather.main.feels_like,
            temp_min: weather.main.temp_min,
            temp_max: weather.main.temp_max,
            pressure: weather.main.pressure,
            humidity: weather.main.humidity,
          };
        })
        useWeather().updateWeathers(weathers);
      })
      .catch(error => {
        console.error(error);
      });
    },
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
