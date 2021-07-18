import { HttpResponse } from '../protocols/http'

export const badRequest = (body: any): HttpResponse => ({
  status: 400,
  body
})