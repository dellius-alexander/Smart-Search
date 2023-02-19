// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {IStrategy} from "./IStrategy.ts";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {Output, Pipeline, PipelineHandler} from "./Pipeline/Pipeline.ts";
/**
 * The Context strategy represent the selection and execution of a particular strategy.
 */
export interface IContext<T> {
  /**
   * Saves the state of the strategy selected.
   */
  state: { [key: string]: string|boolean|RegExp|object|never|JSON|IContext<T>|Pipeline<T>|PipelineHandler<T>|IStrategy<T>|T};
  setStrategy(strategy: T): void
  execute(options: { prompt: string; layman: false }, streamOptions?: {element: HTMLElement}): Output<T>

}

