import { EmailValidatorAdapter } from '../utils/emailValidator'
import validator from 'validator'
jest.mock('validator', () => ({
  isEmail (): boolean {
    return true
  }
}))
describe('Email Validator', () => {
  const sut = new EmailValidatorAdapter()
  test('Should return false if validator returns false', () => {
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValid = sut.isValid('isVAlid_email@teste.com')
    expect(isValid).toBe(false)
  })
  test('Should return true if validator returns true', () => {
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(true)
    const isValid = sut.isValid('isVAlid_email@teste.com')
    expect(isValid).toBe(true)
  })
})
