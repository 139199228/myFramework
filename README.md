# myFramework
    "babel-core": "^6.26.3",//babel  编译es6
    "babel-plugin-transform-decorators-legacy": "^1.3.5",// 编译@  装饰器
    "babel-plugin-transform-es2015-modules-commonjs": "^6.26.2",//编译es6
    "babel-preset-env": "^1.7.0",//编译es6
    "gulp-babel": "^7.0.1",//编译es6
    "gulp-rollup": "^2.16.2",//流清洗
    "gulp-sequence": "^1.0.0",//让异步 变成有顺序的执行
    "gulp-watch": "^5.0.1",//监听文件变化 自动更新
    "jsdoc": "^3.5.5",//生成文档  方便团队使用
    "rollup-plugin-replace": "^2.0.0" //流清洗 替换插件
    "glob": "^7.1.2",//glob() 函数返回匹配指定模式的文件名或目录
    "happypack": "^5.0.0",//webpack是单线程的   happypack是可以同一时间处理多个任务，把任务分解成多个子进程去并发的执行。
    "ts-loader": "^4.4.2",//ts-loader 编译ts
    "webpack": "^4.16.5",//webpack
    "webpack-cli": "^3.1.0",//webpack -cli
    "webpack-merge": "^4.1.4",//合并对象
    "yargs-parser": "^10.1.0"//取到webpack参数  argv=require('yargs-parser')(process.argv.slice(2))

    "awilix": "^3.0.9",//自动注入路由
    "awilix-koa": "^2.1.1",",//koa自动注入路由
    "co": "^4.6.0", //koa2 使用koa2-swig 依赖
    "cross-env": "^5.2.0",//设置当前环境
    "gulp": "^3.9.1",//编译node  es6  node不支持import
    "gulp-eslint": "^5.0.0",//规范代码
    "koa": "^2.5.2",//node koa框架
    "koa-simple-router": "^0.2.0",//koa路由
    "koa-static": "^5.0.0",//设置静态文件
    "koa-swig": "^2.2.1",//swig模版
    "lodash": "^4.17.10",//_  函数式变成
    "log4js": "^3.0.5"//生成日志  错误处理
    "css-loader": "^1.0.0",//编译css
    "html-webpack-plugin": "^3.2.0",//为项目生成一个或多个html,并将webpack打包后的文件输出的所有脚本自动添加到插件生成html中
    "style-loader": "^0.22.1"",//编译css



技术栈koa2  自动化测试  doce 
####自动注入路遇  inversify.js  比较火
    可以使用   awilix 比较好用

####  装饰器  babel-plugin-transform-decorators-legacy   灌入到 gulp plugins




file-loader

liveReloadPlugin
copyWebackPlugin
html-minifile