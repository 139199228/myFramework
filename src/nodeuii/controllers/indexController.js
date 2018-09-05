import{GET,route} from 'awilix-koa'


export default
@route("/")
@route("/index.html")
class IndexController{
    constructor({indexService}){
        this.indexService = indexService
    }
    @GET()
    async indexAction(ctx){
            // const indexModel = new IndexModel()
            // const result = await indexModel.getData()
            // ctx.body= await ctx.render("index",{
            //     result
            // })
            const result = await this.indexService.getData()
            ctx.body = await ctx.render('index/pages/index',{result})
        
    }
}