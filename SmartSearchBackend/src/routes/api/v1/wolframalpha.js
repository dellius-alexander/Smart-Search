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
const express = require("express");
const router = express.Router();
const sendRequest = require("../../../controllers/wolframalpha");

const callback = function(msg, err){
    console.error("Error: ", err);
    console.error(msg, err);
}

/**
 * API endpoint to get the result of a Wolfram Alpha query.
 * This route sets up an endpoint to accept a POST request at the path "/post".
 * It passes the request to the sendRequest middleware, which then passes the request to the callback function.
 * @path /post
 * @function sendRequest
 * @callback callback
 */
router.post("/alpha", sendRequest, callback);
/**
 * API endpoint to get the result of a Wolfram Alpha query.
 * This route sets up an endpoint to accept a POST request at the path "/post".
 * It passes the request to the sendRequest middleware, which then passes the request to the callback function.
 * @path /get
 * @function sendRequest
 * @callback callback
 */
router.get("/alpha", sendRequest, callback);
module.exports = router;