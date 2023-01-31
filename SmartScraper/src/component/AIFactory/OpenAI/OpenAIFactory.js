import { OpenAI } from "./OpenAI";
/* create a factory class to create the OpenAi class */
class OpenAiFactory {
  constructor(event, prompt, layman = false, modelOptions = {model: ""}) {
    this.event = event;
    this.prompt = prompt;
    this.layman = layman;
    this.modelOptions = modelOptions;
  }
  createOpenAi() {
    return new OpenAI(this.event, this.prompt, this.layman, this.modelOptions);
  }
}

export {OpenAiFactory};