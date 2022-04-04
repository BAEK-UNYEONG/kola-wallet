import KoaRouter from '@koa/router'
import v1 from './v1/index.js'

const api = new KoaRouter()

api.use('/v1', v1.routes())

export default api
