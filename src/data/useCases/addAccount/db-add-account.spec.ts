import { Account, AddAccountObj, AddAccountRepository } from './db-add-account.protocols'
import { DbAddAccount } from './db-add-account'
describe('DbAddAccount UseCase', () => {
  class EncrypterStub {
    async encrypt (string: string): Promise<string> {
      return await new Promise(resolve => resolve('hashed password'))
    }
  }
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add (accountObj: AddAccountObj): Promise<Account> {
      return {
        id: 'valid id',
        name: 'valid name',
        email: 'valid email',
        password: 'hashed password'
      }
    }
  }
  const accountData = {
    name: 'valid name',
    email: 'valid email',
    password: 'valid password'
  }
  const encrypterStub = new EncrypterStub()
  const addAccountRepositoryStub = new AddAccountRepositoryStub()
  const sut = new DbAddAccount(encrypterStub, addAccountRepositoryStub)
  test('should call encripter with correct password', async () => {
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    await sut.add(accountData)
    expect(encryptSpy).toHaveBeenCalledWith(accountData.password)
  })
  test('Should throw if Encrypter throws', async () => {
    jest.spyOn(encrypterStub, 'encrypt').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error('any error'))))
    const promise = sut.add(accountData)
    await expect(promise).rejects.toThrow()
  })
  test('Should call AddAccountRepopsitory with correct values', async () => {
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
    await sut.add(accountData)
    expect(addSpy).toHaveBeenCalledWith({
      name: 'valid name',
      email: 'valid email',
      password: 'hashed password'
    })
  })
  test('Should throw if addAccountRepository throws', async () => {
    jest.spyOn(addAccountRepositoryStub, 'add').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error('any error'))))
    const promise = sut.add(accountData)
    await expect(promise).rejects.toThrow()
  })
  test('should return an Account on sucess', async () => {
    const account = await sut.add(accountData)
    expect(account).toEqual({
      id: 'valid id',
      name: 'valid name',
      email: 'valid email',
      password: 'hashed password'
    })
  })
})
