#!/usr/bin/env node
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
import {IHandler, Input, Output} from "./Pipeline/IHandler.ts";

/**
 * This ExecuteStrategy class provides a way to send an API request to an AI strategy
 * and receive a response. It implements the mandatory functions for sending a request,
 * such as setting the prompt and layman options, as well as streaming requets, allowing
 * for more complex interactions. It also stores server responses in the form of JSON
 * data and includes error handling logic in case of failure to make a request.
 * Additionally, it keeps track of usage metrics such as prompt tokens, completion
 * tokens, and total tokens.
 */
export class ExecuteStrategy<T> implements IDefaultStrategy<T>, IStreamStrategy<T>, IHandler<T> {
  /*
  * Saves the state of the strategy selected.
  */
  state: {
    [key: string]: string|boolean|RegExp|object|never|JSON|ExecuteStrategy<T>|IStrategy<T>|Input<T>|Output<T>|T,

  };
  strategy: IStrategy<T>;
  static loopCount = 0;
  constructor(strategy: IStrategy<T>) {
    console.dir(strategy);
    this.state = strategy.state;
    this.strategy= strategy;
    console.dir(this.strategy);
    this.handle = this.handle.bind(this);
    // this.transformStreamToJSON = this.transformStreamToJSON.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
    this.streamRequest = this.streamRequest.bind(this);
    console.dir(this);
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  async handle(input: Input<T>): Promise<Output<T>> {
    console.log(input);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line no-case-declarations
    const {options, element} = input;
    console.log("Inputs: ");
    console.dir(options);
    // console.dir(element);
    console.dir("Protocols: \n");
    console.dir(this.state.protocols);
    switch (true) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // send large prompts > 256 bytes, using IStreamStrategy transport protocols
    case this.state.protocols["stream-strategy"] && options.prompt.length > 256:
      console.log("Using stream strategy");
      return (
        await this.streamRequest(options, element)
        // return the response data to the chatbot
          .then((response: Promise<Output<T>>) => response)
          .catch(console.dir)
      );
      // send normal prompts < 256 bytes, using normal IDefaultStrategy transport protocols
    case this.state.protocols["strategy"]:
      console.log("Using default strategy");
      return(
        await this.sendRequest(options, element)
        // return the response data to the chatbot
          .then((response: Promise<Output<T>>) => response)
          .catch(console.dir)
      );
    default:
      throw new Error(
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
   * @param {{prompt: string, layman: false}} options The options prompt object to send
   * @param {{element: HTMLElement}} element the element to update with the response data
   * @returns  {{Promise<Output<never>>}}
   */
  async sendRequest(options: { prompt: string; layman: false }, element?: HTMLElement ): Promise<Output<T>> {

    /**
     * Get the contents of the options variable
     */

    let prompt = "";
    const layman = options.layman || this.strategy.state.layman || false;
    if (layman){
      prompt = `${options.prompt || this.strategy.state.prompt}`;
    } else {
      prompt = `${options.prompt || this.strategy.state.prompt}`;
    }

    console.dir({
      prompt: prompt,
      layman: layman,
      state: this.strategy.state,
      element: element
    });
    return new Promise((resolve, reject) => {
      try {
        if (prompt) {
          const html = this.strategy.fetch(prompt, element, this.strategy);
          resolve(html);
        }
      } catch (error) {
        this.strategy.state.error = true;
        this.strategy.state.errorMessage = error.message;
        reject(error);
      }
    });

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
   * @param {{prompt: string, layman: false}} options The options prompt object to send
   * @param {{element: HTMLElement}} element the element to update with the response data
   * @returns {{Promise<Output<T> | void> }} JSX element(s), empty array, or string.
   */
  async streamRequest(options: { prompt: string; layman: false }, element?: HTMLElement ):  Promise<Output<T>> {
    if ( element === null || undefined ) {
      console.warn("HTMLElement is undefined or null.");
    }
    /*
     * Get the contents of the options variable
     */

    let prompt = "";
    const layman = options.layman || this.strategy.state.layman || false;
    if (layman){
      prompt = `<prompt>${options.prompt || this.strategy.state.prompt}</prompt>\n`;
    } else {
      prompt = `<prompt>${options.prompt || this.strategy.state.prompt}</prompt>\n`;
    }
    this.strategy.state.prompt = prompt;


    console.dir({
      prompt: prompt,
      layman: layman,
      state: this.strategy.state,
      element: element
    });
    return new Promise((resolve, reject) => {
      try {
        if (prompt) {
          const html = this.strategy.fetch(prompt, element, this.strategy);
          resolve(html);
        }
      } catch (error) {
        this.strategy.state.error = true;
        this.strategy.state.errorMessage = error.message;
        reject(error);
      }
    });
  }


  // eslint-disable-next-line class-methods-use-this
  async stringToUint8Array (str: string): Promise<Uint8Array[]> {
    const arr: Uint8Array[] | PromiseLike<Uint8Array[]> = [];
    return new Promise((resolve) => {
      for (let i = 0; i < str.length; i++) {
        arr.push(Uint8Array.from([str.charCodeAt(i)]));
      }
      console.dir(JSON.stringify(arr).toString());
      resolve(arr);
    });
  }


  // eslint-disable-next-line class-methods-use-this
  static async wait(milliseconds: number) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  }

  /**
   * Convert to JSON object
   * @param data
   */
  // eslint-disable-next-line class-methods-use-this
  toJSON(data: never): JSON | [JSON] {
    return JSON.parse(JSON.stringify(data));
  }

}

