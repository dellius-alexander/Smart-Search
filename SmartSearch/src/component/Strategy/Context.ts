// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { IContext } from "./IContext.ts";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {IStrategy} from "./IStrategy.ts";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {SingletonPipeline, Pipeline, PipelineHandler, Output} from "./Pipeline/Pipeline.ts";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {ExecuteStrategy} from "./ExecuteStrategy.ts";


/**
 * The Context class defines the context needed for executing any given strategy.
 * It sets the structure for the model or strategy being used for the specific
 * request coming from the client. The constructor sets up the state object that
 * saves the state of the current context. In addition, the setStrategy and
 * executeStrategy methods are bound to the Context object to handle requests
 * from the client and the execution of the selected strategy.
 */
export class Context<T extends IStrategy> implements IContext<T> {
  /**
   * Saves the state of the strategy selected.
   */
  state: { [key: string]: string|boolean|RegExp|object|never|JSON|IContext<T>|Pipeline<T>|PipelineHandler<T>|IStrategy<T>|T};
  pipeline: Pipeline<T>;
  protected constructor() {
    this.pipeline = <T>SingletonPipeline.getInstance();
    this.setStrategy = this.setStrategy.bind(this);
    this.execute = this.execute.bind(this);

  }
  /**
   * The setStrategy method is used to assign the correct model or
   * strategy based off of the parameters given by the client.
   * @param {IStrategy} strategy
   */
  // eslint-disable-next-line class-methods-use-this
  setStrategy(strategy: ExecuteStrategy<T>): void {
    try {
      this.pipeline.addHandler(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        new PipelineHandler<ExecuteStrategy<T>>(
          strategy
        )
      );
      for (const handler of this.pipeline.handlers) {
        console.log(handler);
      }
    } catch (e) {
      console.error(e.message);
      e.stackTrace;
    }
  }

  /**
   * The executeStrategy method is used to execute the given strategy or model and return
   * the response. It determines which transport protocol should be used by checking if a
   * prompt is larger than 256 bytes and if the strategy supports both normal strategies and
   * stream strategies. If neither of these rules are met, then an error is thrown detailing
   * a type definition error.
   * @param {{ prompt: string, layman: false }} options
   * @param {{element: Element}} streamOptions the element to update with the incoming stream data
   * @return {Promise<string | JSON | JSX.Element | JSX.Element[] | HTMLElement | void >}
   */
  async execute(options: { prompt: string; layman: false }, streamOptions?: {element: HTMLElement}): Output<T> {
    /*
    * This is our selection mechanism used for executing the strategy.
    * The strategy will be executed in the following order:
    * 1. If the strategy selected is an instanceof {IStreamStrategy}, then the {IStreamStrategy} will be executed.
    * 2. If the strategy selected is an instanceof {IDefaultStrategy}, then the standard {IDefaultStrategy} will be executed.
    * 3. If no strategy is selected then by default: we throw an error. There was a selection error and this
    *    is not a valid strategy.
    */
    try {
      console.log("Executing strategy: " + options.prompt);
      // Get the strategy to be executed from the pipeline handler execute function.
      const strategy = this.pipeline.execute({options,streamOptions});
      console.dir(strategy);
      return strategy;

    } catch (e) {
      console.error(e.message);
      e.stackTrace;
    }
    
  }
}

