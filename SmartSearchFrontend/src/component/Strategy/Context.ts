// // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// // @ts-ignore
// import { IContext } from "./IContext.ts";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {PipelineHandler} from "./Pipeline/PipelineHandler.ts";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {Pipeline} from "./Pipeline/Pipeline.ts";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {Input, Output} from "./Pipeline/IHandler.ts";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {SingletonPipeline} from "./Pipeline/SingletonPipeline.ts";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {IContext} from "./IContext.ts";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {IStrategy} from "./IStrategy.ts";


/**
 * The Context class defines the context needed for executing any given strategy.
 * It sets the structure for the model or strategy being used for the specific
 * request coming from the client. The constructor sets up the state object that
 * saves the state of the current context. In addition, the setStrategy and
 * execute methods are bound to the Context object to handle requests
 * from the client and the execution of the selected strategy.
 */
export class Context<T> implements IContext<T> {
  /**
   * Saves the state of the pipeline
   */
  pipeline: Pipeline<T>;

  protected constructor() {
    this.pipeline = <T>SingletonPipeline.getInstance();
    this.setStrategy = this.setStrategy.bind(this);
    this.execute = this.execute.bind(this);
    console.dir(this);

  }

  /**
   * This method is used to assign a strategy to the pipeline for the current
   * context. The strategy can be a class or an object that implements
   * the {@link ExecuteStrategy} class used in this case to execute
   * a strategy. The strategy is passed as a parameter to the {@link ExecuteStrategy}
   * class constructor.
   * @param {IStrategy<T>} strategy
   */
  setStrategy(strategy: IStrategy<T>): void {
    console.dir(strategy);
    try {
      const handler = new PipelineHandler<IStrategy<T>>(strategy);
      this.pipeline.addHandler(handler);
      for (const handler of this.pipeline.handlers) {
        console.log(handler);
      }
    } catch (e) {
      console.error(e.message);
      e.stackTrace;
    }
  }

  /**
   * Executes the requested strategy.
   * @param {Input<T>} input
   * @return {Output<T>}
   */
  async execute(input: Input<T>): Promise<[Output<T>]> {
    try {
      console.log("Executing strategy in the pipeline for options: " );
      console.dir(input);
      // Send the prompt and streamOptions to be executed within the pipeline. A handler will be selected
      // within the pipeline to handle the request.
      return await this.pipeline.execute(input);
    } catch (e) {
      console.error(e.message);
      e.stackTrace;
    }
    
  }
}

