import 'reflect-metadata'
import assert from 'assert'

import { ApolloServer } from '@apollo/server'
import { gql } from 'graphql-tag'

import { typeDefs } from '../../../src/lib/typedefs'
import { BetResolver } from '../../../src/resolvers/bet/graphql/bet.resolver'
import { UserResolver } from '../../../src/resolvers/user/graphql/user.resolver'

export const GET_USER_QUERY = gql`
    query GetUser($userId: Int!) {
        getUser(id: $userId) {
            id,
            name,
            balance
            bets {
                id
                amount
                payout
                win
            }
        }
    }
`

export const GET_USER_LIST_QUERY = gql`
    query GetUserList {
        getUserList {
            id,
            name,
            balance,
            bets {
                id
                amount
                payout
                win
            }
        }
    }
`
describe('User Resolver Integration tests', () => {
    const testServer = new ApolloServer({
        resolvers: [UserResolver, BetResolver],
        typeDefs,
    })

    describe('when getUser query is invoked', () => {
        it('should return correct user when existing id is provided', async () => {
            const response = await testServer.executeOperation({
                query: GET_USER_QUERY,
                variables: { userId: 1 },
            })

            assert(response.body.kind === 'single')
            expect(response.body.singleResult.errors).toBeUndefined()
            expect(response.body.singleResult.data?.getUser).toMatchObject({
                bets: expect.anything(),
                id: 1,
                name: 'Spoljo',
            })
        })
        it('should contain error if user does not exist', async () => {
            const response = await testServer.executeOperation({
                query: GET_USER_QUERY,
                variables: { userId: 999 },
            })

            assert(response.body.kind === 'single')
            expect(response.body.singleResult.errors).toBeDefined()
        })
    })
    describe('when getUserList query is invoked', () => {
        it('should return user list', async () => {
            const response = await testServer.executeOperation({
                query: GET_USER_LIST_QUERY,
            })

            assert(response.body.kind === 'single')
            expect(response.body.singleResult.errors).toBeUndefined()
            expect(Array.isArray(response.body.singleResult.data?.getUserList)).toBeTruthy()
        })
    })
})