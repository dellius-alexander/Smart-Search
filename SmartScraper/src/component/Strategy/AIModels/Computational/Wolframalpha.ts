// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {IStrategy} from "../../IStrategy.ts";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {uuid} from "../../UUID.ts";

class Wolframalpha implements IStrategy {
  state: {
    uuid: string,
    name: string,
    type: string,
    model: string,
    version: string,
    description: string,
    protocols: { [key: string]: string|boolean|RegExp},
    url: string
  };
  constructor() {
    this.state = {
      uuid: uuid("alpha","computational_model"),
      name : "alpha",
      type: "computational_model",
      model: "Alphav1",
      version: "1.0",
      description: "WolframAlpha computation model.",
      protocols: {
        "strategy": true
      },
      url: "",
    };
  }

}

export {Wolframalpha};
