import { AddAccountRepository } from '../../protocols/addAccountRepository'
import { Account, AddAccount, AddAccountObj, Encrypter } from './db-add-account.protocols'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly encripter: Encrypter,
    private readonly addAccountRepository: AddAccountRepository
  ) {

  }

  async add (accountData: AddAccountObj): Promise<Account> {
    const hashedPassword = await this.encripter.encrypt(accountData.password)
    const newAccount = await this.addAccountRepository.add({ ...accountData, password: hashedPassword })
    return newAccount
  }
}
