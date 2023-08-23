import { logger } from '../../../lib/logger'
import type { Resolvers } from '../../__generated__/graphqlTypes'

export const UserQueries: Resolvers = {
    Query: {
        getUser: () => {
            logger.info('Fetching user...')

            return {
                balance: 1,
                id: 1,
                name: 'Spoljo',
            }
        },
        getUserList: () => {
            logger.info('Fetching user list...')

            return [{
                balance: 1,
                id: 1,
                name: 'Spoljo',
            }]
        },
    },
}