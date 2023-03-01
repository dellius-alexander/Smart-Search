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
const express = require('express');
const {readFileSync} = require("fs");
const router = express.Router();
const PUBLIC_KEY = readFileSync(process.env.PUBLIC_KEY_FILE, 'utf-8')

/**
 * Get the public key. In symmetric-key cryptography,
 * the same key is used for both encryption and decryption. In
 * public-key cryptography, there exists a pair of related keys
 * known as the public key and private key. The public key is
 * freely available, whereas the private key is kept secret.
 * The public key is able to encrypt messages that only the
 * corresponding private key is able to decrypt, and vice versa.
 * @param {request} request the request object
 * @param {response} response the response object
 */
router.get('/certificate', (req,res) => {
    const publicKey = req.headers.authorization = PUBLIC_KEY
    console.log(publicKey)
    return res.status(200).json({publicKey : publicKey})
});

module.exports = router;