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
    /*
 * Saves the state of the strategy selected.
 */
    state: { [key: string]: string|boolean|RegExp|object|never|JSON|IStrategy<T>|T};
    /**
     * Send a request to Gpt3 API endpoints
     * @param {{prompt: string, layman: false}} options
     * @param {{element: Element}} streamOptions??
     * @returns  {{Promise<string | JSON | ReadableStream<object> | JSX.Element | JSX.Element[] | HTMLElement | void>}} JSX element(s), empty array, or string.
     */
    streamRequest(options: { prompt: string; layman: false }, streamOptions?: { element: Element }): Output<T>
}
