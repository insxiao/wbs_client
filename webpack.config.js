const path = require("path")
const webpack = require('webpack')

const webpackConfig =  {
    mode: "development",
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "www"),
        filename: 'main.bundle.js'
    },
    devtool: 'inline-source-map',

    devServer: {
        contentBase: './www',
        host: "0.0.0.0"
    },
    module: {
        rules: [
            { test: /\.txt$/, use: 'raw-loader' },
            { test: /\.vue$/, use: 'vue-loader' },
            { test: /\.css$/, use: 'css-loader' },
            { test: /\.less$/, use: [
                        { loader: 'style-loader' },
                        { loader: 'css-loader', options: { sourceMap: true } },
                        { loader: 'less-loader', options: { sourceMap:true }}]}
        ]
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
          'vue$': 'vue/dist/vue.js'
        }
    }
}


module.exports = webpackConfig