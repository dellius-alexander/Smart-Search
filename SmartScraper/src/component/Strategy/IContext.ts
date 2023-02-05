// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {IStrategy} from "./IStrategy.ts";

/**
 * The Context strategy represent the selection and execution of a particular strategy.
 */
interface IContext {
  _strategy: IStrategy;
  setStrategy(strategy: IStrategy): void
  executeStrategy(options: { prompt: string; layman: false }, streamOptions?: {element: Element}):
      Promise<string | JSON | ReadableStream<object> | JSX.Element | JSX.Element[] | HTMLElement | void>

}

export { IContext };