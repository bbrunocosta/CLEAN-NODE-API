import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo.helper'
import app from '../config/app'

describe('Signup route', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL ?? ' ')
  })
  afterAll(async () => {
    await MongoHelper.disconnect()
  })
  beforeEach(async () => {
    const accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })
  test('Sould return an account on sucess', async () => {
    app.post('/test_cors', (req, res) => { res.send() })
    await request(app)
      .post('/api/signup')
      .send({
        name: 'any name',
        email: 'anyemail@test.com',
        password: 'any password',
        passwordConfirmation: 'any password'
      })
      .expect(201)
  })
})
