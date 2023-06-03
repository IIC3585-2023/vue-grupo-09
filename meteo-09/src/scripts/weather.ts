import { DateTime } from 'luxon';

export interface Weather {
  dt: string
  temp: number
  feels_like: number
  temp_min: number
  temp_max: number
  pressure: number
  humidity: number
  period: string
}

export const today: Weather = {
  dt: DateTime.now().toISO() || '',
  temp: 0,
  feels_like: 0,
  temp_min: 0,
  temp_max: 0,
  pressure: 0,
  humidity: 0,
  period: 'Hoy'
};

export const thisWeek: Weather = {
  dt: DateTime.now().minus({ days: 5 }).toISO() || '',
  temp: 1,
  feels_like: 1,
  temp_min: 1,
  temp_max: 1,
  pressure: 1,
  humidity: 1,
  period: 'Esta semana'
};

export const sixteenDays: Weather = {
  dt: DateTime.now().minus({ days: 16 }).toISO() || '',
  temp: 1,
  feels_like: 1,
  temp_min: 1,
  temp_max: 1,
  pressure: 1,
  humidity: 1,
  period: 'Próximos 16 días'
};
