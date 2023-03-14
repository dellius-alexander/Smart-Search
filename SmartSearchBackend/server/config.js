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
////////////////////////////////////////////////////////////////
const dotenv = require('dotenv');
const path = require('path');
const {
    existsSync
} = require('fs');
const {MongooseOptions} = require("mongoose");
////////////////////////////////////////////////////////////////
/**
 * Initializes|Loads configuration from environment variables file.
 * @returns {Promise<void>}
 */
async function config() {
    try {
        if (existsSync(path.join(process.cwd(), `.env.${process.env.NODE_ENV}.local`))) {
            const options = Object.create({
                path: path.join(process.cwd(), `.env.${process.env.NODE_ENV}.local`),
                encoding: 'utf8',
                debug: true,
                override: true
            })
            const results = dotenv.config(options);
            if (results.error) {
                throw results.error;
            } else {
                console.log("Loading.env file successful...");
                console.dir(results);
                return results;
            }
        } else {
            console.error("No environment file found. Startup will continue, defaulting to runtime environment.")
            console.error(process.env)
        }
    } catch (e) {
        console.error(e)
        e.stackTrace
    }
}
////////////////////////////////////////////////////////////////
/**
 * Mongoose configuration options
 * @type {{useUnifiedTopology: boolean, keepAlive: boolean,
 * socketTimeoutMS: number, family: number, useNewUrlParser: boolean,
 * maxPoolSize: number, serverSelectionTimeoutMS: number,
 * keepAliveInitialDelay: number, autoIndex: boolean}}
 */
const mongodb_options  = {
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4, // Use IPv4, skip trying IPv6
    useNewUrlParser: true,
    useUnifiedTopology: true,
    keepAliveInitialDelay: 300000,
    keepAlive: true,
};
////////////////////////////////////////////////////////////////

module.exports = {
    config,
    mongodb_options
}