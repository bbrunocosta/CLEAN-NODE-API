import { Collection } from 'mongodb'
import { MongoHelper } from '../helpers/mongo.helper'
import { MongoLogErrorRepository } from './LogError'
describe('Mongo Log Error Repository ', () => {
  let errorLogCollection: Collection
  beforeAll(async () => await MongoHelper.connect(process.env.MONGO_URL ?? ' '))
  afterAll(async () => await MongoHelper.disconnect())
  beforeEach(async () => {
    errorLogCollection = await MongoHelper.getCollection('errors')
    await errorLogCollection.deleteMany({})
  })
  const fakeStack = 'a fake stack'
  const sut = new MongoLogErrorRepository()
  test('Sould create an error log on success', async () => {
    await sut.logError(fakeStack)
    const count = await errorLogCollection.countDocuments()
    expect(count).toBe(1)
  })
})
