const path = require("path")
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const minify = require('html-minifier').minify;
module.exports = {
    output:{
        filename:"scripts/[name].[hash:5].bunld.js"
    },
    plugins:[
        //处理views的模版
        new CopyWebpackPlugin([{
            from:path.join(__dirname,"../"+"/src/webapp/views/common/layout.html"),
            to:"../views/common/layout.html"
        }]),
        //处理components模版
        new CopyWebpackPlugin([{
            from:path.join(__dirname,"../"+"/src/webapp/components/"),
            to:"../components/",
            transform(content){
                return minify(content.toString("utf-8"),{
                    collapseWhitespace:true
                })
            }
        }],{
            copyUnmodified:true,//只拷贝已经改变的
            ignore:["*.js","*.css",".DS_Store","*.png"]
        }),
        new ExtractTextPlugin({
            filename:(getPath)=>{
                return  getPath("styles/[name][hash:5].css")
            },
            allChunks:true
        })
    ]
}