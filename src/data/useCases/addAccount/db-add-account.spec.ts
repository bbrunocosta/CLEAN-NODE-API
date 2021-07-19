import { DbAddAccount } from './db-add-account'

describe('DbAddAccount UseCase', () => {
  class EncrypterStub {
    async encrypt (string: string): Promise<string> {
      return await new Promise(resolve => resolve('hashed password'))
    }
  }
  const encrypterStub = new EncrypterStub()
  const sut = new DbAddAccount(encrypterStub)
  const accountData = {
    name: 'valid name',
    email: 'valid email',
    password: 'valid password'
  }

  test('should call encripter with correct password', async () => {
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    await sut.add(accountData)
    expect(encryptSpy).toHaveBeenCalledWith(accountData.password)
  })
})
