/* eslint-env node */
const OFF = 0, WARN = 1, ERROR = 2;
module.exports = {
    env: {
        'browser': true,
        'commonjs': true,
        'es6': true,
        'node': true
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        'ecmaVersion': 2020,
        'sourceType': 'module',
        'ecmaFeatures': {
            'jsx': true
        }
    },
    plugins: [
        '@typescript-eslint'
    ],
    rules: {
        'indent': [
            ERROR,
            4
        ],
        'linebreak-style': [
            ERROR,
            'unix'
        ],
        'quotes': [
            ERROR,
            'single'
        ],
        'semi': [
            WARN,
            'always'
        ],
        '@typescript-eslint/no-var-requires': OFF,
        'no-undef': OFF,
        'import/no-restricted-paths': OFF,
        'no-unexpected-token': OFF,
        'no-unexpected-multiline': OFF,
        // "no-restricted-syntax": ["off", "YourRule"],
        'no-restricted-globals': [OFF],
        'class-methods-use-this': [WARN],
        'no-underscore-dangle': [WARN],
        'hash-bang/no-restricted-syntax': OFF,
        // Allowed a getter without setter, but all setters require getters
        'accessor-pairs': [ ERROR, {
            'getWithoutSet': false,
            'setWithoutGet': true
        }],

    }
};