import { EmailValidatorAdapter } from '../utils/emailValidator'
describe('Email Validator', () => {
  const sut = new EmailValidatorAdapter()
  const isValid = sut.isValid('isVAlid_email@teste.com')
  test('Should return false if validator returns false', () => {
    expect(isValid).toBe(false)
  })
})
