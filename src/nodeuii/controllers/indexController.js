import IndexModel from '../models/indexModel'

class IndexController{
    constructor(){

    }
    indexInit(){
        return async (ctx,next) => {
            const indexModel = new IndexModel()
            const result = await indexModel.getData()
            ctx.body= await ctx.render("index",{
                result
            })
        }
    }
}
export default IndexController