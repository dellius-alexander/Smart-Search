// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { IContext } from "./IContext.ts";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {IStrategy} from "./IStrategy.ts";

/**
 * Implementation of the Context class defines the context of the strategy
 * to bo used prior to execution of said strategy. For example if an image model
 * is needed to fulfill the client strategy request, then setStrategy will
 * be used to assign the correct modal strategy.
 */
class Context implements IContext {
  /**
   * Saves the state the context of the strategy selected.
   */
  state: { [key: string]: string|boolean|object|RegExp|IStrategy|IContext|[key: string|boolean]};

  constructor() {
    this.state = {};
    this.setStrategy = this.setStrategy.bind(this);
    this.executeStrategy = this.executeStrategy.bind(this);
  }
  /**
   * Sets the model strategy to be used during execution.
   * @param {IStrategy} strategy
   */
  setStrategy(strategy: IStrategy): void {
    try {
      console.dir(strategy);
      this.state["strategy"] = strategy;
      this.state["uuid"] = strategy.state.uuid;
      this.state["name"] = strategy.state.name;
      this.state["type"] = strategy.state.type;
      this.state["model"] = strategy.state.model;
      this.state["protocols"] = {
        strategy : !!strategy.state.protocols["strategy"],
        streamStrategy: !!strategy.state.protocols["stream-strategy"]
      };
    } catch (e) {
      console.error(e.message);
      e.stackTrace;
    }
  }

  /**
   * This function executes a strategy and returns the response.
   * Executes the given model strategy based on the client strategy previously set.
   * @param {{ prompt: string, layman: false }} options
   * @param {{element: Element}} streamOptions the element to update with the incoming stream data
   * @return {Promise<string | JSON | JSX.Element | JSX.Element[] | HTMLElement | void >}
   */
  async executeStrategy(options: { prompt: string; layman: false }, streamOptions?: {element: Element}):
      Promise<string | JSON | ReadableStream<object> | JSX.Element | JSX.Element[] | HTMLElement | void> {
    /*
    * This is our selection mechanism used for executing the strategy.
    * The strategy will be executed in the following order:
    * 1. If the strategy selected is an instanceof {StreamStrategy}, then the {StreamStrategy} will be executed.
    * 2. If the strategy selected is an instanceof {Strategy}, then the standard {Strategy} will be executed.
    * 3. If no strategy is selected then by default: we throw an error. There was a selection error and this
    *    is not a valid strategy.
    */
    try {
      console.log(this.state);
      switch (true) {
      // send large prompts > 256 bytes, using StreamStrategy transport protocols
      case (options && this.state["protocols"]["stream-strategy"]) && options.prompt.length > 256:
        return (
          await this.state["strategy"]
            .streamRequest(options, streamOptions)
            .then((data: never) => data)
            .catch(console.dir)
        );
        // send normal prompts < 256 bytes, using normal Strategy transport protocols
      case (options && this.state["protocols"]["strategy"]):
        return( 
          await this.state["strategy"]
            .sendRequest(options)
            .then((data: never) => data)
            .catch(console.dir)
        );
      default:
        throw Error(
          "Their was an error attempting to execute the selected strategy.\n" +
            "Their could be a type selection error. Please check your options.\n" +
            "This could be due to the selection process within {ClientStrategy}.\n" +
            "The type provided was incorrectly defined. This could be a type definition error.\n"
        );
      }
    } catch (e) {
      console.error(e.message);
      console.dir(this.state);
      e.stackTrace;
    }
    
  }
}
export {Context};