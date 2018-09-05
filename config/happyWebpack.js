const HappyPack = require('happypack');
const os = require('os')
const happyThreadPoll = HappyPack.ThreadPool({
    size: os.cpus().length
})
module.exports = [
    new HappyPack({
        id: "happyTS",
        threadPool: happyThreadPoll,
        verbose: true,
        loaders: [{
            path: "ts-loader",
            query: {    
                happyPackMode: true
            }
        }]
    }),
    new HappyPack({
        id: "happyCSS",
        threadPool: happyThreadPoll,
        loaders: [{
                loader: 'css-loader',
                options: {
                    importLoaders: 1,
                }
            },
            "postcss-loader"
        ]
    })
]