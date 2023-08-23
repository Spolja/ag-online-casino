import { container } from 'tsyringe'

import type { Resolvers } from '../../__generated__/graphqlTypes'

import { BetService } from './bet.service'

const betService = container.resolve(BetService)
export const BetQueries: Resolvers = {
    Bet: {
        user: async (parent) => betService.getBetUser(parent.userId),
    },
    Query: {
        getBestBetsPerUser: async (_parent, args) => betService.getBestBetsPerUser(args.limit),
        getBet: async (_parent, args) => betService.getBet(args.id),
        getBetList: async () => betService.getBetList(),
    },
}