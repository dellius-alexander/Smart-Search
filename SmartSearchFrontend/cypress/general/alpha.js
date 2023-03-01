const parse = require("html-react-parser");
const REACT_APP_WOLFRAMALPHA_APPID = "96A2G3-Q24J3WVEWY";

const params = new URLSearchParams({
  "input": "what is newtons first law?",
  "includepodid": "Result",
  "format": "plaintext",
  "output": "JSON",
  "appid": `${REACT_APP_WOLFRAMALPHA_APPID}`,

});

const headers = new Headers([
  ["Accept", "application/json"],
  ["Accept-Language", "en-US,en;q=0.8"],
  ["Content-Language", "en-US,*"],
  ["Content-Type", "application/json"],
  // ["Connection", "keep-alive"],
  // ["Accept-Encoding", "gzip, deflate"],
  ["Access-Control-Allow-Origin", "*"],
  // ["Access-Control-Allow-Methods", "GET,POST,HEAD,OPTIONS"],
  // ["Access-Control-Allow-Headers", "Content-Type"],
  // ["User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64)"]
]);

const url =  new URL(`/v2/query?${params}`,  "https://www.wolframalpha.com:443");


new Promise((resolve, reject) => {
  fetch(url, {
    // duplex: "full",
    headers: headers,
    method: "POST",
    mode: "cors",
  })
    .then((response) => {
      const html = response.text();
      // Convert the HTML string into a document object
      const doc = parse(`${html.toString()}`);
      console.dir(doc.toString());
      return doc;
    })
    .then((json) => resolve(json))
    .catch((e) => reject(e));
});

