import { Wolframalpha } from "./AIModels/Computational/Wolframalpha.ts";
import { Yolo } from "./AIModels/ObjectDetection/Yolo.ts";
import { Gpt3 } from "./AIModels/Language/Gpt3.ts";
import { Context } from "./Context.ts";
import { ExecuteStrategy } from "./ExecuteStrategy.ts";
import { IContext } from "./IContext.ts";

/**
 * This class defines the ClientStrategy object which provides a framework
 * for model selection. When `createContext()` is called, it evaluates the name
 * of the strategy and creates a corresponding Context instance which is set to
 * use the specific requested strategy. Depending on the name of the strategy
 * argument, it could either create a Context instance that is set to use
 * ExecuteStrategy initialized with any model class. The Context instance
 * will be in charge of execution of our strategy. If an invalid name is given
 * as an argument, it will log a message indicating that the requested strategy
 * is unable to fulfill the request.
 */
export class ClientStrategy {
  context: IContext<IStrategy> = new Context();
  /**
   * Creates the contexts needed for model selection.
   */
  constructor() {
    console.log(this.context);
  }

  /**
   * Retrieves and creates the requested strategy by name within the IDefaultStrategy Factory hierarchy.
   * @param {string} type the string name of the strategy to be implemented.
   * @return {IContext} the new client strategy context selected
   */
  async createContext(type: string): IContext {
    // console.log("Creating client strategy: " + type);
    switch (type) {
    case type.match(/openai|gpt3/i)[0]:
      this.context.setStrategy(new ExecuteStrategy(new Gpt3()));
      return this.context;
    case type.match(/alpha|wolframalpha/i)[0]:
      this.context.setStrategy(new ExecuteStrategy(new Wolframalpha()));
      return this.context;
    case type.match(/yolo|Yolo/i)[0]:
      this.context.setStrategy(new ExecuteStrategy(new Yolo()));
      return this.context;
    default: // TODO(you have to create a more comprehensive default protocols)
      console.log("IDefaultStrategy unable to fulfill request.");
    }
  }
}
