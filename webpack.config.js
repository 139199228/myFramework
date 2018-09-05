const argv = require('yargs-parser')(process.argv.slice(2))
const merge = require("webpack-merge")
const mode = argv.mode || "development"
const _mergaConfig = require(`./config/webpack.${mode}.js`)
const glob = require('glob')
//遍历文件寻找index-index.entry.ts
let _entry = {};
let _plugins = [];
const _modefalg = (mode == "production" ? true : false)
const {
    join,
    resolve
} = require('path')
const files = glob.sync('./src/webapp/views/**/*.entry.ts')
const happyPack = require("./config/happyWebpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const HTMLAfterWebpackPlugin = require('./config/htmlAfterWebpackPlugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const regexp = /.+\/([a-zA-Z]+-[a-zA-Z]+)(\.entry\.ts)$/g
for (let item of files) {
    if (regexp.test(item)) {
        const entryKey = RegExp.$1
        const [dist, template] = entryKey.split("-")
        _entry[entryKey] = item;
        _plugins.push(new HtmlWebpackPlugin({
            filename: `../views/${dist}/pages/${template}.html`,
            template: `src/webapp/views/${dist}/pages/${template}.html`,
            inject: false,
            chunks: ["runtime",entryKey],
            minify: {
                collapseWhitespace: _modefalg,
                removeAttrbuteQuotes: _modefalg
            }
        }))
    }
}
const webpackConfig = {
    entry: _entry,
    output: {
        path: join(__dirname, "./dist/assets"),
        publicPath: "/",
        filename: "scripts/[name].bundle.js"
    },
    plugins: [
        ..._plugins,
        ...happyPack,
        new HTMLAfterWebpackPlugin()
    ],
    watch:!_modefalg,
    optimization:{
        // splitChunks:{//抽离同步import 
        //     chunks:"async",
        //     minCHunks:2,
        //     cacheGroups:{//抽离异步import
        //         commons:{
        //             minChunks:2,
        //             // minSize:0,
        //             name:"commons"
        //         }
        //     },
        // },
        runtimeChunk:{
            name:"runtime"
        }
    },
    module: {
        rules: [{
            test: /\.ts?$/,
            exclude:/node_modules/,
            use: "happypack/loader?id=happyTS"
        },
        {
            test: /\.css?$/,
            exclude:/node_modules/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: "happypack/loader?id=happyCSS"
            })
        }]
    },
    resolve: {
        extensions: ['.ts', '.css']
    }
}
module.exports = merge(webpackConfig, _mergaConfig)