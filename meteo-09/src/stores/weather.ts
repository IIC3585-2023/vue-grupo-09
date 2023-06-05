import { defineStore } from 'pinia'
import { DateTime } from 'luxon'
import { Weather } from '../scripts/weather'
import { PeriodTemp, periodsTemp } from '../scripts/constants'

interface WeatherState {
  weather: Weather
  weathers: Weather[],
  daily_weathers: Weather[][],
  selectedPeriod: PeriodTemp
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
    daily_weathers: [],
    selectedPeriod: 'Hoy',
  }),

  actions: {
    async fetchWeather(latitude: number, longitude: number) {
      await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${import.meta.env.VITE_API_KEY}&units=metric&lang=es`)
      .then(response => response.json())
      .then(data => {
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

    async fetchWeathers(latitude: number, longitude: number) {
      await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${import.meta.env.VITE_API_KEY}&units=metric&lang=es`)
    .then(response => response.json())
      .then(data => {
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

    setSelectedPeriod(period: PeriodTemp) {
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
    filteredWeathers: (state): Weather[][] => {
      switch (state.selectedPeriod) {
        case periodsTemp[0]: // Hoy
          const todayWeathers = state.weathers.filter(weather =>
            DateTime.fromFormat(weather.dt, 'ff').hasSame(DateTime.now().toLocal(), 'day')
          );
          
          return [[state.weather, ...todayWeathers]]
        case periodsTemp[1]: // Mañana
          const tomorrowWeathers = state.weathers.filter(weather =>
            DateTime.fromFormat(weather.dt, 'ff').hasSame(DateTime.now().toLocal().plus({ days: 1 }), 'day')
          );
          
          return [tomorrowWeathers]
        case periodsTemp[2]: // Próximos 5 días
          
        const results = [];
        for (let i = 1; i <= 5; i++) {
          const daily = state.weathers.filter(weather =>
            DateTime.fromFormat(weather.dt, 'ff').hasSame(DateTime.now().toLocal().plus({ days: i }), 'day')
          );
          results.push(daily);
        }
        return results;
      }
    }
  }
})
