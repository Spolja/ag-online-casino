import {
    Bet,
    User,
} from '../../../database/models/models'
import { sequelize } from '../../../database/sequelize.client'
import type { Resolvers } from '../../__generated__/graphqlTypes'

export const BetQueries: Resolvers = {
    Bet: {
        user: async (parent) => {
            await User.sync()
            const user = await User.findOne({ where: { id: parent.userId } })

            if (!user) {
                throw new Error(`User with id: ${parent.userId} not present in the database`)
            }

            return user
        },
    },
    Query: {
        getBestBetsPerUser: async (_parent, args) => {
            await Bet.sync()
            await User.sync()

            return Bet.findAll({
                attributes: ['userId', [sequelize.fn('MAX', sequelize.col('payout')), 'payout'], 'amount', 'win', 'chance', 'id'],
                group: ['userId'],
                include: [
                    {
                        as: 'user',
                        attributes: [],
                        model: User,
                    },
                ],
                limit: args.limit,
                where: {
                    win: true,
                },
            })
        },
        getBet: async (_parent, args) => {
            await Bet.sync()
            const bet = await Bet.findOne({ where: { id: args.id } })

            if (!bet) {
                throw new Error(`Bet with id: ${args.id} not present in the database`)
            }

            return bet
        },
        getBetList: async () => {
            await Bet.sync()

            return Bet.findAll()
        },
    },
}