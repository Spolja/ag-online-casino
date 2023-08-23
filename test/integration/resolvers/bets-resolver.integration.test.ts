import 'reflect-metadata'
import assert from 'assert'

import { ApolloServer } from '@apollo/server'
import { gql } from 'graphql-tag'

import { typeDefs } from '../../../src/lib/typedefs'
import { BetResolver } from '../../../src/resolvers/bet/graphql/bet.resolver'
import { UserResolver } from '../../../src/resolvers/user/graphql/user.resolver'

export const GET_BET_QUERY = gql`
    query GetBet($betId: Int!) {
        getBet(id: $betId) {
            id,
            user {
                id
                name
            }
        }
    }
`

export const GET_BET_LIST_QUERY = gql`
    query GetBetList {
        getBetList {
            id,
            user {
                id
                name
            }
        }
    }
`

export const GET_BEST_BETS_PER_USER_QUERY = gql`
    query GetBestBetsPerUser {
        getBestBetsPerUser(limit: 10) {
            id,
            user {
                id
                name
            }
        }
    }
`
describe('Bet Resolver Integration tests', () => {
    const testServer = new ApolloServer({
        resolvers: [UserResolver, BetResolver],
        typeDefs,
    })

    describe('when getBet query is invoked', () => {
        it('should return correct bet when existing id is provided', async () => {
            const response = await testServer.executeOperation({
                query: GET_BET_QUERY,
                variables: { betId: 1 },
            })

            assert(response.body.kind === 'single')
            expect(response.body.singleResult.errors).toBeUndefined()
            expect(response.body.singleResult.data?.getBet).toMatchObject({
                id: 1,
                user: {
                    id: 1,
                    name: 'Spoljo',
                },
            })
        })
        it('should contain error if user does not exist', async () => {
            const response = await testServer.executeOperation({
                query: GET_BET_QUERY,
                variables: { betId: 999 },
            })

            assert(response.body.kind === 'single')
            expect(response.body.singleResult.errors).toBeDefined()
        })
    })
    describe('when getBetList query is invoked', () => {
        it('should return bets list', async () => {
            const response = await testServer.executeOperation({
                query: GET_BET_LIST_QUERY,
            })

            assert(response.body.kind === 'single')
            expect(response.body.singleResult.errors).toBeUndefined()
            expect(Array.isArray(response.body.singleResult.data?.getBetList)).toBeTruthy()
        })
    })
    describe('when getBestBetsPerUser query is invoked', () => {
        it('should return best bets', async () => {
            const response = await testServer.executeOperation({
                query: GET_BEST_BETS_PER_USER_QUERY,
            })

            assert(response.body.kind === 'single')
            expect(response.body.singleResult.errors).toBeUndefined()
            expect(Array.isArray(response.body.singleResult.data?.getBestBetsPerUser)).toBeTruthy()
        })
    })
})
