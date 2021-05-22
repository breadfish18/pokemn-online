const path = require('path')
const webpack = require('webpack')

const {
    VueLoaderPlugin
} = require('vue-loader')


module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, './dist'),
    },
    module: {
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader", "postcss-loader"],
            },
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ]
}