import {
    Bet,
    User,
} from '../../../database/models/models'
import type { Resolvers } from '../../__generated__/graphqlTypes'

export const BetMutations: Resolvers = {
    Mutation: {
        createBet: async (_parent, args) => {
            const user = await User.findOne({ where: { id: args.userId } })

            if (!user) {
                throw new Error(`User with id: ${args.userId} not present in the database`)
            }

            if (args.amount <= 0) {
                throw new Error('Invalid amount, validate this shit on graphql side')
            }

            if (args.amount > user.balance) {
                throw new Error(`Not enough $$$ in your balance(${user.balance}), top up your balance before betting again!`)
            }

            await Bet.sync()

            const bet = Bet.build({
                amount: args.amount,
                chance: args.chance,
                createdAt: new Date(),

                payout: (args.amount / args.chance) * 100,
                updatedAt: new Date(),
                userId: args.userId,
                win: Math.random() <= 0.5,
            })

            if (!bet.win) {
                user.balance -= args.amount
            } else {
                user.balance += (bet.payout - bet.amount)
            }

            await Promise.all([
                await bet.save(),
                await user.save(),
            ])

            return bet
        },
    },
}