import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt.adapter'
jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return await new Promise(resolve => resolve('valid hash'))
  }
}))
describe('BcryptAdapter', () => {
  const salt = 12
  const sut = new BcryptAdapter(salt)
  test('Should call bcrypt with correct data', async () => {
    const bcryptSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any value')
    expect(bcryptSpy).toHaveBeenCalledWith('any value', salt)
  })
  test('Should return a hash on success', async () => {
    const hash = await sut.encrypt('any value')
    expect(hash).toBe('valid hash')
  })
  test('Should throw if bcrypt throws', async () => {
    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(async () => await new Promise((resolve, reject) => reject(new Error('new error'))))
    const promise = sut.encrypt('any value')
    await expect(promise).rejects.toThrow()
  })
})
