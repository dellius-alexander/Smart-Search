import parse from "html-react-parser";
import { Strategy } from "../Strategy";

class Gpt3 implements Strategy {
  props: object;
  // state schema
  state: {
    id: string,
    url: string,
    // type maps to "object" in response
    type: string,
    created: number,
    model: string,
    jsonData: {
      text: string,
      index: number,
      logprobs: object,
      finish_reason: string
    },
    usage: {
      prompt_tokens: number,
      completion_tokens: number,
      total_tokens: number
    }
    error: boolean;
    errorMessage: string;
    };

  constructor(props) {
    this.props = props;
    this.state = {
      id: "",
      url: "https://api.openai.com/v1/completions",
      // type maps to "object" in response
      type: "",
      created: 0,
      model: "text-davinci-003",
      jsonData: null,
      usage: null,
      error: false,
      errorMessage: "",
    };
  }

  /**
     * Send a request to Gpt3 API endpoints
     * @param {{prompt: null, layman: false}} options
     * @returns  {string|JSON} JSX element(s), empty array, or string.
     */
  async sendRequest(options: { prompt: null; layman: false }) : Promise<string | void | JSX.Element | JSX.Element[]>  {
    /**
     * Get the contents of the options variable
     */
    const { prompt, layman } = options;
    const { url } = this.state;
    try {
      if (prompt) {
        console.log("Attempting to send request......");
        return await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            prompt: `{"prompt":"${prompt}","instructions":["Talk to me like a 6 year old":"${layman}","Send response inside embedded div tag, do not include html tag in response."]}`,
            temperature: 0.8,
            max_tokens: 256,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
            stream: false,
            model: "text-davinci-003",
            logprobs: null,
          }),
        })
          .then((response) => response.json())
          .then((rawData) => {
            this.state.jsonData = rawData.choices[0];
            return parse(this.state.jsonData.text);
          })
          .catch(console.dir);
      }
    } catch (error) {
      this.state.error = true;
      this.state.errorMessage = error.message;
    }
  }
}

export { Gpt3 };

