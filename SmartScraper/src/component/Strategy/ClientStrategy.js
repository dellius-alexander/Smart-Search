import { Wolframalpha } from "./AIModels/Computational/Wolframalpha.ts";
import { Yolo } from "./AIModels/ObjectDetection/Yolo.ts";
import { Gpt3 } from "./AIModels/Language/Gpt3.ts";
import { Context } from "./Context.ts";
import { ExecuteStrategy } from "./ExecuteStrategy.ts";

/**
 * This class defines the ClientStrategy object which provides a framework
 * for model selection. When `createClient()` is called, it evaluates the name
 * of the strategy and creates a corresponding Context instance which is set to
 * use the specific requested strategy. Depending on the name of the strategy
 * argument, it could either create a Context instance that is set to use
 * ExecuteStrategy initialized with any model class. The Context instance
 * will be in charge of execution of our strategy. If an invalid name is given
 * as an argument, it will log a message indicating that the requested strategy
 * is unable to fulfill the request.
 */
export class ClientStrategy {
  /**
   * Creates the contexts needed for model selection.
   */
  constructor() {
    this.context = new Context();
  }

  /**
   * Retrieves and creates the requested strategy by name within the Strategy Factory hierarchy.
   * @param {string} type the string name of the strategy to be implemented.
   * @return {IContext} the new client strategy context selected
   */
  async createClient(type) {
    switch (type) {
    case "openai" || "OpenAI" || /gpt3/ || /Gpt3/:
      this.context.setStrategy(new ExecuteStrategy(new Gpt3()));
      return this.context;
    case "alpha" || "Alpha" || /alpha/ || /Wolframalpha/:
      this.context.setStrategy(new ExecuteStrategy(new Wolframalpha()));
      return this.context;
    case "yolo" || "Yolo" || /yolo/ || /Yolo/:
      this.context.setStrategy(new ExecuteStrategy(new Yolo()));
      return this.context;
    default: // TODO(you have to create a more comprehensive default protocols)
      console.log("Strategy unable to fulfill request.");
    }
  }
}

