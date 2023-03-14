#!/usr/bin/env node
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {IStrategy} from "../../IStrategy.ts";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {uuid} from "../../UUID.ts";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {TextCompletionResponse} from "./TextCompletionResponse.d.ts";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {Output} from "../../Pipeline/IHandler.ts";
// import parse from "html-react-parser";


/**
 * The Gpt3 class implements the IStrategy interface and is used to define a
 * "text-davinci-003" language Text Completion Model. It stores data on a unique
 * universal identifier (uuid), the name "gpt3", a description, the associated
 * protocols, the url of the OpenAI API, the type of completion and the model.
 * Upon initialization, it sets the associated values for each field in the state object.
 * @param {prompt: string, layman: boolean, url: string, model: string} props
 */
export class Gpt3 implements IStrategy{

  /**
   * Saves the state of the strategy selected.
   */
  state: { [key: string]: string|boolean|RegExp|object|never|JSON|IStrategy|Headers};
  static responseCount = 0;

  /**
   * Initialize GPT-3 to make api calls
   */
  protected constructor() {
    this.state = {
      uuid: uuid("text-davinci-003", "language_text_completion_model"),
      name: "gpt3",
      type: "text_completion",
      model: "text-davinci-003",
      version: "1.0",
      description: "Chat-GPT-3 'text-davinci-003' model.",
      protocols: {
        "strategy": true,
        "stream-strategy": true
      },
      // url: new URL("https://api.openai.com/v1/completions"),

      url: new URL("/api/v1/openai", "https://delliusalexander.com:4443"),
      requestBody: function(prompt: string) {
        return Object.assign({},{
          logprobs: null,
          max_tokens: 256,
          model: "text-davinci-003",
          temperature: 0.9,
          frequency_penalty: 0,
          presence_penalty: 0,
          prompt: prompt,
          stream: true,
          top_p: 1,
          apiPath: "completion",
        });
      },
      headers: new Headers([
        ["Accept", "*/*;q=0.8"],
        ["Accept-Language", "en-US,en;q=0.8"],
        ["Content-Language", "en-US,*"],
        ["Content-Type", "application/json"],
        ["Connection", "keep-alive"],
        ["Accept-Encoding", "gzip, deflate"],
        ["Access-Control-Allow-Origin", "*"],
        ["Access-Control-Allow-Methods", "*"],
        ["Access-Control-Allow-Headers", "*"],
        ["User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64)"]
        // ["organizationId", `${process.env.REACT_APP_ORGANIZATION_ID}`],
        // ["Authorization", `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`]
      ]),
      jsonParser: new RegExp( /(\{.*?(\[\{.*?\}\]).*?\})+/, "g"),
      regex: new RegExp( /(\{.*?(\[\{.*?\}\]).*?\})+/, "g"),
      removeParser: new RegExp( /(data:)|(data:\S*\[DONE\])/, "g"),
      responseCount: Gpt3.responseCount++
    };

    console.dir(this.state.headers);

    this.state.responseBodyType = TextCompletionResponse;
    this.fetch = this.fetch.bind(this);
    this.state.fetch = this.fetch;
    this.toStringJson = this.toStringJson.bind(this);
    this.transformStreamToJSON = this.transformStreamToJSON.bind(this);
    this.writeResponseStream = this.writeResponseStream.bind(this);
    console.dir(this.state);
  }
  
