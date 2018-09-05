const path = require("path")
const CopyWebpackPlugin = require('copy-webpack-plugin')
const LiveReloadPlugin = require('webpack-livereload-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    plugins:[
        //处理views的模版
        new LiveReloadPlugin({}),//多页推荐使用，做单页hot
        new CopyWebpackPlugin([{
            from:path.join(__dirname,"../"+"/src/webapp/views/common/layout.html"),
            to:"../views/common/layout.html"
        }]),
        //处理components模版
        new CopyWebpackPlugin([{
            from:path.join(__dirname,"../"+"/src/webapp/components/"),
            to:"../components/"
        }],{
            copyUnmodified:true,//只拷贝已经改变的
            ignore:["*.js","*.css",".DS_Store","*.png"]
        }),
        new ExtractTextPlugin({
            filename:(getPath)=>{
                return  getPath("styles/[name].css")
            },
            allChunks:true
        })
    ]
}