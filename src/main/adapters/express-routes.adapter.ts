import { Request, Response } from 'express'
import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'

export const adaptRoute = (controller: Controller) => {
  return (expressRequest: Request, expressResponse: Response) => {
    (async () => {
      const httpRequest: HttpRequest = {
        body: expressRequest.body
      }
      const httpResponse: HttpResponse = await controller.handle(httpRequest)
      expressResponse.status(httpResponse.status).json(httpResponse.body)
    })().catch(console.log)
  }
}