  // eslint-disable-next-line @typescript-eslint/ban-types
  async fetch(prompt: string, element: HTMLElement, strategy: IStrategy): Promise<Output<never>> {
    // const queuingStrategy = new CountQueuingStrategy({ highWaterMark: 1 });
    console.log(strategy);
    console.dir(this.state);
    const {headers, url, responseCount} = this.state;
    const container = document.createElement("div");
    container.innerHTML += "<hr/><br/>";
    element.append(container);

    container.className = this.state.model + "-" + responseCount;
    container.id = this.state.model + "-" + responseCount;
    const urlSearchParams = new URLSearchParams({
      apiPath: "completion",
      prompt: prompt
    });
    process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = String(0);
    // eslint-disable-next-line no-async-promise-executor
    return await new Promise<Output>(async (resolve, reject) => {
      try {

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        await fetch(`${url}?${urlSearchParams}`, {
          method: "GET", // *GET, POST, PUT, DELETE, etc.
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          mode: "cors", // no-cors, *cors, same-origin
          cache: "default", // *default, no-cache, reload, force-cache, only-if-cached
          headers: headers,
          // body: requestBody(prompt),
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          // duplex: "full"
        })
          .then(async (response) => await response.json())
        // .then(async (response) => response.body
        //   .pipeThrough(new TextDecoderStream("utf-8"))
        //   .pipeThrough(await this.transformStreamToJSON(strategy))
        //   .pipeTo(new WritableStream({
        //     write: async function (json) {
        //       console.dir(json);
        //       if (json && json instanceof Array) {
        //         for (let i = 0; i < json.length; i++) {
        //           if (json[i].choices) {
        //             const text = json[i].choices[0].text;
        //             // element.innerHTML += text;
        //             container.innerHTML += text;
        //           }
        //         }
        //       } else {
        //         if (json && json.choices) {
        //           const text = json.choices[0].text;
        //           // element.innerHTML += text;
        //           container.innerHTML += text;
        //         }
        //       }
        //     },
        //     abort(err) {
        //       console.log("Sink error:", err);
        //     }
        //   },
        //   queuingStrategy))
        // )
          .then((json) => {
            console.dir(json);
            container.innerHTML += json.choices[0].text;
          })
          .then(() => container)  // Respond with our new element
          .then((html) => html)
          .catch(console.dir);
        resolve(container);
      } catch (e) {
        console.error(e.message);
        reject(e);
      }
    });
  }

  /**
   * Transform the stream into a readable stream and convert to JSON.
   * @param {{IStrategy}} strategy
   */
  // eslint-disable-next-line class-methods-use-this
  async transformStreamToJSON(strategy: IStrategy): Promise<TransformStream> {
    const {regex} = this.state;
    console.dir(strategy);
    const toStringJson = this.toStringJson;
    return new TransformStream({
      transform: async function(chunk, controller) {
        const data = String(chunk);
        let json: TextCompletionResponse;
        try {
          switch (typeof data) {
          case "string":
            json = toStringJson(data).match(regex);
            // return json;
            break;
          case "object":
            json = toStringJson(data).match(regex);
            // return json;
            break;
          case "number":
            json = toStringJson(data).match(regex);
            // return json;
            break;
          case "bigint":
            json = toStringJson(data).match(regex);
            // return json;
            break;
          case "undefined":
            throw new Error("Data is undefined");
          default:
            json = toStringJson(data).match(regex);
            break;
          }
          console.log("Original: ");
          console.dir(data);
          console.log("ConvertedJSON: ");
          console.dir(json);

          if (json && json instanceof Array) {
            for (let i = 0; i < json.length; i++) {
              controller.enqueue(JSON.parse(String(json[i]).replace(/\\\\"/g, "\"")));
            }
          } else if (json && json instanceof String) {
            controller.enqueue(JSON.parse(String(json).replace(/\\\\"/g, "\"")));
          }
        } catch (e) {
          console.error(e.message);
          e.stackTrace;
        }

      },
    });
  }

  // eslint-disable-next-line class-methods-use-this
  toStringJson(data: string|object|Uint8Array)  {
    const {removeParser} = this.state;
    return String(data)
      .replace(removeParser, "")
      .replace(/\\\\"/g, "\"")
      .replace(/data:/g, "")
      .replace(/data: \[DONE\]/g, "")
      .replace(/(data: \[DONE\])*/g, "")
      .replace(/\s*data:\s*/g, "")
      .replace(/data:\s*\[DONE\]\n*/g, "")
      .replace(/\[DONE\]/g, "");
  }
  
  // eslint-disable-next-line class-methods-use-this
  writeResponseStream(): null {
    return null;
  }

}
