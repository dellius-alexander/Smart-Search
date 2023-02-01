import parse from "html-react-parser";
import { AIFactory } from "../AIFactory";

class Gpt3 implements AIFactory {
  state: {
        props: never,
        error: boolean;
        errorMessage: string;
    };

  constructor(options) {


    this.state = {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      props: options,
      error: false,
      errorMessage: "",
    };
  }

  /**
     * Send a request to Gpt3 API endpoints
     * @param {{prompt: null, layman: false}} options
     * @returns  {string|JSON} JSX element(s), empty array, or string.
     */
  async sendRequest(options: { prompt: null; layman: false } = {
    prompt: null,
    layman: false,
  }) : Promise<string | void | JSX.Element | JSX.Element[]>  {
    /**
     * Get the contents of the options variable
     */
    const { prompt, layman } = options;
    try {
      if (prompt) {
        console.log("Attempting to send request......");
        return await fetch("https://api.openai.com/v1/completions", {
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
            const data = rawData.choices[0].text;
            return parse(data);
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

