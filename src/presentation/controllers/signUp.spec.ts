import { EmailValidator } from '../protocols'
import { MissingParamError, InvalidParamError, ServerError } from '../errors'
import { SignUpController } from './signUp.controller'

describe('SignUp Controller', () => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  const emailValidatorStub = new EmailValidatorStub()
  const sut = new SignUpController(emailValidatorStub)
  test('Should return 400 if no name is provided', () => {
    const httpRequest = {
      body: {
        email: 'any email',
        password: 'any password',
        passwordConfirmation: 'any password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.status).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('name'))
  })
  test('Should return 400 if no email is provided', () => {
    const httpRequest = {
      body: {
        name: 'any name',
        password: 'any password',
        passwordConfirmation: 'any password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.status).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })
  test('Should return 400 if no password is provided', () => {
    const httpRequest = {
      body: {
        name: 'any name',
        email: 'any email',
        passwordConfirmation: 'any password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.status).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
  })
  test('Should return 400 if no passwordConfirmation is provided', () => {
    const httpRequest = {
      body: {
        name: 'any name',
        email: 'any email',
        password: 'any password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.status).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('passwordConfirmation'))
  })
  test('Should return 400 if provided email is invalid', () => {
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpRequest = {
      body: {
        name: 'any name',
        email: 'any email',
        password: 'any password',
        passwordConfirmation: 'any password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.status).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('email'))
  })
  test('Should call isValid with correct email', () => {
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
    const httpRequest = {
      body: {
        name: 'any name',
        email: 'any email',
        password: 'any password',
        passwordConfirmation: 'any password'
      }
    }
    sut.handle(httpRequest)
    expect(isValidSpy).toBeCalledWith(httpRequest.body.email)
  })
  test('Should return 500 if EmailValidator throws', () => {
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => { throw new Error('anyError') })
    const httpRequest = {
      body: {
        name: 'any name',
        email: 'any email',
        password: 'any password',
        passwordConfirmation: 'any password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.status).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })
})
