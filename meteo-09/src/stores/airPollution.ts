import { defineStore } from 'pinia'
import { DateTime } from 'luxon'
import { AirPollution } from '../scripts/airPollution'

interface AirPollutionState {
  airPollution: AirPollution
}

export const useAirPollution = defineStore('airPollution', {
  state: (): AirPollutionState => ({
    airPollution: {
      dt: '',
      aqi: 0,
      co: 0,
      no: 0,
      no2: 0,
      o3: 0,
      so2: 0,
      pm2_5: 0,
      pm10: 0,
      nh3: 0
    },
  }),

  actions: {
    async fetchAirPollution() {
      await fetch('https://api.openweathermap.org/data/2.5/air_pollution?lat=-33.45694&lon=-70.64827&appid=ddec887a4abcfa9dca8520346d2b065c')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const body = data.list[0];
        const airPollution: AirPollution = {
          dt: DateTime.fromSeconds(body.dt).toLocal().toFormat('ff') || '',
          aqi: body.main.aqi,
          co: body.components.co,
          no: body.components.no,
          no2: body.components.no2,
          o3: body.components.o3,
          so2: body.components.so2,
          pm2_5: body.components.pm2_5,
          pm10: body.components.pm10,
          nh3: body.components.nh3
        };
        useAirPollution().updateAirPollution(airPollution);
      })
      .catch(error => {
        console.error(error);
      });
    },
    updateAirPollution(airPollution: AirPollution) {
      this.airPollution = airPollution
    },
  },
})
