const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    performance: {
        hints: false,
    },
    entry: ["./src/index.js", "./src/styles/index.css"],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
    },
    devtool: "eval-cheap-module-source-map",
    devServer: {
        static: {
            directory: path.join(__dirname, "src"),
        },
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                    },
                },
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            inject: "body",
            filename: "index.html",
            hash: true,
        }),
    ],
};
