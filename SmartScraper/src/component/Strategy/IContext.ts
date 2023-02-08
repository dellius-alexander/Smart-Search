// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {IStrategy} from "./IStrategy.ts";

/**
 * The Context strategy represent the selection and execution of a particular strategy.
 * The class should be implemented using the state object to index the strategy and a
 * unique UUID, the unique id of this context
 * 1. The first 8 digits represent the hexadecimal timestamp.
 * 2. The next 4 digits represent the clock sequence.
 * 3. The next 4 digits represent the node/model id.
 * 4. The next 4 digits represent the node/model type.
 * 5. The last 12 digits represent a random number.
 */
export interface IContext {
  /**
   * Saves the state of the strategy selected and provides a UUID.
   * This object should save the state of:
   * 1. The unique {@link UUID} id of the strategy.
   * 2. The {@link IStrategy} selected
   */
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  state: { [key: string]: string|boolean|RegExp|IStrategy}

  setStrategy(strategy: IStrategy): void
  executeStrategy(options: { prompt: string; layman: false }, streamOptions?: {element: Element}):
      Promise<string | JSON | ReadableStream<object> | JSX.Element | JSX.Element[] | HTMLElement | void>

}

