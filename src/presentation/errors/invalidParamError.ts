'use strict'

/**
 * Generic feed error
 * @extends Error
 * @classdesc Wraps feed errors allowing specification of the feed that errored.
 * @property {string} name name of the error
 * @property {string} message Standardized error message
 * @property {string} paramName the field that is missing on the request
 */
// * @property {string} feed Feed URL producing the error
export class InvalidParamError extends Error {
  /**
   * Create a Feed error
   * @param {string} message error message
   * @param {string} type    Type of error, provides Error#name
   * @param {string} paramName    Type of error, provides Error#name
   */
  // @param {string} feed    Feed url that originated the error
  constructor (paramName: string) {
    super()
    /**
     * Type of error
     * @type {string}
     */
    this.name = 'InvalidParamError'
    /**
     * Param name causing the error
     * @type {string}
     */
    this.message = `The param ${paramName} is invalid`
  }

  toString (): string {
    return `${this.name} : ${this.message}` // \n${this.feed}
  }
}
