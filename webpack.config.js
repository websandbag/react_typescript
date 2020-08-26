const path = require('path');

module.exports = {
    entry: './src/scripts/index.tsx',
    output: {
        filename: './dist/bundle.js'
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_module/,
            }
        ]
    },
}