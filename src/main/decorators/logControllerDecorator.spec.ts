import { created, serverError } from '../../presentation/helpers/http.helper'
import { HttpRequest, HttpResponse } from '../../presentation/protocols'
import { LogControllerDecorator } from './logControllerDecorator'

class ControllerStub {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    return created({ res: 'ControllerStubResponses' })
  }
}

class LogErrorRepositoryStub {
  async logError (stack: string): Promise<void> {}
}

const FakeHttpRequest = {
  body: {
    email: 'testEmail@test.com'
  }
}

const fakeError = new Error()
fakeError.stack = 'any Stack'

describe('Log Controller Decorator', () => {
  const logErrorRepositoryStub = new LogErrorRepositoryStub()
  const controllerSub = new ControllerStub()
  const sut = new LogControllerDecorator(controllerSub, logErrorRepositoryStub)
  test('Should call controller.handle', async () => {
    const handleSpy = jest.spyOn(controllerSub, 'handle')
    await sut.handle(FakeHttpRequest)
    expect(handleSpy).toHaveBeenCalledWith(FakeHttpRequest)
  })
  test('Should return same return of controller', async () => {
    const httpResponse = await sut.handle(FakeHttpRequest)
    expect(httpResponse).toEqual({
      status: 201,
      body: { res: 'ControllerStubResponses' }
    })
  })
  test('Sould call LogErrorRepository with correct error if controller returns a server error', async () => {
    jest.spyOn(controllerSub, 'handle').mockReturnValueOnce(Promise.resolve(serverError(fakeError)))
    const logSpy = jest.spyOn(logErrorRepositoryStub, 'logError')
    await sut.handle(FakeHttpRequest)
    expect(logSpy).toHaveBeenCalledWith('any Stack')
  })
})
