import type { Resolvers } from '../../__generated__/graphqlTypes'

import { UserMutations } from './user.mutations'
import { UserQueries } from './user.queries'

export const UserResolver: Resolvers = {
    ...UserQueries,
    ...UserMutations,
}