// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Gpt3 } from "./AIModels/Language/Gpt3.ts";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Context } from "./Context.ts";
// // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// // @ts-ignore
// import { IContext } from "./IContext.ts";
import { Alpha } from "./AIModels/Computational/Alpha.ts";
import {Yolo} from "./AIModels/ObjectDetection/Yolo.ts";
// import {wait} from "@testing-library/user-event/dist/utils";

/**
 * Client Strategy is used to dynamically select an AI model based on the
 * current context of the prompt.
 */
class ClientStrategy {
  // context: IContext;
  constructor() {
    this.context = this.#getContext();
  }

  /**
   * Gets the contexts based on modal type
   * @return {IContext} the subclass strategy context selection. The use of
   * context in this sense means that the strategy can be used in different contexts.
   * @private
   */
  // eslint-disable-next-line class-methods-use-this
  #getContext() {
    return new Context();
  }

  /**
   * Retrieves and creates the requested strategy by name within the Strategy Factory hierarchy.
   * @param {string} type the string name of the strategy to be implemented.
   * @return {IContext} the new client strategy context selected
   */
  async createClient(type) {
    switch (type) {
    case "openai" || "OpenAI" || /gpt3/ || /Gpt3/:
      this.context.setStrategy(new Gpt3());
      return this.context;
    case "alpha" || "Alpha" || /alpha/ || /Alpha/:
      this.context.setStrategy(new Alpha());
      return this.context;
    case "yolo" || "Yolo" || /yolo/ || /Yolo/:
      this.context.setStrategy(new Yolo());
      return this.context;
    default: // TODO(you have to create a more comprehensive default protocol)
      console.log("Strategy unable to fulfill request.");
    }
  }
}

export { ClientStrategy };

