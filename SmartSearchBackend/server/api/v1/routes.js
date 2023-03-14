const app = require( "../../server.js");
const {errorHandler} = require("../../../src/middleware/errorHandlers");

/**
 * Redirect http to https
 */
app.use((req, res, next) => {
    if(req.protocol === 'http') {
        res.redirect(301, `https://${req.headers.host}${req.url}`);
    }
    next();
});

app.use('/', require('../../../src/routes/index.js'));
app.use('/api/v1', require('../../../src/routes/index.js'));
app.use('/api/v1/openai', require('../../../src/routes/api/v1/openai.js'));
app.use('/api/v1/alpha', require('../../../src/routes/api/v1/wolframalpha.js'));
app.use('/api/v1', require('../../../src/routes/api/v1/certificate.js'));


// final handler in chain of custody routes
app.use(errorHandler)

module.exports = app