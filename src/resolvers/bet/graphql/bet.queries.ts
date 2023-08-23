import {
    Bet,
    User,
} from '../../../database/models/models'
import { sequelize } from '../../../database/sequelize.client'
import { logger } from '../../../lib/logger'
import type { Resolvers } from '../../__generated__/graphqlTypes'

export const BetQueries: Resolvers = {
    Bet: {
        user: async (parent) => {
            await User.sync()
            const user = await User.findOne({ where: { id: parent.userId } })

            if (!user) {
                throw new Error(`User with id: ${parent.userId} not present in the database`)
            }

            return {
                balance: user.balance,
                id: user.id,
                name: user.name,
            }
        },
    },
    Query: {
        getBestBetsPerUser: async (_parent, args) => {
            await Bet.sync()
            await User.sync()
            const bestBets = await Bet.findAll({
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

            logger.info(JSON.stringify(bestBets))

            return bestBets.map((bet) => {
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
        getBet: async (_parent, args) => {
            await Bet.sync()
            const bet = await Bet.findOne({ where: { id: args.id } })

            if (!bet) {
                throw new Error(`Bet with id: ${args.id} not present in the database`)
            }

            return {
                amount: bet.amount,
                chance: bet.chance,
                id: bet.id,
                payout: bet.payout,
                userId: bet.userId,
                win: bet.win,
            }
        },
        getBetList: async () => {
            await Bet.sync()

            const bets = await Bet.findAll()

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