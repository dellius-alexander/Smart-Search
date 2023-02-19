// import parse from "html-react-parser";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {IDefaultStrategy} from "./IDefaultStrategy.ts";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {IStrategy} from "./IStrategy.ts";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {IStreamStrategy} from "./IStreamStrategy.ts";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Input, Output} from "./Pipeline/Pipeline.ts";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {IHandlerStrategy} from "./Pipeline/IHandlerStrategy.ts";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {IContext} from "./IContext.ts";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {TextCompletion} from "./TextCompletion.ts";

/**
 * This ExecuteStrategy class provides a way to send an API request to an AI strategy
 * and receive a response. It implements the mandatory functions for sending a request,
 * such as setting the prompt and layman options, as well as streaming requets, allowing
 * for more complex interactions. It also stores server responses in the form of JSON
 * data and includes error handling logic in case of failure to make a request.
 * Additionally, it keeps track of usage metrics such as prompt tokens, completion
 * tokens, and total tokens.
 */
export class ExecuteStrategy<T> implements IDefaultStrategy<T>, IStreamStrategy<T>, IHandlerStrategy<T> {
  /*
* Saves the state of the strategy selected.
*/
  state: { [key: string]: string|boolean|RegExp|object|never|JSON|IContext<T>|IStrategy<T>|T};
  static loopCount = 0;
  constructor(strategy: T) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.state = strategy.state;

