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
/**
 * Import server configuration
 */
const {config} = require('./config')
config().catch(console.dir)

// express router
// const expressApp = require(`express/lib/router`);
// instantiate express middleware
const express = require('express');
const server = express();

/**
 * Used for file upload support
 */
const multer = require('multer');
const upload = multer();
// for parsing multipart/form-data
server.use(upload.array());

/**
 *  You will use this dependency to configure Express to add headers
 *  stating that your API accepts requests coming from other origins.
 *  This is known as Cross-Origin Resource Sharing (CORS).
 * @type {function(*): function(*, *, *): void}
 */
const cors = require('cors')
/**
 * Cookie Parser
 * @type {(function((string|Array)=, Object=): function(*, *, *): (*|undefined))|{JSONCookie?: *, JSONCookies?: *, signedCookie?: *, signedCookies?: *}}
 */
const cookieParser = require('cookie-parser');
/**
 * You will use this dependency to convert the body of incoming
 * requests into JavaScript objects.
 * @type {{urlencoded: Function, json: Function, raw: Function, text: Function}|{json?: *, raw?: *, text?: *, urlencoded?: *}}
 */
const bodyParser = require('body-parser');
/**
 * This library helps to secure Express APIs by defining various HTTP headers.
 */
const helmet = require('helmet')
/**
 * This library adds some logging capabilities to your Express API.
 * @type {(function((String|Function), Object=): function(*, *, *): void)|{compile?: *, format?: *, token?: *}}
 */
const logger = require('morgan');

// // start the vault server
// require("../src/services/vault/main");


//By default, Express.js sends the X-Powered-By response header banner.
// This can be disabled using the app.disable() method
server.disable('x-powered-by')

// add middleware security for api
/**
 * Add security for application.
 * see: https://content-security-policy.com
 */
server.use(helmet());

// CORS stands for Cross-Origin Resource Sharing. We enable CORS checking,
// a mechanism that uses additional HTTP headers to tell browsers to give
// a web application running at one origin, access to selected resources
// from a different origin
server.use(cors())
server.use(logger('dev'));
server.use(cookieParser());

// for parsing application/json
server.use(bodyParser.json());

// for parsing application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({
  extended: true
}));

// export our app
module.exports = server;
