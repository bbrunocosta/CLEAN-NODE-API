import { SignUpController } from './signUp.controller'
import { MissingParamError } from '../errors/missingParamError'

describe('SignUp Controller', () => {
  test('Should return 400 if no name is provided', () => {
    const sut = new SignUpController()
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
})

describe('SignUp Controller', () => {
  test('Should return 400 if no email is provided', () => {
    const sut = new SignUpController()
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
})
describe('SignUp Controller', () => {
  test('Should return 400 if no password is provided', () => {
    const sut = new SignUpController()
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
})
describe('SignUp Controller', () => {
  test('Should return 400 if no passwordConfirmation is provided', () => {
    const sut = new SignUpController()
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
})
