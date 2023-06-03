export const periods = ['Ahora', 'Hoy', 'Mañana', 'Próximos 5 días'] as const

export type Period = typeof periods[number]