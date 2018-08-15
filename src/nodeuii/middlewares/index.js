const indexMiddleWares = {
    error(app,logger){
        app.use(async(ctx,next)=>{
            try{
                await next()
            }catch(e){
                logger.error(e)
                //服务器接口把log4日志放到单独集群服务器上
                //邮件 短信和电话通知开发人员

                ctx.status = e.status||200;
                ctx.body = `<h1 style='width:100%;text-align:center;line-height:300px;'>请求出错😢 ${e}</h1>`
            }

        })
        app.use(async(ctx,next)=>{
            await next()
            if(ctx.status !== 404) return
            ctx.body = `<script type="text/javascript" src="//qzonestyle.gtimg.cn/qzone/hybrid/app/404/search_children.js" charset="utf-8" homePageUrl="/" homePageName="回到我的主页"></script>`
        })
    }
}
export default indexMiddleWares