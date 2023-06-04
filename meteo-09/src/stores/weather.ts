import { defineStore } from 'pinia'
import { DateTime } from 'luxon'
import { Weather } from '../scripts/weather'
import { Period, periods } from '../scripts/constants'

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
      humidity: 0,
      type_weather: ''
    },
    weathers: [],
    selectedPeriod: 'Ahora',
  }),

  actions: {
    async fetchWeather() {
      await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=-33.45694&lon=-70.64827&appid=${import.meta.env.VITE_API_KEY}&units=metric&lang=es`)
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
          type_weather: data.weather[0].main,
        };
        useWeather().updateWeather(weather);
      })
      .catch(error => {
        console.error(error);
      });
    },

    async fetchWeathers() {
      await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=-33.45694&lon=-70.64827&appid=${import.meta.env.VITE_API_KEY}&units=metric&lang=es`)
    .then(response => response.json())
      .then(data => {
        console.log(data);
        const weathers = data.list.map((weather: { dt: number; main: { temp: number; feels_like: number; temp_min: number; temp_max: number; pressure: number; humidity: number; }; weather: any }) => {
          return {
            dt: DateTime.fromSeconds(weather.dt).toLocal().toFormat('ff') || '',
            temp: weather.main.temp,
            feels_like: weather.main.feels_like,
            temp_min: weather.main.temp_min,
            temp_max: weather.main.temp_max,
            pressure: weather.main.pressure,
            humidity: weather.main.humidity,
            type_weather: weather.weather[0].main,
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
        case periods[0]: // Ahora
          return [state.weather]
        case periods[1]: // Hoy
          return state.weathers.filter(weather => DateTime.fromFormat(weather.dt, 'ff').hasSame(DateTime.now().toLocal(), 'day'))
        case periods[2]: // Mañana
          return state.weathers.filter(weather => DateTime.fromFormat(weather.dt, 'ff').hasSame(DateTime.now().toLocal().plus({ days: 1 }), 'day'))
        case periods[3]: // Próximos 5 días
          return state.weathers
      }
    }
  }
})
