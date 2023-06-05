import { defineStore } from 'pinia'
import { DateTime } from 'luxon'
import { AirPollution } from '../scripts/airPollution'
import { PeriodPol, periodsPol } from '../scripts/constants'

interface AirPollutionState {
  airPollution: AirPollution
  airPollutions: AirPollution[]
  selectedPeriod: PeriodPol
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
    airPollutions: [],
    selectedPeriod: 'Ahora',
  }),

  actions: {
    async fetchAirPollution(latitude: number, longitude: number) {
      await fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${import.meta.env.VITE_API_KEY}`)
      .then(response => response.json())
      .then(data => {
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

    async fetchAirPollutions(latitude: number, longitude: number) {
      await fetch(`https://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${latitude}&lon=${longitude}&appid=${import.meta.env.VITE_API_KEY}`)
      .then(response => response.json())
      .then(data => {
        const airPollutions = data.list.map((airPollution: any) => {
          return {
          dt: DateTime.fromSeconds(airPollution.dt).toLocal().toFormat('ff') || '',
          aqi: airPollution.main.aqi,
          co: airPollution.components.co,
          no: airPollution.components.no,
          no2: airPollution.components.no2,
          o3: airPollution.components.o3,
          so2: airPollution.components.so2,
          pm2_5: airPollution.components.pm2_5,
          pm10: airPollution.components.pm10,
          nh3: airPollution.components.nh3
        };
        });
        useAirPollution().updateAirPollutions(airPollutions);
      })
      .catch(error => {
        console.error(error);
      });
    },

    setSelectedPeriod(period: PeriodPol) {
      this.selectedPeriod = period
    },

    updateAirPollution(airPollution: AirPollution) {
      this.airPollution = airPollution
    },

    updateAirPollutions(airPollutions: AirPollution[]) {
      this.airPollutions = airPollutions
    },
  },

  getters: {
    filteredAirPollutions: (state): AirPollution[] => {
      switch (state.selectedPeriod) {
        case periodsPol[0]: // Ahora
          return [state.airPollution]
        case periodsPol[1]: // Hoy
          return state.airPollutions.filter(weather => DateTime.fromFormat(weather.dt, 'ff').hasSame(DateTime.now().toLocal(), 'day'))
        case periodsPol[2]: // Mañana
          return state.airPollutions.filter(weather => DateTime.fromFormat(weather.dt, 'ff').hasSame(DateTime.now().toLocal().plus({ days: 1 }), 'day'))
        case periodsPol[3]: // Próximos 5 días
          return state.airPollutions
      }
    }
  }
})
