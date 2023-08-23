module.exports = {
    extends: [require.resolve('@rimac-technology/style-guide/eslint/core')],
    ignorePatterns: [
        '*.generated.*',
        'dist',
        'node_modules',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: './tsconfig.json',
    },
}