    console.dir(this.state);
    this.sendRequest = this.sendRequest.bind(this);
    this.streamRequest = this.streamRequest.bind(this);
    this.handle = this.handle.bind(this);
    // console.log("Executing strategy: ", this.state.uuid);
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  async handle(input: Input<T>):  Output<T> {
    ExecuteStrategy.loopCount = 0;
    console.log(input);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line no-case-declarations
    const {options, streamOptions} = input;
    console.log(options);
    console.log(streamOptions);
    switch (true) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // send large prompts > 256 bytes, using IStreamStrategy transport protocols
    case (options && this.state["protocols"]["stream-strategy"]) && options.prompt.length > 256:
      return (
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
        await this.streamRequest(options, streamOptions)
          .then((data: never) => data)
          .catch(console.dir)
      );
      // send normal prompts < 256 bytes, using normal IDefaultStrategy transport protocols
    case (options && this.state["protocols"]["strategy"]):
      return(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
        await this.sendRequest(options, streamOptions)
          .then((data: never) => data)
          .catch(console.dir)
      );
    default:
      throw Error(
        "Their was an error attempting to execute the selected strategy.\n" +
          "Their could be a type selection error. Please check your options.\n" +
          "This could be due to the selection process within {ClientStrategy}.\n" +
          "The type provided was incorrectly defined. This could be a type definition error.\n"
      );
    }
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
   * @param {{ element: HTMLElement }} streamOptions
   * @returns  {{Promise<string | JSON | JSX.Element | JSX.Element[] | HTMLElement | void >}}
   */
  async sendRequest(options: { prompt: string; layman: boolean } = {prompt: "", layman: false}, streamOptions?: { element: HTMLElement } ): Output<T>
  {

    /**
     * Get the contents of the options variable
     */
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { url, model } = this.state;
    let prompt = "";
    const layman = options.layman || this.state.layman || false;
    if (layman){
      prompt = `<prompt>${options.prompt || this.state.prompt}</prompt>\n`;
    } else {
      prompt = `<prompt>${options.prompt || this.state.prompt}</prompt>\n`;
    }

    console.dir({
      prompt: prompt,
      layman: layman,
      state: this.state,
      apiKey: process.env.REACT_APP_OPENAI_API_KEY,
      orgId: process.env.REACT_APP_ORGANIZATION_ID,
      stream_options: streamOptions
    });

    try {
      if (prompt) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        let results = String("");
        const queuingStrategy = new CountQueuingStrategy({ highWaterMark: 1 });
        

        return await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
            "organizationId": `${process.env.REACT_APP_ORGANIZATION_ID}`,
          },
          body: JSON.stringify({
            logprobs: null,
            max_tokens: 256,
            model: model,
            temperature: 0.9,
            frequency_penalty: 0,
            presence_penalty: 0,
            prompt: prompt,
            stream: true,
            top_p: 1,
          }),
        })
        // read the response data in chunks and render to client in chunks
          .then(async (response) =>
            response.body
              .pipeThrough(new TextDecoderStream("utf-8"))
              .pipeThrough(await this.transformStreamToJSON())
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
              .pipeTo(new WritableStream({
                write: async function (json) {
                  console.dir(json);
                  if (json !== undefined && json.choices) {
                    // eslint-disable-next-line prefer-const
                    console.dir(json);
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-ignore
                    const text = json.choices[0].text;
                    streamOptions.element.append(text);
                    results += text;
                    ExecuteStrategy.wait(300);
                  }
                },
                abort(err) {
                  console.log("Sink error:", err);
                }
              },
              queuingStrategy))
              .then(() => results)  // Respond with our stream
              .catch(console.dir)
          )
          .then((html) => html)
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
  async streamRequest(options: { prompt: string; layman: false } = {prompt: "", layman: false} , streamOptions?: { element: HTMLElement }) :  Output<T>
  {
    if ( streamOptions === null || undefined ) {
      console.warn("StreamOptions is undefined or null.");
    }
    /*
     * Get the contents of the options variable
     */
    const { url, model } = this.state;
    let prompt = "";
    const layman = options.layman || this.state.layman || false;
    if (layman){
      prompt = `<prompt>${options.prompt || this.state.prompt}</prompt>\n<instructions>Render response using simple HTML5 elements, no scripts execution are allowed.</instructions>\n`;
    } else {
      prompt = `<prompt>${options.prompt || this.state.prompt}</prompt>\n<instructions>Render response using simple HTML5 elements, no scripts execution are allowed.</instructions>\n`;
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const element = streamOptions.element;

    console.dir({
      prompt: prompt,
      layman: layman,
      state: this.state,
      apiKey: process.env.REACT_APP_OPENAI_API_KEY,
      orgId: process.env.REACT_APP_ORGANIZATION_ID
    });

    try {
      if (prompt) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        let results = String("");
        const queuingStrategy = new CountQueuingStrategy({ highWaterMark: 1 });

        return await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
            "organizationId": `${process.env.REACT_APP_ORGANIZATION_ID}`
          },
          body: JSON.stringify({
            logprobs: null,
            max_tokens: 256,
            model: model,
            temperature: 0.9,
            frequency_penalty: 0,
            presence_penalty: 0,
            prompt: prompt,
            stream: true,
            top_p: 1,
          }),
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          duplex: "half"
        })
        // read the response data in chunks and render to client in chunks
          .then(async (response) =>
            response.body
              .pipeThrough(new TextDecoderStream("utf-8"))
              .pipeThrough(await this.transformStreamToJSON())
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
              .pipeTo(await new WritableStream({
                write: async function (json) {
                  console.dir(json);
                  if (json !== undefined && json.choices) {
                    // eslint-disable-next-line prefer-const
                    console.dir(json);
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-ignore
                    const text = json.choices[0].text;
                    element.append(text.replace("\n", "</br>"));
                    results += text;
                    ExecuteStrategy.wait(300);
                  }
                },
                abort(err) {
                  console.log("Sink error:", err);
                }
              },
              queuingStrategy))
              .then(() => results)  // Respond with our stream
              .catch(console.dir)
          )
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
          .then((html) => html)
          .catch(console.dir);
      }
    } catch (error) {
      this.state.error = true;
      this.state.errorMessage = error.message;
    }
  }

  /**
   * Transform the stream into a readable stream and converT to JSON.
   */
  // eslint-disable-next-line class-methods-use-this
  async transformStreamToJSON(): Promise<ReadableWritablePair> {
    const regex = new RegExp(/data: \[DONE\]|data:|\[DONE\]/, "gm");

    return new TransformStream({
      transform: async function(chunk, controller) {
        let newChunk;

        switch (typeof chunk) {
        case "object":
          // eslint-disable-next-line no-case-declarations
          newChunk = ExecuteStrategy.convertToJSON(String(chunk),regex);

          console.log("Chunk Length: ");
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          console.dir(newChunk.length);
          console.dir(newChunk);
          // just say the stream is done I guess
          if (ArrayBuffer.isView(newChunk)) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            controller.enqueue(new Uint8Array(newChunk.buffer, newChunk.byteOffset, newChunk.byteLength));
          } else if (
            Array.isArray(newChunk) &&
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              //@ts-ignore
              newChunk.every((value) => typeof value === "number")
          ) {
            controller.enqueue(new Uint8Array(newChunk));
          } else if (
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
            typeof newChunk.valueOf === "function" &&
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              //@ts-ignore
              newChunk.valueOf() !== newChunk
          ) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            this.transform(newChunk.valueOf(), controller); // hack
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          } else { // @ts-ignore
            if ("toJSON" in newChunk) {
              this.transform(JSON.stringify(newChunk), controller);
            }
          }
          break;
        case "symbol":
          controller.error("Cannot send a symbol as a chunk part");
          break;
        case "undefined":
          controller.error("Cannot send undefined as a chunk part");
          break;
        default:
          // eslint-disable-next-line no-case-declarations
          const json = ExecuteStrategy.convertToJSON(String(chunk), regex);
          console.log(json);
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          controller.enqueue(
            json
          );
          break;
        }
      },
    });
  }


  // eslint-disable-next-line class-methods-use-this
  static async stringToUint8Array (str: string): Promise<Uint8Array[]> {
    const arr: Uint8Array[] | PromiseLike<Uint8Array[]> = [];
    return new Promise((resolve) => {
      for (let i = 0; i < str.length; i++) {
        arr.push(Uint8Array.from([str.charCodeAt(i)]));
      }
      console.dir(JSON.stringify(arr).toString());
      resolve(arr);
    });
  }

  static convertToJSON(
    data: string|Uint8Array|JSON,
    regex = new RegExp(/data: \\[DONE\\]|data:\s*|\\[DONE\\]/, "gm"),
    searchValue: string|RegExp = "",
    replaceValue: string|RegExp = ""
  ): TextCompletion {
    ExecuteStrategy.loopCount += 1;
    let json: TextCompletion;
    try {
      console.dir(String(data));
      if (typeof replaceValue === "string") {
        json = JSON.parse(String(data)
          .replace(searchValue, replaceValue)
          .replace(regex, "")
          .replace(/\\"/gm, "\"")
          .replace(/data: \[DONE\]/gm, "")
          .replace(/data: /gm, "")
          .replace(/\[DONE\]/gm, "")
          .trim());
      }
      console.log("Original: ", data);
      console.log("ConvertedJSON: ", json);
      console.log("SearchValue: ", JSON.stringify(json).search(regex));
      if (ExecuteStrategy.loopCount > 10) {ExecuteStrategy.loopCount = 0; return {}; }
      if (JSON.stringify(json).search(regex) > -1) return this.convertToJSON(json,regex);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return json;
    } catch (e) {
      console.error(e.message);
      console.error(data);
      e.stackTrace;
      if (ExecuteStrategy.loopCount > 10) {ExecuteStrategy.loopCount = 0; return {}; }
      return ExecuteStrategy.convertToJSON(String(data));
    }
  
  }
  // eslint-disable-next-line class-methods-use-this
  static wait(milliseconds: number) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  }

  /**
   * Convert to JSON object
   * @param data
   */
  // eslint-disable-next-line class-methods-use-this
  toJSON(data?: never): JSON {
    return JSON.parse(JSON.stringify(data));
  }

}

