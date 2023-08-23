import path from 'path'

import { loadFilesSync } from '@graphql-tools/load-files'
import { mergeTypeDefs } from '@graphql-tools/merge'

const typesDefsArray = loadFilesSync(
    path.join(__dirname, '../resolvers/**/*.graphql'),
    { recursive: true }
)

export const typeDefs = mergeTypeDefs(typesDefsArray)
