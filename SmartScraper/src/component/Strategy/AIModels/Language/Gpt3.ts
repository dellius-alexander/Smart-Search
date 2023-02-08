// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Strategy } from "../../Strategy.ts";
import parse from "html-react-parser";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {StreamStrategy} from "../../StreamStrategy.ts";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {uuid} from "../../UUID.ts";


/**
 * Initialize GPT-3 to make api calls
 * @param {prompt: string, layman: boolean, url: string, model: string}} props
 */
class Gpt3 implements Strategy, StreamStrategy {

  // state schema
  state: {
    uuid: string,
    name: string,
    version: string,
    description: string,
    prompt: string,
    layman: boolean,
    protocols: { [key: string]: string|boolean|RegExp},
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
    },
    error: boolean;
    errorMessage: string;
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
      prompt: "",
      layman: false,
      protocols: {
        "strategy": true,
        "stream-strategy": true
      },
      url: "https://api.openai.com/v1/completions",
      // type maps to "object" in response
      type: "text_completion",
      created: 0,
      model: "text-davinci-003",
      jsonData: null,
      usage: null,
      error: false,
      errorMessage: "",
    };
    this.sendRequest = this.sendRequest.bind(this);
    this.streamRequest = this.streamRequest.bind(this);
  }

  /**
     * Send a request to Gpt3 API endpoints
     * @param {{prompt: string, layman: false}} options
     * @returns  {string|JSON} JSX element(s), empty array, or string.
     */
  async sendRequest(options: { prompt: string; layman: false } ) :
      Promise<string | JSON | JSX.Element | JSX.Element[] | HTMLElement | void >  {
    // await wait(3000);
    /**
     * Get the contents of the options variable
     */
    const { url, model } = this.state;
    const prompt = options.prompt || this.state.prompt;
    const layman = options.layman || this.state.layman;


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
            temperature: 0.9,
            max_tokens: 2048,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
            stream: false,
            model: model,
            logprobs: null,
          }),
        })
          .then((response) => response.json())
          .then((jsonData) => {
            this.state.jsonData = jsonData.choices[0];
            return parse(this.state.jsonData.text);
          })
          .catch(console.dir);
      }
    } catch (error) {
      this.state.error = true;
      this.state.errorMessage = error.message;
    }
  }
  /**
   * Send a request to Gpt3 API endpoints
   * @param {{prompt: string, layman: false}} options
   * @param {{element: Element}} streamOptions?
   * @returns  {string|JSON} JSX element(s), empty array, or string.
   */
  async streamRequest(options: { prompt: string; layman: false }, streamOptions?: { element: Element }) :
      Promise<string | JSON | ReadableStream<object> | JSX.Element | JSX.Element[] | HTMLElement | void>  {
    if (streamOptions == null || streamOptions.element == null) {
      console.warn("StreamOptions is undefined or null.");
    }
    /**
     * Get the contents of the options variable
     */
    const { url, model } = this.state;
    const prompt = options.prompt || this.state.prompt;
    const layman = options.layman || this.state.layman;

    try {
      if (prompt) {

        console.log("Attempting to send request......");

        // send the stream to the api server
        return  await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            frequency_penalty: 0,
            logprobs: null,
            max_tokens: 2048,
            model: model,
            presence_penalty: 0,
            prompt: `{"prompt":"${prompt}","instructions":["Talk to me like a 6 year old":"${layman}","Send response using HTML5"]}`,
            stream: false,
            temperature: 0.9,
            top_p: 1,
          }),
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          duplex: "half"
        })
          .then(async (response) => {
            const reader = response.body.getReader();
            return new ReadableStream({
              start(controller) {
                return pump();
                function pump(): Promise<ReadableStreamReadResult<Uint8Array> | void>{
                  return reader
                    .read()
                    .then(({ done, value }) => {
                    // when no more data needs to be consumed, close the stream
                      if (done || value === null || value === undefined){
                        controller.close();
                        return;
                      }
                      // Enqueue the next data chunk into our target stream
                      controller.enqueue(value);
                      return pump();
                    })
                    .catch((err) => console.error(err));
                }
              }
            });
          })
          .then((stream) => new Response(stream))
          .then((response) => response.json())
          .then((jsonResponseData) => {
            this.state.type = jsonResponseData.object;
            this.state.created = jsonResponseData.created;
            this.state.model = jsonResponseData.model;
            this.state.jsonData = jsonResponseData.choices[0];
            this.state.usage = jsonResponseData.usage;
            return parse(this.state.jsonData.text.replace("\\n", "<br>"));
          })
          .then((data) => data)
          .catch(console.dir);
      }
    } catch (error) {
      this.state.error = true;
      this.state.errorMessage = error.message;
    }
  }
}

export { Gpt3 };

