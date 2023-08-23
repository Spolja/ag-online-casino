module.exports = {
    extends: [require.resolve('@rimac-technology/style-guide/eslint/core')],
    ignorePatterns: [
        '**/__generated__',
        'dist',
        'node_modules',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: './tsconfig.json',
    },
}