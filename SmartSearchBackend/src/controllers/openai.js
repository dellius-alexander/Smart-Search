#!/usr/bin/env node
/**
 *    Copyright 2023 Dellius Alexander
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */
// const { Configuration, OpenAIApi } = require("openai");
// const {OpenAIResponse} = require("../model/OpenAIResponse.js")

const { getParams } = require("../utils/helpers");
const http = require("http");
const https = require("https");
const axios = require("axios");
const state = {
    name: "gpt3",
    type: "text_completion",
    model: "text-davinci-003",
    version: "1.0",
    description: "Chat-GPT-3 'text-davinci-003' model.",
    protocols: {
        "strategy": true,
        "stream-strategy": true
    },
    baseURL: "https://api.openai.com",
    /**
     * Request Body creation
     * @param prompt
     * @return {{top_p: number, frequency_penalty: number, max_tokens: number, stream: boolean, presence_penalty: number, apiPath: string, temperature: number, model: string, prompt: string, logprobs: null}}
     */
    requestBody: (prompt) => {
        return {
            logprobs: null,
            max_tokens: 256,
            model: "text-davinci-003",
            temperature: 0.9,
            frequency_penalty: 0,
            presence_penalty: 0,
            prompt: prompt,
            stream: true,
            top_p: 1
        };
    },
    headers: {
        "Accept": "application/json,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.8",
        "Content-Language": "en-US,*",
        "Content-Type": "application/json",
        "Connection": "keep-alive",
        "Accept-Encoding": "gzip, deflate",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "*",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64)",
        "organizationId": `${process.env.REACT_APP_ORGANIZATION_ID}`,
        "Authorization": `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
},
    jsonParser: new RegExp( /(\{.*?(\[\{.*?\}\]).*?\})+/, "g"),
    regex: new RegExp( /(\{.*?(\[\{.*?\}\]).*?\})+/, "g"),
    removeParser: new RegExp( /(data:)|(data:\S*\[DONE\])/, "g"),
    /**
     * Url search parameters
     * @param prompt
     * @return {{model: string, prompt: String}}
     */
    urlSearchParams: (prompt) => {
        return {
            model: "text-davinci-003",
            prompt: prompt
        }
    },
    paths: {
        "completions": "/v1/completions",
    }

};

// custom axios instance
const instance = axios.create({

        // `baseURL` will be prepended to `url` unless `url` is absolute.
        // It can be convenient to set `baseURL` for an instance of axios to pass relative URLs
        // to methods of that instance.
        baseURL: state.baseURL,

        // `headers` are custom headers to be sent
        headers: state.headers,

        // // `data` is the data to be sent as the request body
        // // Only applicable for request methods 'PUT', 'POST', 'DELETE , and 'PATCH'
        // // When no `transformRequest` is set, must be of one of the following types:
        // // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
        // // - Browser only: FormData, File, Blob
        // // - Node only: Stream, Buffer, FormData (form-data package)
        // data: {
        //     firstName: 'Fred'
        // },
        //
        // // syntax alternative to send data into the body
        // // method post
        // // only the value is sent, not the key
        // data: 'Country=Brasil&City=Belo Horizonte',

        // `timeout` specifies the number of milliseconds before the request times out.
        // If the request takes longer than `timeout`, the request will be aborted.
        timeout: 1000, // default is `0` (no timeout)

        // `withCredentials` indicates whether or not cross-site Access-Control requests
        // should be made using credentials
        withCredentials: false, // default

        // // `adapter` allows custom handling of requests which makes testing easier.
        // // Return a promise and supply a valid response (see lib/adapters/README.md).
        // adapter: function (config) {
        //     /* ... */
        // },

        // // `auth` indicates that HTTP Basic auth should be used, and supplies credentials.
        // // This will set an `Authorization` header, overwriting any existing
        // // `Authorization` custom headers you have set using `headers`.
        // // Please note that only HTTP Basic auth is configurable through this parameter.
        // // For Bearer tokens and such, use `Authorization` custom headers instead.
        // auth: {
        //     username: 'janedoe',
        //     password: 's00pers3cret'
        // },

        // `responseType` indicates the type of data that the server will respond with
        // options are: 'arraybuffer', 'document', 'json', 'text', 'stream'
        //   browser only: 'blob'
        responseType: 'json', // default

        // `responseEncoding` indicates encoding to use for decoding responses (Node.js only)
        // Note: Ignored for `responseType` of 'stream' or client-side requests
        responseEncoding: 'utf8', // default

        // `xsrfCookieName` is the name of the cookie to use as a value for xsrf token
        xsrfCookieName: 'XSRF-TOKEN', // default

        // `xsrfHeaderName` is the name of the http header that carries the xsrf token value
        xsrfHeaderName: 'X-XSRF-TOKEN', // default

        // // `onUploadProgress` allows handling of progress events for uploads
        // // browser & node.js
        // onUploadProgress: function ({loaded, total, progress, bytes, estimated, rate, upload = true}) {
        //     // Do whatever you want with the Axios progress event
        // },

        // // `onDownloadProgress` allows handling of progress events for downloads
        // // browser & node.js
        // onDownloadProgress: function ({loaded, total, progress, bytes, estimated, rate, download = true}) {
        //     // Do whatever you want with the Axios progress event
        // },

        // // `maxContentLength` defines the max size of the http response content in bytes allowed in node.js
        // maxContentLength: 2000,
        //
        // // `maxBodyLength` (Node only option) defines the max size of the http request content in bytes allowed
        // maxBodyLength: 2000,

        // // `validateStatus` defines whether to resolve or reject the promise for a given
        // // HTTP response status code. If `validateStatus` returns `true` (or is set to `null`
        // // or `undefined`), the promise will be resolved; otherwise, the promise will be
        // // rejected.
        // validateStatus: function (status) {
        //     return status >= 200 && status < 300; // default
        // },

        // // `maxRedirects` defines the maximum number of redirects to follow in node.js.
        // // If set to 0, no redirects will be followed.
        // maxRedirects: 21, // default

        // // `beforeRedirect` defines a function that will be called before redirect.
        // // Use this to adjust the request options upon redirecting,
        // // to inspect the latest response headers,
        // // or to cancel the request by throwing an error
        // // If maxRedirects is set to 0, `beforeRedirect` is not used.
        // beforeRedirect: (options, { headers }) => {
        //     if (options.hostname === "example.com") {
        //         options.auth = "user:password";
        //     }
        // },

        // // `socketPath` defines a UNIX Socket to be used in node.js.
        // // e.g. '/var/run/docker.sock' to send requests to the docker daemon.
        // // Only either `socketPath` or `proxy` can be specified.
        // // If both are specified, `socketPath` is used.
        // socketPath: null, // default

        // // `transport` determines the transport method that will be used to make the request. If defined, it will be used. Otherwise, if `maxRedirects` is 0, the default `http` or `https` library will be used, depending on the protocol specified in `protocol`. Otherwise, the `httpFollow` or `httpsFollow` library will be used, again depending on the protocol, which can handle redirects.
        // transport: undefined, // default

        // `httpAgent` and `httpsAgent` define a custom agent to be used when performing http
        // and https requests, respectively, in node.js. This allows options to be added like
        // `keepAlive` that are not enabled by default.
        httpAgent: new http.Agent({ keepAlive: true }),
        httpsAgent: new https.Agent({ keepAlive: true }),

        // // `proxy` defines the hostname, port, and protocol of the proxy server.
        // // You can also define your proxy using the conventional `http_proxy` and
        // // `https_proxy` environment variables. If you are using environment variables
        // // for your proxy configuration, you can also define a `no_proxy` environment
        // // variable as a comma-separated list of domains that should not be proxied.
        // // Use `false` to disable proxies, ignoring environment variables.
        // // `auth` indicates that HTTP Basic auth should be used to connect to the proxy, and
        // // supplies credentials.
        // // This will set an `Proxy-Authorization` header, overwriting any existing
        // // `Proxy-Authorization` custom headers you have set using `headers`.
        // // If the proxy server uses HTTPS, then you must set the protocol to `https`.
        // proxy: {
        //     protocol: 'https',
        //     host: '127.0.0.1',
        //     // hostname: '127.0.0.1' // Takes precedence over 'host' if both are defined
        //     port: 9000,
        //     auth: {
        //         username: 'mikeymike',
        //         password: 'rapunz3l'
        //     }
        // },

        // // `cancelToken` specifies a cancel token that can be used to cancel the request
        // // (see Cancellation section below for details)
        // cancelToken: new CancelToken(function (cancel) {
        // }),

        // // an alternative way to cancel Axios requests using AbortController
        // signal: new AbortController().signal,

        // `decompress` indicates whether or not the response body should be decompressed
        // automatically. If set to `true` will also remove the 'content-encoding' header
        // from the responses objects of all decompressed responses
        // - Node only (XHR cannot turn off decompression)
        decompress: true, // default

        // `insecureHTTPParser` boolean.
        // Indicates where to use an insecure HTTP parser that accepts invalid HTTP headers.
        // This may allow interoperability with non-conformant HTTP implementations.
        // Using the insecure parser should be avoided.
        // see options https://nodejs.org/dist/latest-v12.x/docs/api/http.html#http_http_request_url_options_callback
        // see also https://nodejs.org/en/blog/vulnerability/february-2020-security-releases/#strict-http-header-parsing-none
        insecureHTTPParser: undefined, // default

        // transitional options for backward compatibility that may be removed in the newer versions
        transitional: {
            // silent JSON parsing mode
            // `true`  - ignore JSON parsing errors and set response.data to null if parsing failed (old behaviour)
            // `false` - throw SyntaxError if JSON parsing failed (Note: responseType must be set to 'json')
            silentJSONParsing: true, // default value for the current Axios version

            // try to parse the response string as JSON even if `responseType` is not 'json'
            forcedJSONParsing: true,

            // throw ETIMEDOUT error instead of generic ECONNABORTED on request timeouts
            clarifyTimeoutError: false,
        },

        // env: {
        //     // The FormData class to be used to automatically serialize the payload into a FormData object
        //     FormData: window?.FormData || global?.FormData
        // },

        // formSerializer: {
        //     visitor: (value, key, path, helpers) => {}, // custom visitor function to serialize form values
        //     dots: boolean, // use dots instead of brackets format
        //     metaTokens: boolean, // keep special endings like {} in parameter key
        //     indexes: boolean, // array indexes format null - no brackets, false - empty brackets, true - brackets with indexes
        // },

        // http adapter only (node.js)
        maxRate: [
            100 * 1024, // 100KB/s upload limit,
            100 * 1024  // 100KB/s download limit
        ]
    })

/**
 * Sends a completion request to OpenAI API
 * @param req
 * @param res
 * @return {Promise<*>}
 */
async function sendRequest(req, res) {
    try {
        console.log(req.body);
        console.log(req.params);
        // get the prompt from the request object
        const options =  getParams(req);
        // send error if no prompt provided
        if (!options) {
            return res.status(400).json({
                error: "No prompt provided"
            })
        }
        console.log("Prompt: ");
        console.log(options);

        // get the query from the request object
        switch (true) {
        case true:
            return (
                res
                    .status(200)
                    .setHeader("Content-Type", "application/json")
                    .json(
                        await openaiAPI(options.apiPath, options.prompt)
                    )
            );
        default:
            console.log("No query provided");
            return (res
                .status(200)
                .setHeader("Content-Type", "application/json")
                .json(
                    {error: 'No query provided'}
                )
            );


        }
    } catch (e) {
        if (e.response) {
            console.error(e.response.status);
            console.error(e.response.data);
            console.error(e.message);
            res
                .status(200)
                .setHeader("Content-Type", "application/json")
                .json(
                    {error: 'No query provided'}
                )
        } else {
            console.error(e.message);
            res
                .status(200)
                .setHeader("Content-Type", "application/json")
                .json(
                    {error: 'No query provided'}
                )
        }
        e.stackTrace;
    }
}

/**
 * Sends a completion request to OpenAI API
 * @param apiPath
 * @param prompt
 * @return {Promise<T|void>}
 */
async function openaiAPI(apiPath, prompt) {

    try {
        switch (true) {
        case /completions/i.test(apiPath):
            return getCompletion(prompt);
        }

    } catch (e) {
        console.error(e.message);
        e.stackTrace;
    }

}

async function getCompletion(prompt){

    return await instance.post(
        "/v1/completions",
        state.requestBody(prompt)
    )
    .then((resp) => resp.data)
    .then((data) => {
        console.dir(data);
        const respArray = data.match(state.regex);
        console.dir(respArray);
        return respArray;
    })
    .catch(console.dir);
}

async function transformStreamToJSON(regex) {
    return new TransformStream({
        transform: async function(chunk, controller) {
            const data = String(chunk);
            let json;
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
    })
}

/**
 * {string|object|Uint8Array}
 */
// eslint-disable-next-line class-methods-use-this
function toStringJson(data)  {
    return String(data)
        .replace(removeParser, "")
        .replace(/data:/g, "")
        .replace(/data: \[DONE\]/g, "")
        .replace(/(data: \[DONE\])*/g, "")
        .replace(/\s*data:\s*/g, "")
        .replace(/data:\s*\[DONE\]\n*/g, "")
        .replace(/\[DONE\]/g, "");
}

module.exports = {
    sendRequest
}