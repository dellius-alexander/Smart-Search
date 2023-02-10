// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {IStrategy} from "./IStrategy.ts";

/**
 * Defines the strategy used to complete the clients request.
 * This class represents the normal implementation of the Strategy pattern hierarchy
 * and should be implemented or extended into all subsequent classes as needed.
 */
export interface Strategy extends IStrategy{
  /**
   * The sendRequest function will fulfill the client request and return a response from the selected API.
   * @param {{ prompt: string, layman: false }} options
   * @return {{Promise<string | void | JSX.Element | JSX.Element[]>}}
   */
  sendRequest(options: { prompt: string, layman: false }):
      Promise<string | JSON | ReadableStream<object> | JSX.Element | JSX.Element[] | HTMLElement | void>
}
