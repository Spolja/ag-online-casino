import type { Config } from 'jest'

export default (): Config => {
    return {
        preset: 'ts-jest',
        testEnvironment: 'node',
        verbose: true,
    }
}