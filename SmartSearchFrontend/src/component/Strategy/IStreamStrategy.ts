// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {IStrategy} from "./IStrategy.ts";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {Output} from "./Pipeline/Pipeline.ts";

/**
 * Defines the strategy used to complete the clients request.
 * This class implements a 64 bit byte array (Uint8Array) of the IDefaultStrategy pattern hierarchy
 * and should be implemented or extended into all subsequent classes.
 */
export interface IStreamStrategy<T> extends IStrategy<T> {

    /**
    * Send a request to an AI Model API endpoints
    * @param {prompt: string, layman: false} options
    * @param {element: HTMLElement} streamOptions
    * @returns  {Output<T>}
    */
    streamRequest(options: { prompt: string; layman: false }, streamOptions?: { element: HTMLElement }): Output<T>
}
