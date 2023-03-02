const path = require('path');
// const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = {
    mode: process.env.NODE_ENV,
    entry: 'backend/server',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'api_v1.bundle.js',
    },
    module: {
        rules: [{

            test: /\.js$/,
            use: 'babel-loader',
            exclude: /node_modules/,
        }]
    },
    plugins: [
        new CleanWebpackPlugin()
    ]
};