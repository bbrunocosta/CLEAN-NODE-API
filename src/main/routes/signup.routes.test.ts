import request from 'supertest'
import app from '../config/app'

describe('Signup route', () => {
  test('Sould return an account on sucess', async () => {
    app.post('/test_cors', (req, res) => { res.send() })
    await request(app)
      .post('/api/signup')
      .send({
        name: 'any name',
        email: 'any email',
        password: 'any password',
        passwordConfirmation: 'any password'
      })
      .expect(201)
  })
})
