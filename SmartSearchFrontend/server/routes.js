const app = require( "./server.js");
const {errorHandler} = require("./utils/errorHandlers");

const express = require("express");
const path = require("path");

/**
 * The <code> app.engine('html', require(<YOUR TEMPLATE ENGINE>).renderFile) </code>
 * is used to register the template engine for .html files. It maps a file
 * extension to a specific template engine. but it's not necessary as pug,
 * handlebars, Mustache natively support rendering files with the .html extension.
 *
 * If you would like to use <YOUR TEMPLATE ENGINE> to render .html files you can
 * use <code> app.engine('html', require(<YOUR TEMPLATE ENGINE>).renderFile) </code>
 * function, but it's not required, you can stick to the <code>app.set('view engine', '<YOUR TEMPLATE ENGINE>')</code>
 * and use the .<YOUR TEMPLATE ENGINE> or .html file extension to render your views.
 */
app.set("view engine", "ejs");
// set view engine to explicitly override default behavior to include parsing of .html files
// eslint-disable-next-line no-underscore-dangle
app.engine("html", require("ejs").__express);
// set the view directory and .html as the default extension
app.set("views", path.join(process.cwd(), "/www"));
// add assets directory static file paths
app.use("/js", express.static(path.join(process.cwd(), "/www/static/js")));
app.use("/css", express.static(path.join(process.cwd(), "/www/static/css")));

// Middleware for handling index route
console.log("Setting index route......");
/**
 * Redirect http to https
 */
app.use(async (req, res, next) => {
  if(req.protocol === "http") {
    res.redirect(301, `https://${req.headers.host}${req.url}`);
  }
  next();
});

// index route
app.use("/", async (req, res) => {
  const data = {
    appid: process.env.REACT_APP_WOLFRAMALPHA_APPID,
  };
  const index = path.join(process.cwd(), "/www/index.html");
  console.log("Rendering index page......\n", index);
  res
    // .status(200)
    // .set("X-Content-Type-Options", "nosniff")
    // .setHeader(
    //   "Content-Type",
    //   [
    //     "text/html; charset=utf-8",
    //     // "application/json; charset=utf-8",
    //   ],
    //   "Set-Cookie", {data: data}
    // )
    .sendFile(index);

});
// final handler in chain of custody routes
app.use(errorHandler);

module.exports = app;