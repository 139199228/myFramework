
class DataService{
    getData(){
        return new Promise((resolve)=>{
            setTimeout(() => {
                resolve("异步数据")
            }, 1000);
        })
    }
}