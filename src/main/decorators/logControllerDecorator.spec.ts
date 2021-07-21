import { created } from '../../presentation/helpers/http.helper'
import { HttpRequest, HttpResponse } from '../../presentation/protocols'
import { LogControllerDecorator } from './logControllerDecorator'

describe('Log Controller Decorator', () => {
  class ControllerStub {
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
      return created({ res: 'ControllerStubResponses' })
    }
  }
  const controllerSub = new ControllerStub()
  const sut = new LogControllerDecorator(controllerSub)
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
})
