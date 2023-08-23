import { container } from 'tsyringe'

import type { Resolvers } from '../../__generated__/graphqlTypes'

import { UserService } from './user.service'

const userService = container.resolve(UserService)
export const UserQueries: Resolvers = {
    Query: {
        getUser: async (_parent, args) => userService.getUser(args.id),
        getUserList: async () => userService.getUserList(),
    },
    User: {
        bets: async (parent) => userService.getUserBets(parent.id),
    },
}