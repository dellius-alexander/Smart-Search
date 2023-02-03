// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {Gpt3} from "./AIModels/OpenAI/Gpt3.ts";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {Context} from "./Context";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {IContext} from "./IContext.ts";


class ClientStrategy {
  context: IContext;
  constructor() {
    this.context = this.#getContext();
  }

  /**
   * Gets the contexts based on modal type
   * @private
   */
  // eslint-disable-next-line class-methods-use-this
  #getContext(){
    return new Context();
  }

  /**
   * Retrieves and creates the requested subclass by name within the AIModels Factory hierarchy.
   * @param {string} type the string name of the subclass within the AIModels Factory
   * you wish to retrieve
   * @return {Strategy} a subclass of the AIModels Factory hierarchy set of classes
   */
  create(type: string) {
    switch (type) {
    case "openai" || "OpenAI" || /gpt3/ || /Gpt3/:
      this.context.setStrategy(new Gpt3({}));
      return this.context;
    default: // TODO(you have to create a more comprehensive default protocol)
      console.log("Strategy unable to fulfill request.");
    }
  }
}

export {ClientStrategy};