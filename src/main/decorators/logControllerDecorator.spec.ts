import { created } from '../../presentation/helpers/http.helper'
import { HttpRequest, HttpResponse } from '../../presentation/protocols'
import { LogControllerDecorator } from './logControllerDecorator'

describe('Log Controller Decorator', () => {
  class ControllerStub {
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
      return created({})
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
})
