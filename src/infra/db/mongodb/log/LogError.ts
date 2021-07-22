import { LogErrorRepository } from '../../../../data/protocols/LogErrorRepository'
import { MongoHelper } from '../helpers/mongo.helper'
export class MongoLogErrorRepository implements LogErrorRepository {
  async log (stack: string): Promise<void> {
    const logCollection = await MongoHelper.getCollection('logs')
    await logCollection.insertOne(stack)
  }
}
