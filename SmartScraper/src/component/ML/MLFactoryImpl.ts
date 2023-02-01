// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {AIFactory} from "./AI/AIFactory.ts";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {Gpt3}  from "./AI/OpenAI/Gpt3.ts";


/**
 * Implementation of the MLFactory class
 */
class MLFactoryImpl {
  static state = {
    openai: null
  };

  /**
     * Retrieves and creates the requested subclass by name within the AI Factory hierarchy.
     * @param {string} type the string name of the subclass within the AI Factory
     * you wish to retrieve
     * @return {AIFactory} a subclass of the AI Factory hierarchy set of classes
     */
  static create(type: string): AIFactory {
    switch (type) {
    case "openai" || "OpenAI":
      if (!MLFactoryImpl.state.openai){
        MLFactoryImpl.state.openai = new Gpt3({});
      }
      return MLFactoryImpl.state.openai;
    default:
      console.log("AIFactory unable to fulfill request.");
    }
  }

}

export { MLFactoryImpl };
