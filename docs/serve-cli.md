# Serve Static Files Using Serve

## Start Https Server

```bash
$ serve -l https://delliusalexander.com:${PORT} \
    -c serve.json \
    --debug \
    --ssl-cert /usr/local/app/.certs/delliusalexander.crt \
    --ssl-key /usr/local/app/.certs/delliusalexander.key 
    
```

```text
serve - Static file serving and directory listing

USAGE

$ serve --help
$ serve --version
$ serve folder_name
$ serve [-l listen_uri [-l ...]] [directory]

By default, serve will listen on 0.0.0.0:3000 and serve the
current working directory on that address.

Specifying a single --listen argument will overwrite the default, not supplement it.

OPTIONS

--help                              Shows this help message

-v, --version                       Displays the current version of serve

-l, --listen listen_uri             Specify a URI endpoint on which to listen (see below) -
                                    more than one may be specified to listen in multiple places

-p                                  Specify custom port

-s, --single                        Rewrite all not-found requests to `index.html`

-d, --debug                         Show debugging information

-c, --config                        Specify custom path to `serve.json`

-L, --no-request-logging            Do not log any request information to the console.

-C, --cors                          Enable CORS, sets `Access-Control-Allow-Origin` to `*`

-n, --no-clipboard                  Do not copy the local address to the clipboard

-u, --no-compression                Do not compress files

--no-etag                           Send `Last-Modified` header instead of `ETag`

-S, --symlinks                      Resolve symlinks instead of showing 404 errors

--ssl-cert                          Optional path to an SSL/TLS certificate to serve with HTTPS
                                    Supported formats: PEM (default) and PKCS12 (PFX)

--ssl-key                           Optional path to the SSL/TLS certificate's private key
                                    Applicable only for PEM certificates

--ssl-pass                          Optional path to the SSL/TLS certificate's passphrase

--no-port-switching                 Do not open a port other than the one specified when it's taken.

ENDPOINTS

Listen endpoints (specified by the --listen or -l options above) instruct serve
to listen on one or more interfaces/ports, UNIX domain sockets, or Windows named pipes.

For TCP ports on hostname "localhost":

  $ serve -l 1234

For TCP (traditional host/port) endpoints:

  $ serve -l tcp://hostname:1234

For UNIX domain socket endpoints:

  $ serve -l unix:/path/to/socket.sock

For Windows named pipe endpoints:

  $ serve -l pipe:\\.\pipe\PipeName

```


```javascript
if (response.ok) {
  const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();
  let chunk = "";
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    chunk += value;
  }
  const jsonResponseData = JSON.parse(chunk);
  this.state.id = jsonResponseData.id;
  this.state.type = jsonResponseData.object;
  this.state.created = jsonResponseData.created;
  this.state.model = jsonResponseData.model;
  this.state.jsonData = jsonResponseData.choices[0];
  this.state.usage = jsonResponseData.usage;
  return parse(this.state.jsonData.text);
}
// create a byte stream to send the request
// const stream = new ReadableStream({
//   async start(controller) {
//     const interval = setInterval(() => {
//       controller.enqueue(JSON.stringify({
//         frequency_penalty: 0,
//         logprobs: null,
//         max_tokens: 256,
//         model: model,
//         presence_penalty: 0,
//         prompt: `{"prompt":"${prompt}","instructions":["Talk to me like a 6 year old":"${layman}","Send response inside embedded div tag, do not include html tag in response."]}`,
//         stream: false,
//         temperature: 0.8,
//         top_p: 1,
//       }).split("").entries());
//     }, 500);
//     clearInterval(interval);
//     controller.close();
//   }
// }).pipeThrough(new TextEncoderStream());

```


```bash
docker run --name smart-scraper -it -p 443:6000 \
-v ./app:/home/node/app \
dalexander2israel/hyfi:smart-scraper-1.0.0

```