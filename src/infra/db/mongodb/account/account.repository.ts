import { AddAccountRepository } from '../../../../data/protocols/addAccountRepository'
import { Account } from '../../../../domain/models/account'
import { AddAccountObj } from '../../../../domain/useCases/addAccount.usecase'
import { MongoHelper } from '../helpers/mongo.helper'
export class MongoAccountRepository implements AddAccountRepository {
  async add (addAccountObj: AddAccountObj): Promise<Account> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.insertOne(addAccountObj)
    return MongoHelper.map(account.ops[0])
  }
}
