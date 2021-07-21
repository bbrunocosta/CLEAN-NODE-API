import { bodyParser } from '../middleares/bodyparser'
import { cors } from '../middleares/cors'
import { Express } from 'express'

export default (app: Express): void => {
  app.use(bodyParser)
  app.use(cors)
}
