import {
    Bet,
    User,
} from '../../../database/models/models'
import { logger } from '../../../lib/logger'
import type { Resolvers } from '../../__generated__/graphqlTypes'

export const UserQueries: Resolvers = {
    Query: {
        getUser: async (_parent, args) => {
            logger.info('Fetching user...')
            await User.sync()

            const user = await User.findOne(
                { where: { id: args.id } }
            )

            if (!user) {
                throw new Error(`User with id: ${args.id} not present in the database`)
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
            const users = await User.findAll()

            return users.map((user) => {
                return {
                    balance: user.balance,
                    id: user.id,
                    name: user.name,
                }
            })
        },
    },
    User: {
        bets: async (parent) => {
            await Bet.sync()
            const bets = await Bet.findAll({ where: { userId: parent.id } })

            return bets.map((bet) => {
                return {
                    amount: bet.amount,
                    chance: bet.chance,
                    id: bet.id,
                    payout: bet.payout,
                    userId: bet.userId,
                    win: bet.win,
                }
            })
        },
    },
}