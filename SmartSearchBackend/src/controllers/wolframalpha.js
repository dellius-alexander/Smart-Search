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

const WolframAlphaAPI = require('wolfram-alpha-api');
const waApi = WolframAlphaAPI(process.env.REACT_APP_WOLFRAMALPHA_APPID);

async function sendRequest(req, res) {
    try {
        // get the prompt from the request object
        const prompt =  Object.keys(req.query).length !== 0 ? req.query :
            Object.keys(req.body).length !== 0 ? req.body :
                Object.keys(req.params).length !== 0 ? req.params :
                    undefined;
        // send error if no prompt provided
        if (!prompt) {
            return res.status(400).json({
                error: "No prompt provided"
            })
        }
        console.log("Prompt: ", prompt);
        // creates a selection mechanism
        switch (true) {
        case true:
            return res
                .status(200)
                .send(

                         "<p>Wolframalpha API is working</p>"

                    // await waApi
                    //     .getFull(prompt)
                    //     .then(response => response.json())
                );
        case false:
            return res
                .status(200)
                .json(
                    await waApi
                        .getSimple(prompt)
                        .then(response => response.json())
                );
        }

    } catch (e) {
        console.error(e);
        e.stackTrace
    }
}

module.exports = sendRequest;