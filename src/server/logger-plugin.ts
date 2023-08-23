/* eslint-disable @typescript-eslint/require-await -- Apollo plugin definition requires every step to be async */
/* eslint-disable sort-keys-fix/sort-keys-fix -- Ignoring order since it affects log readability*/
import { randomUUID } from 'crypto'

import type { ApolloServerPlugin } from '@apollo/server'

import { logger } from '../lib/logger'

import type { Context } from './context'

export const LoggerPlugin: ApolloServerPlugin<Context> = {
    async requestDidStart(requestContext) {
        const operationName = requestContext.request.operationName
        const endTime = Date.now()
        const startTime = requestContext.contextValue.startTime

        if (operationName === 'IntrospectionQuery') {
            return
        }

        const loggerInstance = logger.child({
            requestId: randomUUID(),
            operation: requestContext.operationName,
            startTime: new Date(requestContext.contextValue.startTime).toISOString(),
        })

        requestContext.contextValue.logger = loggerInstance

        return {
            async willSendResponse(response) {
                const successfulMessage = `Operation ${operationName} executed SUCCESSFULLY`
                const errorMessage = `Operation ${operationName} executed with ERRORS`

                if (response.errors) {
                    logger.error(errorMessage)
                    loggerInstance.error({
                        endTime: new Date(endTime).toISOString(),
                        duration: `${endTime - startTime} milliseconds`,
                        errors: response.errors,
                    })
                } else {
                    logger.info(successfulMessage)
                    loggerInstance.info({
                        endTime: new Date(endTime).toISOString(),
                        duration: `${endTime - startTime} milliseconds`,
                    })
                }
            },
        }
    },
}