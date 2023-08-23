import { User } from '../../../database/models/User.model'
import { logger } from '../../../lib/logger'
import type { Resolvers } from '../../__generated__/graphqlTypes'

export const UserQueries: Resolvers = {
    Query: {
        getUser: async (_parent, args) => {
            logger.info('Fetching user...')
            await User.sync()

            const user = await User.findOne(
                { attributes: ['id', 'balance', 'name'],
                    where: { id: args.id } }
            )

            if (!user) {
                throw new Error(`User with id: ${1} not present in the database`)
            }

            logger.info(JSON.stringify(user))

            return {
                balance: user.balance,
                id: user.id,
                name: user.name,
            }
        },
        getUserList: async () => {
            logger.info('Fetching users list...')
            await User.sync()
            const users = await User.findAll({ attributes: ['id', 'balance', 'name'] })

            return users.map((user) => {
                return {
                    balance: user.balance,
                    id: user.id,
                    name: user.name,
                }
            })
        },
    },
}