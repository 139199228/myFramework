import {GET,route} from 'awilix-koa'

export default
@route("/home")
class HomeController{
    constructor(){
    }
    @GET()
    getAction(ctx){
        ctx.body='home'
    }
}