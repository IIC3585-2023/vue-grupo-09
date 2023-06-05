export const periods = ['Hoy', 'Mañana', 'Próximos 5 días'] as const

export type Period = typeof periods[number]