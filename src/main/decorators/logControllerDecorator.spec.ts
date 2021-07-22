import { created, serverError } from '../../presentation/helpers/http.helper'
import { HttpRequest, HttpResponse } from '../../presentation/protocols'
import { LogControllerDecorator } from './logControllerDecorator'

describe('Log Controller Decorator', () => {
  class ControllerStub {
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
      return created({ res: 'ControllerStubResponses' })
    }
  }
  class LogErrorRepositoryStub {
    async log (stack: string): Promise<void> {

    }
  }
  const fakeError = new Error()
  fakeError.stack = 'any Stack'
  const logErrorRepositoryStub = new LogErrorRepositoryStub()
  const controllerSub = new ControllerStub()
  const sut = new LogControllerDecorator(controllerSub, logErrorRepositoryStub)
  test('Should call controller.handle', async () => {
    const handleSpy = jest.spyOn(controllerSub, 'handle')
    const httpRequest = {
      body: {
        email: ''
      }

    }
    await sut.handle(httpRequest)
    expect(handleSpy).toHaveBeenCalledWith(httpRequest)
  })
  test('Should return same return of controller', async () => {
    const httpRequest = {
      body: {
        email: ''
      }

    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual({
      status: 201,
      body: { res: 'ControllerStubResponses' }
    })
  })
  test('Sould call LogErrorRepository with correct error if controller returns a server error', async () => {
    jest.spyOn(controllerSub, 'handle').mockReturnValueOnce(Promise.resolve(serverError(fakeError)))
    const logSpy = jest.spyOn(logErrorRepositoryStub, 'log')
    const httpRequest = {
      body: {
        name: 'bruno'
      }
    }
    await sut.handle(httpRequest)
    expect(logSpy).toHaveBeenCalledWith('any Stack')
  })
})
