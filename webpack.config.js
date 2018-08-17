const argv = require('yargs-parser')(process.argv.slice(2))
const merge = require("webpack-merge")
const mode = argv.mode||"development"
const _mergaConfig = require(`./config/webpack.${mode}.js`)
const glob = require('glob')
//遍历文件寻找index-index.entry.ts
let _entry = {};
let _plugins = [];
const _modefalg = (mode == "production"? true:false)
const { join } = require('path')
const files = glob.sync('./src/webapp/views/**/*.entry.ts')
const happyPack = require("./config/happyWebpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const HTMLAfterWebpackPlugin = require('./config/htmlAfterWebpackPlugin')



const regexp = /.+\/([a-zA-Z]+-[a-zA-Z]+)(\.entry\.ts)$/g
for(let item of files){
    if(regexp.test(item)){
        const entryKey = RegExp.$1
        const [dist,template] = entryKey.split("-")
        _entry[entryKey] = item;
        _plugins.push(new HtmlWebpackPlugin({
            filename:`../views/${dist}/pages/${template}.html`,
            template:`src/webapp/views/${dist}/pages/${template}.html`,
            inject:true,
            chunks:[entryKey],
            minify:{
                collapseWhitespace:_modefalg,
                removeAttrbuteQuotes:_modefalg
            }
        }))
    }
}
const webpackConfig = {
    entry:_entry,
    output:{
        path:join(__dirname,"./dist/assets"),
        publicPath:"/",
        filename:"scripts/[name].bundle.js"
    },
    plugins:[
        ..._plugins,
        ...happyPack,
        new HTMLAfterWebpackPlugin()
    ],
    resolve:{
        extensions:['.js','.css']
    }
}
module.exports = merge(webpackConfig,_mergaConfig)