import env from '../main/config/env'
import { MongoHelper } from '../infra/db/mongodb/helpers/mongo.helper'
MongoHelper.connect(env.mongoUrl).then(async () => {
  console.log('db is connected')
  const app = (await import('./config/app')).default
  app.listen(env.port, () => {
    console.log('server running on port 5050')
  })
}).catch(console.log)
