// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { IStrategy } from "../../IStrategy.ts";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { uuid } from "../../UUID.ts";


/**
 * Initialize GPT-3 to make api calls
 * @param {prompt: string, layman: boolean, url: string, model: string}} props
 */
class Gpt3 implements IStrategy{

  // state schema
  state: {
    uuid: string,
    name: string,
    version: string,
    description: string,
    protocols: { [key: string]: string|boolean|RegExp},
    url: string,
    // type maps to "object" in response
    type: string,
    model: string,
    };

  /**
   * Initialize GPT-3 to make api calls
   */
  constructor() {
    this.state = {
      uuid: uuid("text-davinci-003","language_text_completion_model"),
      name: "gpt3",
      version: "1.0",
      description: "Chat-GPT-3 'text-davinci-003' model.",
      protocols: {
        "strategy": true,
        "stream-strategy": true
      },
      url: "https://api.openai.com/v1/completions",
      // type maps to "object" in response
      type: "text_completion",
      model: "text-davinci-003",
    };
  }
}

export { Gpt3 };

