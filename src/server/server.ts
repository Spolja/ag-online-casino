import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

import { logger } from '../lib/logger'
import { typeDefs } from '../lib/typedefs'
import { BetResolver } from '../resolvers/bet/graphql/bet.resolver'
import { UserResolver } from '../resolvers/user/graphql/user.resolver'

import type { Context } from './context'

export class Server {
    private readonly server: ApolloServer<Context>

    constructor() {
        this.server = new ApolloServer<Context>({
            logger,
            resolvers: [
                UserResolver,
                BetResolver,
            ],
            typeDefs,
        })
    }

    public async start() {
        const { url } = await startStandaloneServer<Context>(this.server, {
            // eslint-disable-next-line @typescript-eslint/require-await
            context: async () => {
                return {
                    logger,
                }
            },
        })
        logger.info(`🚀🚀🚀 Online Casino server started on ${url}. 🚀🚀🚀`)
    }
}