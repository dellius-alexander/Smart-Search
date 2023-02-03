import {Strategy} from "./AIModels/Strategy.ts";
import {IContext} from "./IContext.ts";


/**
 * Implementation of the Context class defines the context of the strategy
 * to bo used prior to execution of said strategy. For example if an image model
 * is needed to fulfill the client strategy request, then setStrategy will
 * be used to assign the correct modal strategy.
 */
class Context implements IContext {
  strategy: Strategy;

  /**
   * Sets the model strategy to be used during execution.
   * @param {Strategy} strategy
   */
  setStrategy(strategy: Strategy) {
    this.strategy = strategy;
  }

  /**
   * Executes the given model strategy based on the client strategy previously set.
   * @param {{ prompt: null; layman: false }} options
   * @return {Promise<T | void>}
   */
  executeStrategy(options: { prompt: null; layman: false }): JSON {
    return this.strategy.sendRequest(options).then(r => r).catch(console.dir);
  }
}

export {Context};
