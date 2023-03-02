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

/**
 * Gets the index path.
 * @param req the request object
 * @param res the response object
 * @returns {Promise<void>}
 * @desc GET main root path
 * @route GET /
 * @access private
 */
const getIndex = async function(req, res) {
    // console.log(req)
    const response = {
        timestamp: new Date().toISOString(),
        status: req.status,
        secure: req.secure,
        message: "Hello From Smart Search API"
    }
    return res .status(200)
        .json(response);
}

module.exports = {getIndex};