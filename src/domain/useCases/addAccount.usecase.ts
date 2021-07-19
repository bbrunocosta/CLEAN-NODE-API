import { Account } from '../models/account'

export interface AddAccountObj {
  name: string
  email: string
  password: string
}
export interface AddAccount {
  add: (addAccountObj: AddAccountObj) => Promise<Account>
}
