import { Account, AddAccountObj, AddAccountRepository } from './db-add-account.protocols'
import { DbAddAccount } from './db-add-account'
describe('DbAddAccount UseCase', () => {
  const fakeError = new Error('any error')
  const fakeDataWithIdAndHashedPassword = {
    id: 'valid id',
    name: 'valid name',
    email: 'valid email',
    password: 'hashed password'
  }
  const fakeAccountData = {
    name: 'valid name',
    email: 'valid email',
    password: 'valid password'
  }
  class EncrypterStub {
    async encrypt (string: string): Promise<string> {
      return await Promise.resolve('hashed password')
    }
  }
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add (accountObj: AddAccountObj): Promise<Account> {
      return fakeDataWithIdAndHashedPassword
    }
  }
  const encrypterStub = new EncrypterStub()
  const addAccountRepositoryStub = new AddAccountRepositoryStub()
  const sut = new DbAddAccount(encrypterStub, addAccountRepositoryStub)
  test('should call encripter with correct password', async () => {
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    await sut.add(fakeAccountData)
    expect(encryptSpy).toHaveBeenCalledWith(fakeAccountData.password)
  })
  test('Should throw if Encrypter throws', async () => {
    jest.spyOn(encrypterStub, 'encrypt').mockReturnValueOnce(Promise.reject(fakeError))
    const promise = sut.add(fakeAccountData)
    await expect(promise).rejects.toThrow()
  })
  test('Should call AddAccountRepopsitory with correct values', async () => {
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
    await sut.add(fakeAccountData)
    expect(addSpy).toHaveBeenCalledWith({ ...fakeDataWithIdAndHashedPassword, id: undefined })
  })
  test('Should throw if addAccountRepository throws', async () => {
    jest.spyOn(addAccountRepositoryStub, 'add').mockReturnValueOnce(Promise.reject(fakeError))
    const promise = sut.add(fakeAccountData)
    await expect(promise).rejects.toThrow()
  })
  test('should return an Account on sucess', async () => {
    const account = await sut.add(fakeAccountData)
    expect(account).toEqual(fakeDataWithIdAndHashedPassword)
  })
})
