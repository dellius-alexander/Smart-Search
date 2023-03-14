#!/usr/bin/env node
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {IStrategy} from "../../IStrategy.ts";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {uuid} from "../../UUID.ts";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {WolframalphaResponse} from "./WolframalphaResponse.d.ts";
// const superagent = require("superagent");
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {Output} from "../../Pipeline/IHandler.ts";
// import parse from "html-react-parser";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// import * as DomParser from "dom-parser";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// import WolframAlphaAPI from "wolfram-alpha-api";
// const waAPI = new WolframAlphaAPI(`${process.env.REACT_APP_WOLFRAMALPHA_APPID}`);
// // import wajs from "wajs";

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
  static responseCount = 0;
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
      // url: new URL("https://api.wolframalpha.com/v2/query"),
      url: new URL("https://delliusalexander.com:4443/api/v1/alpha"),
      jsonParser: new RegExp( /(\{.*?(\[\{.*?\}\]).*?\})+/, "g"),
      regex: new RegExp( /(\{.*?(\[.*\{.*?\}.*\]*).*?\})+/, "g"),
      removeParser: "",
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
      ]),
      urlParams: (prompt: string) => new URLSearchParams({
        "appid": `${process.env.REACT_APP_WOLFRAMALPHA_APPID}`,
        "input": `${prompt}`,
        "includepodid": "Result",
        "format": "plaintext,image,imagemap,sound,wav,cell,mathml", // individual result pods:	"image", "imagemap", "plaintext", "minput", "moutput", "cell", "mathml", "sound", "wav"
        "output": "json",
        "apiPath": "spoken"
      }),
      responseCount: Wolframalpha.responseCount++
    };

    // url: (prompt: any) => `https://api.wolframalpha.com/v2/query?input=${prompt}?&format=image,plaintext,html&output=JSON&appid=${process.env.REACT_APP_WOLFRAMALPHA_APPID}`,
    
    this.state.responseBodyType = WolframalphaResponse;
    this.fetch = this.fetch.bind(this);
    this.state.fetch = this.fetch;
    this.toStringJson = this.toStringJson.bind(this);
    this.transformStreamToJSON = this.transformStreamToJSON.bind(this);
    this.writeResponseStream = this.writeResponseStream.bind(this);
    console.dir(this.state);
  }

  // eslint-disable-next-line @typescript-eslint/ban-types,class-methods-use-this
  async fetch(prompt: string, element: HTMLElement, strategy: IStrategy): Promise<Output<never>> {
    console.log("Strategy: ");
    console.dir(strategy);
    const {headers, url, responseCount, urlParams} = this.state;
    const container = document.createElement("div");
    container.innerHTML += "<hr/><br/>";
    element.append(container);

    container.className = this.state.model + "-" + responseCount;
    container.id = this.state.model + "-" + responseCount;
    console.log(url);
    console.log(headers);
    // const queuingStrategy = new CountQueuingStrategy({ highWaterMark: 1 });
    const urlRequest = new URL(`${url.toString()}?${urlParams(prompt)}`);
    console.dir(urlRequest);
    process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = String(0);
    // eslint-disable-next-line no-async-promise-executor
    return await new Promise<HTMLElement>(async (resolve, reject) => {
      try {

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        resolve(await fetch(urlRequest, {
          headers: headers,
          method: "GET", // *GET, POST, PUT, DELETE, etc.
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          mode: "cors", // no-cors, *cors, same-origin
          cache: "default", // *default, no-cache, reload, force-cache, only-if-cached
          // credentials: "same-origin", // include, *same-origin, omit
          // redirect: "follow", // manual, *follow, error
          // referrerPolicy: "origin-when-cross-origin", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, strict-origin-when-cross-origin
          // origin: "*",  // allow-list, *same-origin, omit
          // body: urlParams(prompt),
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          // duplex: "full"
        })
          .then(async (response) => await response.json())
          .then((json) => {
            /**
            * {
            * 	"result":"The dog (Canis familiaris or Canis lupus familiaris) is a domesticated descendant of the wolf. Also called the domestic dog, it is derived from the extinct Pleistocene wolf, and the modern wolf is the dog's nearest living relative.",
            * 	"conversationID":"MSP2892148436393chbc30d00004c0fai8eg4e97338",
            * 	"host":"www6b3.wolframalpha.com"
            * }
            */
            console.log(json);
            // write to html container
            container.innerHTML += `${json}`;
          })
          .then(() =>  container)
          .then((html) => html)
        // Respond with our results
          .catch(console.dir));


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

