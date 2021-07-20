import { MongoHelper } from '../helpers/mongo.helper'
import { MongoAccountRepository } from './account.repository'
describe('AccountRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL ?? ' ')
  })
  afterAll(async () => {
    await MongoHelper.disconnect()
  })
  test('Sould return an account on success', async () => {
    const sut = new MongoAccountRepository()
    const account = await sut.add({
      name: 'any name',
      email: 'any email',
      password: 'any password'
    })
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any name')
    expect(account.password).toBe('any password')
    expect(account.email).toBe('any email')
  })
})
