// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {IStrategy} from "./IStrategy.ts";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {Input, Output, Pipeline} from "./Pipeline/Pipeline.ts";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// import {ExecuteStrategy} from "./ExecuteStrategy.ts";
/**
 * The Context strategy represent the selection and execution of a particular strategy.
 */
export interface IContext<T>  {
  pipeline: Pipeline<T>
  /**
   * This method is used to assign a strategy to the pipeline for the current
   * context. The strategy can be a class or an object that implements
   * the {@link ExecuteStrategy} class used in this case to execute
   * a strategy. The strategy is passed as a parameter to the {@link ExecuteStrategy}
   * class constructor.
   * @param {IStrategy<T>} strategy
   */
  setStrategy(strategy: IStrategy<T>): void
  /**
   * Executes the requested strategy.
   * @param {Input<T>} input
   * @return {Output<T>}
   */
  execute(input: Input<T>): Output<T>

}

