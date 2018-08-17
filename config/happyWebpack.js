const HappyPack = require('happypack');
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({
    size:os.cpus().length
})
module.exports = [
    new HappyPack({
        id:"happyTS",
        threadPool:happyThreadPool,
        verbose:true,
        loaders:[{
            path:"ts-loader",
            query:{
                happyPackMode:true
            }
        }]
    })
]