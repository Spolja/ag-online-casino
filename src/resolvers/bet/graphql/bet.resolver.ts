import type { Resolvers } from '../../__generated__/graphqlTypes'

import { BetMutations } from './bet.mutations'
import { BetQueries } from './bet.queries'

export const BetResolver: Resolvers = {
    ...BetQueries,
    ...BetMutations,
}