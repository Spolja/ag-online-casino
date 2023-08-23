import { randomUUID } from 'crypto'

import { logger } from '../lib/logger'

export type Context = {
    logger: typeof logger
    startTime: number
}

// eslint-disable-next-line @typescript-eslint/require-await
export const context = async (): Promise<Context> => {
    return {
        logger: logger.child({ requestId: randomUUID() }),
        startTime: Date.now(),
    }
}