import { DbAddAccount } from '../../data/useCases/addAccount/db-add-account'
import { BcryptAdapter } from '../../infra/criptography/bcrypt.adapter'
import { MongoAccountRepository } from '../../infra/db/mongodb/account/account.repository'
import { SignUpController } from '../../presentation/controllers/signUp/signUp.controller'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'

export const makeSignUpController = (): SignUpController => {
  const salt = 12
  const emailValidator = new EmailValidatorAdapter()
  const mongoAccountRepository = new MongoAccountRepository()
  const bcryptAdapter = new BcryptAdapter(salt)
  const dbAddAccount = new DbAddAccount(bcryptAdapter, mongoAccountRepository)
  const signUpcontroller = new SignUpController(emailValidator, dbAddAccount)
  return signUpcontroller
}
