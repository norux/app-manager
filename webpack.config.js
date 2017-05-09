/**
 * Created by leesangjun on 2017. 5. 9..
 */
var path = require('path');

module.exports = {
    entry: './src/viewer/app/app.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './src/viewer/dist')
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    cacheDirectory: true,
                    presets: ['es2015', 'react']
                }
            }
        ]
    }
};
