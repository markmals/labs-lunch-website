const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
    template: `${__dirname}/public/index.html`,
    filename: "index.html",
    inject: "body"
})

module.exports = {
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    devServer: {
        inline: true,
        contentBase: path.join(__dirname, "public"),
        compress: true,
        port: 3000
    },
    entry: path.resolve(__dirname, "src", "index.tsx"),
    output: {
        path: path.resolve(__dirname, "public"),
        filename: "bundle.js"
    },
    plugins: [HTMLWebpackPluginConfig],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: ["babel-loader", "eslint-loader"]
            },
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [{ loader: "ts-loader" }, { loader: "eslint-loader" }]
            },
            {
                test: /\.css$/,
                use: [{ loader: "style-loader" }, { loader: "css-loader" }]
            },
            {
                test: /\.(png|svg|jpg|gif)$/i,
                use: ["file-loader"]
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            }
        ]
    }
}
