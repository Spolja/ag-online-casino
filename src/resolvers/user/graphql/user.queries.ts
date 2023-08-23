import {
    Bet,
    User,
} from '../../../database/models/models'
import type { Resolvers } from '../../__generated__/graphqlTypes'

export const UserQueries: Resolvers = {
    Query: {
        getUser: async (_parent, args) => {
            await User.sync()

            const user = await User.findOne(
                { where: { id: args.id } }
            )

            if (!user) {
                throw new Error(`User with id: ${args.id} not present in the database`)
            }

            return user
        },
        getUserList: async () => {
            await User.sync()

            return User.findAll()
        },
    },
    User: {
        bets: async (parent) => {
            await Bet.sync()

            return Bet.findAll({ where: { userId: parent.id } })
        },
    },
}