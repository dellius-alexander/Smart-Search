import {Strategy} from "../../Strategy";

class Alpha implements Strategy {
  state: {
    id: string,
    version: string,
    description: string,
    name: string,
    prompt: string,
    layman: boolean
  };
  constructor() {
    this.state = {
      id: "",
      version: "1.0",
      description: "WolframAlpha computation model.",
      name : "Alpha",
      prompt: "What is your name?",
      layman: false
    };
  }

  sendRequest(options: { prompt: string, layman: false }): Promise<string | JSON | ReadableStream<object> | JSX.Element | JSX.Element[] | HTMLElement | void> {
    this.state.prompt = options.prompt;
    this.state.layman = options.layman;
    return Promise.resolve(undefined);
  }
}

export {Alpha};