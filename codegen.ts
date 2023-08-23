import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
    generates: {
        'src/resolvers/__generated__/graphqlTypes.ts': {
            config: {
                federation: true,
            },
            plugins: [
                'typescript',
                'typescript-resolvers',
            ],
        },
    },
    schema: 'src/resolvers/**/*.graphql',
}

export default config
