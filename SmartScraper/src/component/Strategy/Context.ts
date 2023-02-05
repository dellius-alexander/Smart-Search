// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { IContext } from "./IContext.ts";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { IStrategy } from "./IStrategy.ts";

/**
 * Implementation of the Context class defines the context of the strategy
 * to bo used prior to execution of said strategy. For example if an image model
 * is needed to fulfill the client strategy request, then setStrategy will
 * be used to assign the correct modal strategy.
 */
class Context implements IContext {
  private _strategy: IStrategy;

  /**
   * Sets the model strategy to be used during execution.
   * @param {IStrategy} strategy
   */
  setStrategy(strategy: IStrategy): void {
    this._strategy = strategy;
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
    // send large prompts as a stream
    if (options && options.prompt.length > 256){
      return await this._strategy
        .streamRequest(options, streamOptions)
        .then((data) => data)
        .catch(console.dir);
    } else { // otherwise send as regular chunk
      return this._strategy.sendRequest(options)
        .then((data) => data)
        .catch(console.dir);
    }
  }
}

export {Context};
