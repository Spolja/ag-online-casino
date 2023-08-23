import { container } from 'tsyringe'

import type { Resolvers } from '../../__generated__/graphqlTypes'

import { BetService } from './bet.service'

const betService: BetService = container.resolve(BetService)
export const BetMutations: Resolvers = {
    Mutation: {
        createBet: async (_parent, args) => betService.createBet(args.userId, args.amount, args.chance),
    },
}