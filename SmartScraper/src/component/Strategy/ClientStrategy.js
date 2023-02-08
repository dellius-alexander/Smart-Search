import { Wolframalpha } from "./AIModels/Computational/Wolframalpha.ts";
import { Yolo } from "./AIModels/ObjectDetection/Yolo.ts";
import { Gpt3 } from "./AIModels/Language/Gpt3.ts";
import Context from "./Context.ts";

/**
 * Client Strategy is used to dynamically select an AI model based on the
 * current context of the prompt.
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
      this.context.setStrategy(new Gpt3());
      return this.context;
    case "alpha" || "Alpha" || /alpha/ || /Wolframalpha/:
      this.context.setStrategy(new Wolframalpha());
      return this.context;
    case "yolo" || "Yolo" || /yolo/ || /Yolo/:
      this.context.setStrategy(new Yolo());
      return this.context;
    default: // TODO(you have to create a more comprehensive default protocols)
      console.log("Strategy unable to fulfill request.");
    }
  }
}

