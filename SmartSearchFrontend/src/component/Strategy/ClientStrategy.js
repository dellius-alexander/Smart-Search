import { Wolframalpha } from "./AIModels/Computational/Wolframalpha.ts";
import { Yolo } from "./AIModels/ObjectDetection/Yolo.ts";
import { Gpt3 } from "./AIModels/Language/Gpt3.ts";
import { Context } from "./Context.ts";
import { ExecuteStrategy } from "./ExecuteStrategy.ts";
import { IContext } from "./IContext.ts";
import { Input, Output } from "./Pipeline/Pipeline.ts";
import { IStrategy } from "./IStrategy.ts";

/**
 * This class defines the ClientStrategy object which provides a framework
 * for model selection. When `createContext()` is called, it evaluates the name
 * of the strategy and creates a corresponding Context instance which is set to
 * use the specific requested strategy. Depending on the name of the strategy
 * argument, it could either create a Context instance that is set to use
 * AExecuteStrategy initialized with any model class. The Context instance
 * will be in charge of execution of our strategy. If an invalid name is given
 * as an argument, it will log a message indicating that the requested strategy
 * is unable to fulfill the request.
 */
export class ClientStrategy {
  context: IContext<IStrategy>;
  /**
   * Creates the contexts needed for model selection.
   */
  constructor() {
    this.context = new Context();
    this.createContext = this.createContext.bind(this);
    this.execute = this.execute.bind(this);
    this.createContext("openai");
    // this.createContext("alpha");
    console.log(this);
  }

  /**
   * Retrieves and creates the requested strategy by name within the
   * IDefaultStrategy Factory hierarchy.
   * @param {string} type the string name of the strategy to be implemented.
   * @return {IContext} the new client strategy context selected
   */
  createContext(type): void{
    console.log("Creating client strategy: " + type);
    let strategy;
    switch (true) {
    case type.search(/openai|gpt3/g) > -1:
      console.log("Creating GPT3 context.........................");
      // eslint-disable-next-line no-case-declarations
      strategy = new ExecuteStrategy(new Gpt3());
      console.dir(strategy);
      this.context.setStrategy(strategy);
      break;
    case type.search(/alpha|wolframalpha/g) > -1:
      console.log("Creating Wolframalpha context.........................");
      // eslint-disable-next-line no-case-declarations
      strategy = new ExecuteStrategy(new Wolframalpha());
      console.dir(strategy);
      this.context.setStrategy(strategy);
      break;
    case type.search(/yolo|Yolo/g) > -1:
      onsole.log("Creating Yolo Neural context.........................");
      // eslint-disable-next-line no-case-declarations
      strategy = new ExecuteStrategy(new Yolo());
      console.dir(strategy);
      this.context.setStrategy(strategy);
      break;
    default: // TODO(you have to create a more comprehensive default protocols)
      console.log("IDefaultStrategy unable to fulfill request.");
    }
    console.dir(this.context);
  }

  /**
   * Executes the requested strategy.
   * @param {Input<T>} input
   * @return {Output<T>}
   */
  async execute(input: Input): Output {
    console.dir(input);
    return this.context.execute(input);
  }


}
