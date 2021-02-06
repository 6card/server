const createError = require('http-errors')
const express = require('express');

exports.start = function() {
    const app = express();
    const port = process.env.PORT || "3000";

    app.get('/favicon.ico', (req, res) => res.status(204).end()); //fix favicon error
    
    app.get("/", (req, res) => {
      res.status(200).send("WHATABYTE: Food For Devs");
    });

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
        next(createError(404));
    });

    // error handler
    app.use(function(err, req, res, next) {
        //winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}. Data: %j %s`, req.body, err.stack);
        //res.status(500).send(`hey!! we caugth the error, ${err.stack}`);
        res.status(err.status || 500);
        //res.send('error: ' + err.message);
        res.json({
            status: "error",
            code: err.status || 500,
            message: err.message || err,
            data: {}
        });
    });
    
    app.listen(port, () => {
      console.log(`Listening to requests on http://localhost:${port}`);
    });    
}