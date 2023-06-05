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
        country: 'Chile',
        latitude: -33.45694,
        longitude: -70.64827,
        imageURL: './src/assets/santiago.jpg',
      },
      {
        name: 'Copenhague',
        country: 'Dinamarca',
        latitude: 55.6761,
        longitude: 12.5683,
        imageURL: 'https://media.istockphoto.com/id/901375804/es/foto/nyhavn-copenhague-dinamarca.jpg?s=612x612&w=0&k=20&c=310-UnqrE0ckXLgUl7RNeTkF_hC3bBGsqYOgUGMscvU=',
      },
      {
        name: 'Londres',
        country: 'Inglaterra',
        latitude: 51.5074,
        longitude: -0.1278,
        imageURL: 'https://www.visitbritain.com/sites/default/files/styles/consumer_campaigns_hero_mobile/public/consumer_components_enhanced/header_image/vb34141644.jpg?itok=9qBFm0pJ'
      },
      {
        name: 'Tokio',
        country: 'Japón',
        latitude: 35.6895,
        longitude: 139.6917,
        imageURL: 'https://media.istockphoto.com/id/904453184/es/foto/horizonte-de-mt-fuji-y-tokio.jpg?s=612x612&w=0&k=20&c=lrtWbL4huTRv9P4_x9YJU2Qpgu4uguZvCjlzKs154Sc='
      },
      {
        name: 'Roma',
        country: 'Italia',
        latitude: 41.9028,
        longitude: 12.4964,
        imageURL: 'https://cdn.pixabay.com/photo/2019/10/06/08/57/tiber-river-4529605_1280.jpg'
      },
    ],
    selectedCity: 0,
  }),

  actions: {
    setSelectedCity(idx: number) {
      this.selectedCity = idx
    },

    addCity(city: City) {
      this.cities = [...this.cities, city]
      this.selectedCity = this.cities.length - 1
      localStorage.setItem('cities', JSON.stringify(this.cities));
    },

    setCities(cities: City[]) {
      this.cities = cities
    }
  },
})
