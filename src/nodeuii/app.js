import Koa from 'koa'
import router from 'koa-simple-router'
import render from 'koa-swig'
import serve from 'koa-static'
import config from './config'
import co from 'co'



import controllerInit from './controllers'
import middleWares from './middlewares'

const app = new Koa()
const log4js = require('log4js');

log4js.configure({
  appenders: { cheese: { type: 'file', filename: __dirname+'/log4/errors.log' } },
  categories: { default: { appenders: ['cheese'], level: 'error' } }
});
const logger = log4js.getLogger('cheese');

app.context.render = co.wrap(render({
    root: config.viewDir,
    autoescape: true,
    cache: 'memory', // disable, set to false
    ext: 'html',
    varControls:["[[","]]"],
    writeBody: false
}));
middleWares.error(app,logger);

app.use(serve(__dirname + '/public/'));

controllerInit(app,router)

app.listen(config.port,function(){
    console.log(`端口${config.port}加载中...`)
})