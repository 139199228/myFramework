
/**
 * @fileOverview 实现index数据模型
 * @author nannan
 * 
 */
/**
 * Indexmodel类 生成一段异步数据
 * @class
 */
/**
 * @constructor
 * @param {string} app koa2上下文
 */
/**
 * 获取具体点API接口
 * @returns {Promise} 返回异步数据
 * @example
 * return new Promise
 * getData
 */
class IndexService{
    getData(){
        return new Promise((resolve)=>{
            setTimeout(() => {
                resolve("异步数据")
            }, 1000);
        })
    }
}