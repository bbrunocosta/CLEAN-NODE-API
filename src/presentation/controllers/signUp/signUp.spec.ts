import { MissingParamError, InvalidParamError, ServerError } from '../../errors'
import { EmailValidator, Account, AddAccount, AddAccountObj } from './signUp.protocols'
import { SignUpController } from './signUp.controller'

class AddAccountStub implements AddAccount {
  async add (account: AddAccountObj): Promise<Account> {
    const fakeAccount = {
      id: 'valid id',
      ...account
    }
    return fakeAccount
  }
}

class EmailValidatorStub implements EmailValidator {
  isValid (email: string): boolean {
    return true
  }
}

const fakeHttpRequest = {
  body: {
    name: 'any name',
    email: 'any email',
    password: 'any password',
    passwordConfirmation: 'any password'
  }
}

const fakeHttpRequestWithout = (field: string): any => ({ body: { ...fakeHttpRequest.body, [field]: undefined } })

const fakeHttpRequestWithDifferentValue = (field: string): any => ({ body: { ...fakeHttpRequest.body, [field]: 'another value' } })

describe('SignUp Controller', () => {
  const emailValidatorStub = new EmailValidatorStub()
  const addAccountStub = new AddAccountStub()
  const sut = new SignUpController(emailValidatorStub, addAccountStub)

  test('Should return 400 if no name is provided', async () => {
    const httpResponse = await sut.handle(fakeHttpRequestWithout('name'))
    expect(httpResponse.status).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('name'))
  })

  test('Should return 400 if no email is provided', async () => {
    const httpResponse = await sut.handle(fakeHttpRequestWithout('email'))
    expect(httpResponse.status).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })

  test('Should return 400 if no password is provided', async () => {
    const httpResponse = await sut.handle(fakeHttpRequestWithout('password'))
    expect(httpResponse.status).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
  })

  test('Should return 400 if no passwordConfirmation is provided', async () => {
    const httpResponse = await sut.handle(fakeHttpRequestWithout('passwordConfirmation'))
    expect(httpResponse.status).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('passwordConfirmation'))
  })

  test('Should return 400 if provided email is invalid', async () => {
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpResponse = await sut.handle(fakeHttpRequest)
    expect(httpResponse.status).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('email'))
  })

  test('Should call isValid with correct email', async () => {
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
    await sut.handle(fakeHttpRequest)
    expect(isValidSpy).toHaveBeenCalledWith(fakeHttpRequest.body.email)
  })

  test('Should return 500 if EmailValidator throws', async () => {
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => { throw new ServerError('any stack') })
    const httpResponse = await sut.handle(fakeHttpRequest)
    expect(httpResponse.status).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError('any stack'))
  })

  test('Should return 400 if password and its confirmation is not the same', async () => {
    const httpResponse = await sut.handle(fakeHttpRequestWithDifferentValue('passwordConfirmation'))
    expect(httpResponse.status).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('passwordConfirmation'))
  })

  test('Should call addAccount with correct values', async () => {
    const addAccountSpy = jest.spyOn(addAccountStub, 'add')
    await sut.handle(fakeHttpRequest)
    const { name, email, password } = fakeHttpRequest.body
    expect(addAccountSpy).toHaveBeenCalledWith({ name, email, password })
  })

  test('Should return 500 if AddAccount throws', async () => {
    jest.spyOn(addAccountStub, 'add').mockImplementationOnce(() => { throw new ServerError('any stack') })
    const httpResponse = await sut.handle(fakeHttpRequest)
    expect(httpResponse.status).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError('any stack'))
  })

  test('Should return 201 if correct data was provided', async () => {
    const httpResponse = await sut.handle(fakeHttpRequest)
    expect(httpResponse.status).toBe(201)
    expect(httpResponse.body).toEqual({
      id: 'valid id',
      ...fakeHttpRequest.body,
      passwordConfirmation: undefined
    })
  })
})
