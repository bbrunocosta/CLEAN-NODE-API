import { DbAddAccount } from '../../data/useCases/addAccount/db-add-account'
import { BcryptAdapter } from '../../infra/criptography/bcrypt.adapter'
import { MongoAccountRepository } from '../../infra/db/mongodb/account/account.repository'
import { MongoLogErrorRepository } from '../../infra/db/mongodb/log/LogError'
import { SignUpController } from '../../presentation/controllers/signUp/signUp.controller'
import { Controller } from '../../presentation/protocols'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'
import { LogControllerDecorator } from '../decorators/logControllerDecorator'

export const makeSignUpController = (): Controller => {
  const salt = 12
  const emailValidator = new EmailValidatorAdapter()
  const mongoAccountRepository = new MongoAccountRepository()
  const bcryptAdapter = new BcryptAdapter(salt)
  const dbAddAccount = new DbAddAccount(bcryptAdapter, mongoAccountRepository)
  const signUpcontroller = new SignUpController(emailValidator, dbAddAccount)
  const logErrorRepository = new MongoLogErrorRepository()
  const logControllerDecorator = new LogControllerDecorator(signUpcontroller, logErrorRepository)
  return logControllerDecorator
}
