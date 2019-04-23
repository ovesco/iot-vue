module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        'plugin:vue/essential',
        '@vue/airbnb',
    ],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'linebreak-style': 'off',
        'indent': ['error', 4],
        'max-len': ['error', { 'code' : 140 }],
        'object-curly-newline': 'off',
    },
    parserOptions: {
        parser: 'babel-eslint',
    },
};
