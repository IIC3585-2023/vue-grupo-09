export const periodsTemp = ['Hoy', 'Mañana', 'Próximos 5 días'] as const

export type PeriodTemp = typeof periodsTemp[number]

export const periodsPol = ['Ahora', 'Hoy', 'Mañana', 'Próximos 5 días'] as const

export type PeriodPol = typeof periodsPol[number]