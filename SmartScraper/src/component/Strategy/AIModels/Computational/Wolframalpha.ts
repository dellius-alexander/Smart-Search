// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {IStrategy} from "../../IStrategy.ts";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {uuid} from "../../UUID.ts";

/**
 * The Wolframalpha class implements the IStrategy interface which
 * allows it to be used as a strategy for computation. It stores state
 * information including a unique identifier (uuid), a name, a type
 * (computation model), version, a description, and protocols which
 * can be either a string, boolean or regular expression. Upon initialization,
 * the class generates a unique identifier based on the 'alpha' and
 * 'computational_model' strings, sets the name to 'alpha', type to
 * 'computational_model', model to 'Alphav1', version to '1.0',
 * description to 'WolframAlpha computation model.', and the URL
 * to an empty string. The protocols are predetermined to be true.
 */
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
