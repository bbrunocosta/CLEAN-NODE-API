import { LogErrorRepository } from '../../../../data/protocols/LogErrorRepository'
import { MongoHelper } from '../helpers/mongo.helper'

export class MongoLogErrorRepository implements LogErrorRepository {
  async logError (stack: string): Promise<void> {
    const logCollection = await MongoHelper.getCollection('errors')
    await logCollection.insertOne({ stack, date: new Date() })
  }
}
