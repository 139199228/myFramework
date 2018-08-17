import Koa from 'koa'
import router from 'koa-simple-router'
import render from 'koa-swig'
import serve from 'koa-static'
import config from './config'
import co from 'co'
import { asClass,asValue,createContainer,Lifetime } from 'awilix'
import { scopePerRequest,loadControllers } from 'awilix-koa'



// import controllerInit from './controllers'
import middleWares from './middlewares'

const app = new Koa()
const log4js = require('log4js');

log4js.configure({
  appenders: { cheese: { type: 'file', filename: __dirname+'/log4/errors.log' } },
  categories: { default: { appenders: ['cheese'], level: 'error' } }
});
const logger = log4js.getLogger('cheese');

//创建ioc容器
const container = createContainer();
//每一次请求与都是new一次类
app.use(scopePerRequest(container));
//装载service
container.loadModules([__dirname+'/service/*.js'],{
  formatName:'camelCase',
  resolverOptions:{
    lifetime:Lifetime.SCOPED
  }
});
app.context.render = co.wrap(render({
    root: config.viewDir,
    autoescape: true,
    cache: 'memory', // disable, set to false
    ext: 'html',
    varControls:["[[","]]"],
    writeBody: false
}));
middleWares.error(app,logger);
//自动注册所有的路由。。
app.use(loadControllers('controllers/*.js', { cwd: __dirname }))

// controllerInit(app,router)
app.use(serve(config.staticDir));

app.listen(config.port,function(){
    console.log(`端口${config.port}加载中...`)
})