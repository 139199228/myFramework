import{GET,route} from 'awilix-koa'


export default
@route("/")
@route("/index.html")
class IndexController{
    constructor({dataService}){
        console.log(dataService)
        this.dataService = dataService
    }
    @GET()
    async indexInit(ctx){

            // const indexModel = new IndexModel()
            // const result = await indexModel.getData()
            // ctx.body= await ctx.render("index",{
            //     result
            // })
            
            console.log(ctx)
            console.log(this.dataService)
            const result = await this.dataService.getData()
            ctx.body = await ctx.render('index',{data:result})
        
    }
}