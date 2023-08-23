import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

import { logger } from '../lib/logger'
import { typeDefs } from '../lib/typedefs'
import { BetResolver } from '../resolvers/bet/graphql/bet.resolver'
import { UserResolver } from '../resolvers/user/graphql/user.resolver'

import type { Context } from './context'
import { context } from './context'
import { LoggerPlugin } from './logger-plugin'

export class Server {
    private readonly server: ApolloServer<Context>

    constructor() {
        this.server = new ApolloServer<Context>({
            logger,
            plugins: [LoggerPlugin],
            resolvers: [
                UserResolver,
                BetResolver,
            ],
            typeDefs,
        })
    }

    public async start() {
        const { url } = await startStandaloneServer<Context>(this.server, {
            context,
        })
        logger.info(`🚀🚀🚀 Online Casino server started on ${url}. 🚀🚀🚀`)
    }
}