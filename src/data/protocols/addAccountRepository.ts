import { AddAccountObj } from '../../domain/useCases/addAccount.usecase'
import { Account } from '../../domain/models/account'

export interface AddAccountRepository {
  add: (accountObj: AddAccountObj) => Promise<Account>
}
