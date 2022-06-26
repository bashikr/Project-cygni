const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MinifyPlugin = require("babel-minify-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const BundleAnalyzerPlugin =
    require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
module.exports = {
    mode: "production",
    performance: {
        hints: false,
    },
    entry: ["./src/index.js", "./src/styles/index.css"],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].[hash].bundle.js",
    },
    // for production devtool: "source-map",
    // deactivate development tools: devtool:false
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
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
        ],
    },
    optimization: {
        minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            inject: "body",
            filename: "index.html",
            hash: true,
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true,
                removeComments: true,
            },
        }),
        new MinifyPlugin(),
        new BundleAnalyzerPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].[hash].css",
            chunkFilename: "[id].css",
        }),
        new CopyWebpackPlugin({
            patterns: [{ from: "src/images", to: "images" }],
        }),
    ],
};
