import _ from 'lodash'
import path from 'path'

let config = {
    viewDir:path.join(__dirname, '../views')
}
const init =()=>{
    if(process.env.NODE_ENV==='development'){
        const localConfig={
            port:8080
        }
        config = _.extend(config,localConfig)
    }
    if(process.env.NODE_ENV==="production"){
        const proConfig={
            port:80
        }
        config = _.extend(config,proConfig)
    }
    return config
}
const result = init()
export default result