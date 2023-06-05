import { defineStore } from 'pinia'
import { City } from '../scripts/city'

interface CityState {
  cities: City[]
  selectedCity: number
}

export const useCity = defineStore('cities', {
  state: (): CityState => ({
    cities: [
      {
        name: 'Santiago',
        latitude: -33.45694,
        longitude: -70.64827,
      },
      {
        name: 'Copenhague',
        latitude: 55.6761,
        longitude: 12.5683,
      },
      {
        name: 'Londres',
        latitude: 51.5074,
        longitude: -0.1278,
      },
      {
        name: 'Tokio',
        latitude: 35.6895,
        longitude: 139.6917,
      },
      {
        name: 'Nueva York',
        latitude: 40.7128,
        longitude: -74.0060,
      },
      {
        name: 'París',
        latitude: 48.8566,
        longitude: 2.3522,
      },
      {
        name: 'Roma',
        latitude: 41.9028,
        longitude: 12.4964,
      },
      {
        name: 'Sydney',
        latitude: -33.8651,
        longitude: 151.2099,
      },
      {
        name: 'Toronto',
        latitude: 43.65107,
        longitude: -79.347015,
      },
      {
        name: 'Estambul',
        latitude: 41.0082,
        longitude: 28.9784,
      }
    ],
    selectedCity: 0,
  }),

  actions: {
    setSelectedCity(idx: number) {
      this.selectedCity = idx
    },

    addCity(city: City) {
      this.cities = [...this.cities, city]
    },
  },
})
