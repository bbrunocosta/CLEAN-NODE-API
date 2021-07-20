import request from 'supertest'
import app from '../config/app'

describe('Body Parser Middleware', () => {
  test('Sould parse body as json', async () => {
    app.post('/test_bodyparser', (req, res) => { res.send(req.body) })
    await request(app).post('/test_bodyparser').send({ name: 'bruno' }).expect({ name: 'bruno' })
  })
})
