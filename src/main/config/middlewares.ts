import { bodyParser } from '../middleares/bodyparser'
import { Express } from 'express'

export default (app: Express): void => {
  app.use(bodyParser)
}
