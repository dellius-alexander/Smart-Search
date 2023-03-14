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
const morgan = require("morgan");
/**
 * Import server configuration
 */
const {config} = require("./config");
config().catch(console.dir);

// express router
// const expressApp = require(`express/lib/router`);
// instantiate express middleware
const express = require("express");
const server = express();

/**
 * Used for file upload support
 */
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
// for parsing multipart/form-data
server.use(upload.array());

/**
 *  You will use this dependency to configure Express to add headers
 *  stating that your API accepts requests coming from other origins.
 *  This is known as Cross-Origin Resource Sharing (CORS).
 * @type {function(*): function(*, *, *): void}
 */
const cors = require("cors");
// CORS stands for Cross-Origin Resource Sharing. We enable CORS checking,
// a mechanism that uses additional HTTP headers to tell browsers to give
// a web application running at one origin, access to selected resources
// from a different origin
server.use(cors());

/**
 * Cookie Parser
 * @type {(function((string|Array)=, Object=): function(*, *, *): (*|undefined))|{JSONCookie?: *, JSONCookies?: *, signedCookie?: *, signedCookies?: *}}
 */
const cookieParser = require("cookie-parser");
server.use(cookieParser());
/**
 * You will use this dependency to convert the body of incoming
 * requests into JavaScript objects.
 * @type {{urlencoded: Function, json: Function, raw: Function, text: Function}|{json?: *, raw?: *, text?: *, urlencoded?: *}}
 */
const bodyParser = require("body-parser");
// for parsing application/json
server.use(bodyParser.json());
// for parsing application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({
  extended: true
}));
/**
 * This library helps to secure Express APIs by defining various HTTP headers.
 */
const helmet = require("helmet");
// add middleware security for api
/**
 * Add security for application.
 * see: https://content-security-policy.com
 */
server.use(helmet());
/**
 * This library adds some logging capabilities to your Express API.
 * @type {(function((String|Function), Object=): function(*, *, *): void)|{compile?: *, format?: *, token?: *}}
 */
const logger = require("morgan");
server.use(logger("dev"));

// // start the vault server
// require("../src/services/vault/main");


//By default, Express.js sends the X-Powered-By response header banner.
// This can be disabled using the app.disable() method
server.disable("x-powered-by");

/**
 * Middleware for adding security headers.
 * By default, Helmet sets the following headers:
 *
 * Content-Security-Policy:
 *      default-src 'self'; base-uri 'self'; font-src 'self' https: data:; form-action 'self';
 *      frame-ancestors 'self'; img-src 'self' https: data: ; object-src 'none'; script-src 'self';
 *      script-src-attr 'none'; style-src 'self' https: 'unsafe-inline'; upgrade-insecure-requests
 * Cross-Origin-Embedder-Policy: require-corp
 * Cross-Origin-Opener-Policy: same-origin
 * Cross-Origin-Resource-Policy: same-origin
 * Origin-Agent-Cluster: ?1
 * Referrer-Policy: no-referrer
 * Strict-Transport-Security: max-age=15552000; includeSubDomains
 * X-Content-Type-Options: nosniff
 * X-DNS-Prefetch-Control: off
 * X-Download-Options: noopen
 * X-Frame-Options: SAMEORIGIN
 * X-Permitted-Cross-Domain-Policies: none
 * X-XSS-Protection: 0
 *
 * Please see https://content-security-policy.com for more details.
 */
server.use(helmet.contentSecurityPolicy({
  useDefaults: false,
  directives: {
    defaultSrc: [
      "'self'",
      process.env.HOSTNAME,
      "*.googleapis.com",
      "https://code.jquery.com/jquery-3.6.1.min.js",
      "https://www.google.com/maps/",
      "https://fonts.googleapis.com/",
      "https://127.0.0.1",
      "https://dellius-alexander.github.io/Smart-Search/",
      "https://api.openai.com ",
      "https://davinci-codex.herokuapp.com",
      "https://api.wolframalpha.com",
      "https://www6b3.wolframalpha.com",
      "https://delliusalexander.com",
      "http://delliusalexander.com",
      "unsafe-eval",
      "'unsafe-inline'",
      "data:",
      "content:",
      "",
    ],
    scriptSrc: [
      "'self'",
      process.env.HOSTNAME,
      "*.googleapis.com",
      "https://code.jquery.com/jquery-3.6.1.min.js",
      "https://www.google.com/maps/",
      "https://fonts.googleapis.com/",
      "https://127.0.0.1",
      "https://dellius-alexander.github.io/Smart-Search/",
      "https://api.openai.com ",
      "https://davinci-codex.herokuapp.com",
      "https://api.wolframalpha.com",
      "https://www6b3.wolframalpha.com",
      "https://delliusalexander.com",
      "http://delliusalexander.com",
      "unsafe-eval",
      "'unsafe-inline'",
      "data:",
      "content:",
      "",
    ],
    objectSrc: ["'none'"],
    fontSrc: [
      "'self'",
      process.env.HOSTNAME,
      "*.googleapis.com",
      "https://code.jquery.com/jquery-3.6.1.min.js",
      "https://www.google.com/maps/",
      "https://fonts.googleapis.com/",
      "https://127.0.0.1",
      "https://dellius-alexander.github.io/Smart-Search/",
      "https://api.openai.com ",
      "https://davinci-codex.herokuapp.com",
      "https://api.wolframalpha.com",
      "https://www6b3.wolframalpha.com",
      "https://delliusalexander.com",
      "http://delliusalexander.com",
      "unsafe-eval",
      "'unsafe-inline'",
      "data:",
      "content:",
      "",
    ],
    styleSrc: ["'self'", "https://fonts.googleapis.com/", "'unsafe-inline'"],
    frameSrc: [
      "'self'",
      process.env.HOSTNAME,
      "*.googleapis.com",
      "https://code.jquery.com/jquery-3.6.1.min.js",
      "https://www.google.com/maps/",
      "https://fonts.googleapis.com/",
      "https://127.0.0.1",
      "https://dellius-alexander.github.io/Smart-Search/",
      "https://api.openai.com ",
      "https://davinci-codex.herokuapp.com",
      "https://api.wolframalpha.com",
      "https://www6b3.wolframalpha.com",
      "https://delliusalexander.com",
      "http://delliusalexander.com",
      "unsafe-eval",
      "'unsafe-inline'",
      "data:",
      "content:",
      "",
    ],
    connectSrc: [
      "'self'",
      process.env.HOSTNAME,
      "*.googleapis.com",
      "https://code.jquery.com/jquery-3.6.1.min.js",
      "https://www.google.com/maps/",
      "https://fonts.googleapis.com/",
      "https://127.0.0.1",
      "https://dellius-alexander.github.io/Smart-Search/",
      "https://api.openai.com ",
      "https://davinci-codex.herokuapp.com",
      "https://api.wolframalpha.com",
      "https://www6b3.wolframalpha.com",
      "https://delliusalexander.com",
      "http://delliusalexander.com",
      "unsafe-eval",
      "'unsafe-inline'",
      "data:",
      "content:",
      "",
    ],
    upgradeInsecureRequests: [],
  },
}));

// server.use((request, response, next) => {
//   response.set("X-Content-Type-Options", "nosniff");
//   next();
// });

// Middleware for logging HTTP requests
server.use(morgan("combined"));


// export our app
module.exports = server;
