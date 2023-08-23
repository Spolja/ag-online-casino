import pino from 'pino'

export const logger = pino({
    formatters: {
        level: (label: string) => {
            return { level: label.toUpperCase() }
        },
    },
    level: 'info',
})

