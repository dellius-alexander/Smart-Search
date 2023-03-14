const path = require('path');
// const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = {
    mode: "production",
    entry: './server/protocols/https.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
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