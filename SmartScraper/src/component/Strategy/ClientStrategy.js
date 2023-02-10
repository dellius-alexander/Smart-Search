import { Wolframalpha } from "./AIModels/Computational/Wolframalpha.ts";
import { Yolo } from "./AIModels/ObjectDetection/Yolo.ts";
import { Gpt3 } from "./AIModels/Language/Gpt3.ts";
import { Context } from "./Context.ts";
import { ExecuteStrategy } from "./ExecuteStrategy.ts";
import {IStrategy} from "./IStrategy.ts";

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
    // console.dir(this);
  }

  /**
   * Retrieves and creates the requested strategy by name within the Strategy Factory hierarchy.
   * @param {string} type the string name of the strategy to be implemented.
   * @return {IContext} the new client strategy context selected
   */
  async createClient(type) {
    // console.log("Creating client strategy: " + type);
    switch (type) {
    case type.match(/openai|gpt3/i)[0]:
      // console.log("Creating GPT3 client strategy");
      // eslint-disable-next-line no-case-declarations
      const gpt3: IStrategy = new Gpt3();
      // console.log(gpt3);
      // eslint-disable-next-line no-case-declarations
      const gpt3Executor = new ExecuteStrategy(gpt3);
      // console.log(gpt3Executor);
      this.context.setStrategy(gpt3Executor);
      return this.context;
    case type.match(/alpha|wolframalpha/i)[0]:
      // eslint-disable-next-line no-case-declarations
      const wolf: IStrategy = new Wolframalpha();
      // eslint-disable-next-line no-case-declarations
      const wolfExecutor = new ExecuteStrategy(wolf);
      this.context.setStrategy(wolfExecutor);
      return this.context;
    case type.match(/yolo|yolo/i)[0]:
      // eslint-disable-next-line no-case-declarations
      const yolo: IStrategy = new Yolo();
      // eslint-disable-next-line no-case-declarations
      const yoloExecutor = new ExecuteStrategy(yolo);
      this.context.setStrategy(yoloExecutor);
      return this.context;
    default: // TODO(you have to create a more comprehensive default protocols)
      // console.log("Strategy unable to fulfill request.");
    }
  }
}

