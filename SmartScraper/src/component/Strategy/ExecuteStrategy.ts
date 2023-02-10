import parse from "html-react-parser";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {Strategy} from "./Strategy.ts";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {IStrategy} from "./IStrategy.ts";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {StreamStrategy} from "./StreamStrategy.ts";
// import {uuid} from './UUID';

/**
 * This ExecuteStrategy class provides a way to send an API request to an AI strategy
 * and receive a response. It implements the mandatory functions for sending a request,
 * such as setting the prompt and layman options, as well as streaming requets, allowing
 * for more complex interactions. It also stores server responses in the form of JSON
 * data and includes error handling logic in case of failure to make a request.
 * Additionally, it keeps track of usage metrics such as prompt tokens, completion
 * tokens, and total tokens.
 */
export class ExecuteStrategy<T extends IStrategy> implements Strategy, StreamStrategy {
  state: {
    uuid: string,
    name: string,
    type: string,
    model: string,
    version: string,
    description: string,
    protocols: { [key: string]: string|boolean|RegExp},
    prompt: string,
    layman: boolean,
    url: string,
    created: number,
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

  constructor(strategy: T) {
    this.state = strategy.state;
    this.sendRequest = this.sendRequest.bind(this);
    this.streamRequest = this.streamRequest.bind(this);
  }
  /**
  * The sendRequest function sends an asynchronous request with the provided
  * 'options' object. The object requires a prompt and a boolean value to determine
  * whether to speak to the user like a layman. The request is sent with a header
  * containing an authorization token, a body containing the options, and a model
  * to determine the response. If the response is successful, it will be parsed
  * and stored in the state jsonData. If the request fails, an error message will
  * be stored in the state field 'errorMessage'.
  * @param {{prompt: string, layman: false}} options
  * @returns  {{Promise<string | JSON | JSX.Element | JSX.Element[] | HTMLElement | void >}}
  */
  async sendRequest(options: { prompt: string; layman: false } ) :
        Promise<string | JSON | JSX.Element | JSX.Element[] | HTMLElement | void >
  {
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
  * The streamRequest function sends an asynchronous request to an API server based on the
  * provided options. It takes in an options argument containing a prompt and a
  * layman preference, as well as an optional streamOptions argument with an element
  * property. If streamOptions is undefined or null, a warning is logged. It then
  * creates an object with the passed options and a few additional parameters, and
  * sends that object to the API server via a fetch call. If the request succeeds,
  * it returns a readable stream object populated with the response data, which
  * can be parsed as either strings or JSONs, JSX.Element/JSX.Element[]/HTMLElement,
  * or a void return value. The type, created, model, and jsonData properties are
  * all updated in the caller's state.
  * @param {{prompt: string, layman: false}} options
  * @param {{element: Element}} streamOptions?
  * @returns  {{Promise<string | JSON | ReadableStream<object> | JSX.Element | JSX.Element[] | HTMLElement | void>}} JSX element(s), empty array, or string.
  */
  async streamRequest(options: { prompt: string; layman: false }, streamOptions?: { element: Element }) :
        Promise<string | JSON | ReadableStream<object> | JSX.Element | JSX.Element[] | HTMLElement | void>
  {
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
            return parse(this.state.jsonData.text.replace("\n", "<br>"));
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