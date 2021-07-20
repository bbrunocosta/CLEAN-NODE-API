import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt.adapter'

describe('BcryptAdapter', () => {
  const salt = 12
  const sut = new BcryptAdapter(salt)
  test('Should call bcrypt with correct data', async () => {
    const bcryptSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any value')
    expect(bcryptSpy).toHaveBeenCalledWith('any value', salt)
  })
})
