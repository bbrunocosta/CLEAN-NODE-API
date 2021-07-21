import express from 'express'
import setUpMiddlewares from './middlewares'
import setUpRouter from './router'

const app = express()
setUpMiddlewares(app)
setUpRouter(app)
export default app
