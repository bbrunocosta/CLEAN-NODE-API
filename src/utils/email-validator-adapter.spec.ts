import { EmailValidatorAdapter } from './email-validator-adapter'
import validator from 'validator'
jest.mock('validator', () => ({
  isEmail (): boolean {
    return true
  }
}))
const fakeEmail = 'isVAlid_email@teste.com'
describe('Email Validator', () => {
  const sut = new EmailValidatorAdapter()
  test('Should return false if validator returns false', () => {
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValid = sut.isValid(fakeEmail)
    expect(isValid).toBe(false)
  })
  test('Should return true if validator returns true', () => {
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(true)
    const isValid = sut.isValid(fakeEmail)
    expect(isValid).toBe(true)
  })
  test('Should call validator with correct email', () => {
    const isEmail = jest.spyOn(validator, 'isEmail')
    sut.isValid(fakeEmail)
    expect(isEmail).toHaveBeenCalledWith(fakeEmail)
  })
})
