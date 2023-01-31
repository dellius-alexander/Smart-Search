import { OpenAI } from "./OpenAI/OpenAI";

class AIFactory extends Object {

  static create(type) {
    switch (type) {
    case "openai" || "OpenAI":
      return new OpenAI();
    default:
      console.log("Factory unable to fulfill request.");
    }
  }
}

export { AIFactory };
