import type { logger } from '../lib/logger'

export type Context = {
    logger: typeof logger
    startTime: number
}