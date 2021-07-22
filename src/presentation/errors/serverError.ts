'use strict'

/**
 * Generic feed error
 * @extends Error
 * @classdesc Wraps feed errors allowing specification of the feed that errored.
 * @property {string} name name of the error
 * @property {string} message Standardized error message
 * @property {string} paramName the field that is missing on the request
 * @property {string} stack the field that traces on the error request
 */
// * @property {string} feed Feed URL producing the error
export class ServerError extends Error {
  /**
   * Create a Feed error
   * @param {string} message error message
   * @param {string} type    Type of error, provides Error#name
   * @param {string} paramName Target param error
   * @param {string} stack    Stack trace that creates the error
   */
  // @param {string} feed    Feed url that originated the error
  constructor (stack: string) {
    super()
    /**
     * Type of error
     * @type {string}
     */
    this.name = 'ServerError'
    /**
     * Param name causing the error
     * @type {string}
     */
    this.message = 'Oops, something went wrong, try again later.'
    /**
     * Param stack causing the error
     * @type {string}
     */
    this.stack = stack
  }

  // toString (): string {
  //   return `${this.name} : ${this.message}` // \n${this.feed}
  // }
}
