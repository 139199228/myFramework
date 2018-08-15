import indexController from './indexController'
const Controller = new indexController()

export default (app,router)=>{
    app.use(router(_ => {
        _.get('/',Controller.indexInit())
    }))
}