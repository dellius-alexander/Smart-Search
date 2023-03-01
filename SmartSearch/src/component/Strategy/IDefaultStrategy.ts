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

  /**
  * Send a request to an AI Model API endpoints
  * @param {prompt: string, layman: false} options
  * @param {element: HTMLElement} streamOptions
  * @return {Output<T>}
  */
  sendRequest(options: { prompt: string; layman: false }, streamOptions?: { element: HTMLElement }): Output<T>
}
