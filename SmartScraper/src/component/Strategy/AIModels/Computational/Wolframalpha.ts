// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {Strategy} from "../../Strategy.ts";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {uuid} from "../../UUID.ts";

class Wolframalpha implements Strategy {
  state: {
    uuid: string,
    name: string,
    type: string,
    model: string,
    version: string,
    description: string,
    prompt: string,
    layman: boolean,
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
      prompt: "What is your name?",
      layman: false,
      protocols: {
        ["strategy"]: true
      },
      url: "",
    };
  }

  sendRequest(options: { prompt: string, layman: false }):
      Promise<string | JSON | ReadableStream<object> | JSX.Element | JSX.Element[] | HTMLElement | void> {
    this.state.prompt = options.prompt;
    this.state.layman = options.layman;
    return Promise.resolve(undefined);
  }
}

export {Wolframalpha};
