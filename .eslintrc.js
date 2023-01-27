/* eslint-env node */

module.exports = {
    'env': {
        'browser': true,
        'commonjs': true,
        'es6': true,
        'node': true
    },
    'extends': 'eslint:recommended',
    'parserOptions': {
        'sourceType': 'module',
        'ecmaFeatures': {
            'jsx': true
        }
    },
    'rules': {
        'indent': [
            'error',
            4
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'always'
        ],
        'import/no-restricted-paths': 'off',
        'no-unexpected-token': 'off',
        'no-unexpected-multiline': 'off',
        'no-restricted-syntax': [
            'error',
            {
                'selector': 'CallExpression[callee.name=/^\\.\\./]',
                'message': 'Unexpected spread operator.'
            }
        ],
    }
};