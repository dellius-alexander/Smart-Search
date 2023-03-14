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

const { getParams } = require("../utils/helpers");
const WolframAlphaAPI = require('wolfram-alpha-api');
const waApi = WolframAlphaAPI(process.env.REACT_APP_WOLFRAMALPHA_APPID);


async function sendRequest(req, res) {
    try {
        // get the prompt from the request object
        const prompt = getParams(req);
        // send error if no prompt provided
        if (!prompt) {
            return res.status(400).json({
                error: "No prompt provided"
            })
        }
        console.log("Prompt: ", prompt);
        // get the query from the request object
        switch (true) {
        case true:
            return (
                await wolframAlphaAPI(req, res, prompt.apiPath, prompt)
            );
        }

    } catch (e) {
        console.error(e);
        e.stackTrace
    }
}

async function wolframAlphaAPI(req, res, apiPath, options = {}){
    console.log(`Status Code:  ${req}`);
    // creates a selection mechanism
    switch (true) {
    case /spoken/i.test(apiPath):
        return (res
            .status(200)
            .json(
                // "<p>Wolframalpha API is working fine</p>"
                await waApi
                    .getSpoken(options)
                    .then((response) => {
                        console.log("Response:  ");
                        console.dir(response);
                        return response;
                    })
            ));
    case /full/i.test(apiPath):
        return (res
            .status(200)
            .json(
                await waApi
                    .getFull(options.input)
                    .then((response) => {
                        console.log("Response:  ");
                        console.dir(response.pods[0].subpods[0].plaintext);
                        return response.pods[0].subpods[0].plaintext;
                    })
            ));
    case /simple/i.test(apiPath):
        return (res
            .status(200)
            .json(
                await waApi
                    .getSimple(options)
                    .then((response) => {
                        console.log("Response:  ");
                        console.dir(response);
                        return response;
                    })
            ));
    case /short/i.test(apiPath):
        return (res
            .status(200)
            .json(
                await waApi
                    .getShort(options)
                    .then((response) => {
                        console.log("Response:  ");
                        console.dir(response);
                        return response;
                    })
            ));
    }
}

module.exports = {sendRequest};