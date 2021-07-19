import { Account } from '../../../domain/models/account'
import { AddAccount, AddAccountObj } from '../../../domain/useCases/addAccount.usecase'
import { Encrypter } from '../../protocols/encrypter'

export class DbAddAccount implements AddAccount {
  constructor (private readonly encripter: Encrypter) {

  }

  async add (accountData: AddAccountObj): Promise<Account> {
    const hashedPassword = await this.encripter.encrypt(accountData.password)
    return {
      name: accountData.name,
      email: accountData.email,
      password: hashedPassword,
      id: 'valid id'
    }
  }
}
