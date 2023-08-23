import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

import { logger } from '../lib/logger'

import type { Context } from './context.type'

export class Server {
    private readonly server: ApolloServer<Context>

    constructor() {
        this.server = new ApolloServer<Context>({
            logger,
            resolvers: [],
            typeDefs: [],
        })
    }

    public async start() {
        const { url } = await startStandaloneServer<Context>(this.server, {
            // eslint-disable-next-line @typescript-eslint/require-await
            context: async () => {
                return {}
            },
        })
        logger.info(`🚀🚀🚀 Online Casino server started on ${url}. 🚀🚀🚀`)
    }
}