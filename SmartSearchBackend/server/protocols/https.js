/**
 *    Copyright 2022 Dellius Alexander
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

const app = require('../api/v1/routes.js')
const { normalizePort } = require('../../src/utils/helpers')

const { readFileSync } = require("fs");

/**
 * Https Server object.
 */
const httpsServer = require('https')

/**
 * Initialize application server
 * @returns {Promise<void>}
 */
async function main_https() {

    try {

        /**
         * Set server port configuration options
         * @type {{hostname: string, port: (string|number), node_hostname: string}}
         */
        const cfg = {
            port: normalizePort(process.env.PORT || 8080),
            hostname: process.env.HOST || "localhost"
        }

        /**
         * create ssl options
         * @type {{cert: Buffer, key: Buffer}}
         */
        const sslOptions = {
            key: readFileSync(process.env.SSL_KEY_FILE, 'utf-8'),
            cert: readFileSync(process.env.SSL_CRT_FILE, 'utf-8')
        }

        /**
         * configure server to use SSL.
         * Test if server state is up by running: curl -k https://HOSTNAME:PORT
         * @type {Server<typeof httpsServer.IncomingMessage, typeof httpsServer.ServerResponse>}
         */
        httpsServer.createServer(sslOptions, app)
            .listen(
                cfg.port,
                cfg.hostname,
                () => {
                    console.log(`SafeHome API listening on https://${cfg.hostname}:${cfg.port}`)
                    console.log(`To test server entrypoint Run: curl -k https://${cfg.hostname}:${cfg.port}`)
                })
            .on('success', async function(req, res) {
                console.log(`Success`)
                console.log(req, res)
            })
            .on('error', async function(req, res) {
                console.error(`Error:`)
                console.error(req, res)
            })

    } catch (e) {
        console.error(`server.Error: `)
        console.dir(e)
        process.exit(1)
    }
}

// start the server
main_https().catch(err => console.dir(err));