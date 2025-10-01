import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "@rspack/cli";
import { rspack } from "@rspack/core";
import { ReactRefreshRspackPlugin } from "@rspack/plugin-react-refresh";

const __dirname = dirname(fileURLToPath(import.meta.url));
const isDev = process.env.NODE_ENV === "development";

// Target browsers, see: https://github.com/browserslist/browserslist
const targets = ["last 2 versions", "> 0.2%", "not dead", "Firefox ESR"];

export default defineConfig({
    context: __dirname,
    entry: {
        main: "./src/main.jsx"
    },
    resolve: {
        extensions: ["...", ".ts", ".tsx", ".jsx"]
    },
    output: {
        path: resolve("../", 'public'),
        filename: 'static/[name].[contenthash:6].js',
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.svg$/,
                type: "asset"
            },
            {
                test: /\.(jsx?|tsx?)$/,
                use: [
                    {
                        loader: "builtin:swc-loader",
                        options: {
                            jsc: {
                                parser: {
                                    syntax: "typescript",
                                    tsx: true
                                },
                                transform: {
                                    react: {
                                        runtime: "automatic",
                                        development: isDev,
                                        refresh: isDev
                                    }
                                }
                            },
                            env: { targets }
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new rspack.HtmlRspackPlugin({
            template: "./index.html"
        }),
        isDev ? new ReactRefreshRspackPlugin() : null
    ].filter(Boolean),
    optimization: {
        minimizer: [
            new rspack.SwcJsMinimizerRspackPlugin(),
            new rspack.LightningCssMinimizerRspackPlugin({
                minimizerOptions: { targets }
            })
        ],
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'initial',
            // minSize: 20000,
            // minChunks: 1,

            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    // enforce: true,
                    chunks: 'all',
                    // name: 'vendors'
                    name: module => {
                        const moduleName = (module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/) || [])[1]

                        return moduleName.replace('@', '')
                    }
                }
            }
        }
    },
    experiments: {
        css: true
    }
});
