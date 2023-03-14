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
 * Checks if the object is empty.
 * @param obj the object to check
 * @returns {{isEmpty: boolean, object}}
 * @private
 */
const isEmpty = function(obj) {
    for (let key in obj)
    {
        if (obj.hasOwnProperty(key))
        {
            return false;
        }
    }
    return true;
}


/**
 * Normalize a port into a number, string, or false.
 * @param val the port to be normalized
 * @returns {boolean|number|*} the normalized port value
 */
const normalizePort = (val) => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}
const initCallback = async function(res){
    console.dir(res);
}

const getParams = function(req){
    return (
        Object.keys(req.query).length !== 0
            ? Object.assign({}, req.query) : Object.keys(req.body).length !== 0
                ? Object.assign({}, req.body) : Object.keys(req.params).length !== 0
                    ? Object.assign({}, req.params) : undefined
    );
}


module.exports = {
    isEmpty,
    normalizePort,
    initCallback,
    getParams
}
