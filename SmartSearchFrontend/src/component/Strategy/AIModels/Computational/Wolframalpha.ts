// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {IStrategy} from "../../IStrategy.ts";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {uuid} from "../../UUID.ts";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {WolframalphaResponse} from "./WolframalphaResponse.d.ts";
import {Output} from "../../Pipeline/Pipeline";
import parse from "html-react-parser";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// import * as DomParser from "dom-parser";
// // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// // @ts-ignore
// import WolframAlphaAPI from "wolfram-alpha-api";
// const waAPI = new WolframAlphaAPI(`${process.env.REACT_APP_WOLFRAMALPHA_APPID}`);

/**
 * The Wolframalpha class implements the IStrategy interface which
 * allows it to be used as a strategy for computation. It stores state
 * information including a unique identifier (uuid), a name, a type
 * (computation model), version, a description, and protocols which
 * can be either a string, boolean or regular expression. Upon initialization,
 * the class generates a unique identifier based on the 'alpha' and
 * 'computational_model' strings, sets the name to 'alpha', type to
 * 'computational_model', model to 'Alphav1', version to '1.0',
 * description to 'WolframAlpha computation model.', and the URL
 * to an empty string. The protocols are predetermined to be true.
 */
export class Wolframalpha implements IStrategy {
  /**
   * Saves the state of the strategy selected.
   */
  state: { [key: string]: string|boolean|RegExp|object|never|JSON|IStrategy};
  constructor() {
    this.state = {
      uuid: uuid("alpha","computational_model"),
      name : "alpha",
      type: "computational_model",
      model: "Alpha_v1",
      version: "1.0",
      description: "WolframAlpha computation model.",
      protocols: {
        "strategy": true
      },
      url: "https://localhost:4434/api/v1/alpha",
    };

    // url: (prompt: any) => `https://api.wolframalpha.com/v2/query?input=${prompt}?&format=image,plaintext,html&output=JSON&appid=${process.env.REACT_APP_WOLFRAMALPHA_APPID}`,

    this.state.jsonParser = new RegExp( /(\{.*?(\[\{.*?\}\]).*?\})+/, "g");
    this.state.regex = new RegExp( /(\{.*?(\[.*\{.*?\}.*\]*).*?\})+/, "g");
    this.state.removeParser = "";
    
    this.state.headers = new Headers([
      ["Accept", "*/*"],
      ["Accept-Language", "en-US,en;q=0.8"],
      ["Content-Language", "en-US,*"],
      ["Content-Type", "application/json"],
      ["Connection", "keep-alive"],
      ["Accept-Encoding", "gzip, deflate"],
      ["Access-Control-Allow-Origin", "*"],
      ["Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, HEAD"],
      ["Access-Control-Allow-Headers", "Content-Type"],
      ["User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64)"]
    ]);

    this.state.urlParams = (prompt: string) => new URLSearchParams({
      "appid": `${process.env.REACT_APP_WOLFRAMALPHA_APPID}`,
      "input": `${prompt}`,
      "includepodid": "Result",
      "format": "plaintext",
      "output": "json"

    });
    
    this.state.responseBodyType = WolframalphaResponse;
    this.fetch = this.fetch.bind(this);
    this.state.fetch = this.fetch;
    this.toStringJson = this.toStringJson.bind(this);
    this.transformStreamToJSON = this.transformStreamToJSON.bind(this);
    this.writeResponseStream = this.writeResponseStream.bind(this);
    console.dir(this.state);
  }

  // eslint-disable-next-line @typescript-eslint/ban-types,class-methods-use-this
  async fetch(prompt: string, element: HTMLElement, strategy: IStrategy): Output<JSON|string> {
    console.log("Executing alpha strategy");
    console.dir(strategy);
    // let results: never;

    // console.dir(prompt, element);
    // console.dir(strategy);
    // // eslint-disable-next-line prefer-const
    // results = waAPI.getfull(prompt)
    //   .then(console.dir)
    //   .catch(console.dir);
    // console.dir(results);
    // return results;
    // const parser = new DomParser();

    const {headers, url} = strategy.state;
    console.dir(headers, url);
    // const queuingStrategy = new CountQueuingStrategy({ highWaterMark: 1 });
    // const urlRequest = new URL(`${url}${urlParams(prompt)}/`);
    return await new Promise( (resolve, reject) => {
      fetch(url, {
        // duplex: "full",
        headers: headers,
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: "same-origin", // include, *same-origin, omit
        // redirect: "follow", // manual, *follow, error
        // referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // origin: "https://delliusalexander.com",

        body: JSON.parse({
          prompt: prompt,
          stream: true,
        })
      })
        .then(async (response) => {
          const html = await response.text();
          console.log(html);
          // Convert the HTML string into a document object
          const doc = parse(html);
          console.dir(doc.toString());
          return "Done";
        })
        .then((json) => resolve(json))

      // response.body
      //   .pipeThrough(new TextDecoderStream("utf-8"))
      //   .pipeThrough(await this.transformStreamToJSON(strategy))
      //   .pipeTo(new WritableStream({
      //     write: async function (json) {
      //       console.dir(json);
      //       if (json && json instanceof Array) {
      //         for (let i = 0; i < json.length; i++) {
      //           if (json[i].choices) {
      //             const text = json[i].choices[0].text;
      //             element.innerHTML += text;
      //             results += text;
      //           }
      //         }
      //       } else {
      //         if (json && json.choices) {
      //           const text = json.choices[0].text;
      //           element.innerHTML += text;
      //           results += text;
      //         }
      //       }
      //     },
      //     abort(err) {
      //       console.log("Sink error:", err);
      //     }
      //   },
      //   queuingStrategy)
      //   )

      // Respond with our results
        .catch((e) => reject(e));
    });
    
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
        console.dir(chunk);
        const data = String(chunk);
        let json: WolframalphaResponse;
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
      .replace(removeParser, "");
  }

  // eslint-disable-next-line class-methods-use-this
  writeResponseStream(element: HTMLElement){
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let results = String("");
    const queuingStrategy = new CountQueuingStrategy({ highWaterMark: 1 });
    return new WritableStream({
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
    queuingStrategy);
  }

}

