// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {IStrategy} from "./IStrategy.ts";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {Output} from "./Pipeline/Pipeline.ts";

/**
 * Defines the strategy used to complete the clients request.
 * This class represents the normal implementation of the IDefaultStrategy pattern hierarchy
 * and should be implemented or extended into all subsequent classes as needed.
 */
export interface IDefaultStrategy<T> extends IStrategy<T> {
  /*
 * Saves the state of the strategy selected.
 */
  state: { [key: string]: string|boolean|RegExp|object|never|JSON|IStrategy<T>|T};
  /**
   * The sendRequest function will fulfill the client request and return a response from the selected API.
   * @param {{ prompt: string, layman: false }} options
   * @param {{ element: Element }} streamOptions
   * @return {{Promise<string | void | JSX.Element | JSX.Element[]>}}
   */
  sendRequest(options: { prompt: string, layman: false }, streamOptions?: { element: Element }): Output<T>
}
