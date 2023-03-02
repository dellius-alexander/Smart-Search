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
import {Output} from "../../Pipeline/Pipeline.ts";


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
  state: { [key: string]: string|boolean|RegExp|object|never|JSON|IStrategy};

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
      url: new URL("https://api.openai.com/v1/completions"),
    };

    this.state.jsonParser = new RegExp( /(\{.*?(\[\{.*?\}\]).*?\})+/, "g");
    this.state.regex = new RegExp( /(\{.*?(\[\{.*?\}\]).*?\})+/, "g");
    this.state.removeParser = new RegExp( /(data:)|(data:\S*\[DONE\])/, "g");
    
    this.state.headers = new Headers([
      ["Content-Type", "application/json"],
      ["Accept", "application/json"],
      ["Connection", "keep-alive"],
      ["Accept-Encoding", "gzip, deflate"],
      ["Accept-Language", "en-US,en;q=0.8"],
      ["User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64)"],
      ["organizationId", `${process.env.REACT_APP_ORGANIZATION_ID}`],
      ["Authorization", `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`]
    ]);

    this.state.requestBody = (prompt: string) => JSON.stringify({
      logprobs: null,
      max_tokens: 256,
      model: "text-davinci-003",
      temperature: 0.9,
      frequency_penalty: 0,
      presence_penalty: 0,
      prompt: prompt,
      stream: true,
      top_p: 1
    });

    this.state.responseBodyType = TextCompletionResponse;
    this.fetch = this.fetch.bind(this);
    this.state.fetch = this.fetch;
    this.toStringJson = this.toStringJson.bind(this);
    this.transformStreamToJSON = this.transformStreamToJSON.bind(this);
    this.writeResponseStream = this.writeResponseStream.bind(this);
    console.dir(this.state);
  }
  
  // eslint-disable-next-line @typescript-eslint/ban-types
  async fetch(prompt: string, element: HTMLElement, strategy: IStrategy): Output<string> {
    let results = String("");
    const queuingStrategy = new CountQueuingStrategy({ highWaterMark: 1 });
    const {headers, requestBody, url} = strategy.state;
   
    return await fetch(url, {
      method: "POST",
      headers: headers,
      body: requestBody(prompt),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      duplex: "full"
    })
      .then(async (response) => response.body
        .pipeThrough(new TextDecoderStream("utf-8"))
        .pipeThrough(await this.transformStreamToJSON(strategy))
        .pipeTo(new WritableStream({
          write: async function (json) {
            console.dir(json);
            if (json && json instanceof Array) {
              for (let i = 0; i < json.length; i++) {
                if (json[i].choices) {
                  const text = json[i].choices[0].text;
                  element.innerHTML += text;
                  results += text;
                }
              }
            } else {
              if (json && json.choices) {
                const text = json.choices[0].text;
                element.innerHTML += text;
                results += text;
              }
            }
          },
          abort(err) {
            console.log("Sink error:", err);
          }
        },
        queuingStrategy))
      )
      .then(() => results)  // Respond with our results
      .then((html) => html)
      .catch(console.dir);
  }

  /**
   * Transform the stream into a readable stream and convert to JSON.
   * @param {{IStrategy}} strategy
   */
  // eslint-disable-next-line class-methods-use-this
  async transformStreamToJSON(strategy: IStrategy): Promise<TransformStream> {
    const {regex} = strategy.state;
    const toStringJson = strategy.toStringJson;
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
              controller.enqueue(JSON.parse(json[i]));
            }
          } else if (json && json instanceof String) {
            controller.enqueue(JSON.parse(String(json)));
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
