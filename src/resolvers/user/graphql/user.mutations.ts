import type { Resolvers } from '../../__generated__/graphqlTypes'

export const UserMutations: Resolvers = {
    Mutation: {
        createUser: () => {
            return {
                balance: 1,
                id: 1,
                name: 'Spoljo',
            }
        },
    },
}