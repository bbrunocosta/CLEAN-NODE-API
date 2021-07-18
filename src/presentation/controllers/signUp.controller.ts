import { httpRequest, httpResponse } from '../protocols/http'
export class SignUpController {
  handle (httpRequest: httpRequest): httpResponse {
    if (!httpRequest.body.name) {
      return {
        status: 400,
        body: new Error('Missing param: name')
      }
    }
    if (!httpRequest.body.email) {
      return {
        status: 400,
        body: new Error('Missing param: email')
      }
    }
    return {
      status: 201,
      body: {}
    }
  }
}
