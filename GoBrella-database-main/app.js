// require imports packages required by the application
const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');

// Specify HoST and PORT
const HOST = '127.0.0.1';
const PORT = 8080;

// app is a new instance of express (the web app framework)
let app = express();

// Application settings
app.use((req, res, next) => {
    // Globally set Content-Type header for the application
    res.setHeader("Content-Type", "application/json");
    next();
}); 


// Allow app to support differnt body content types (using the bidyParser package)
app.use(express.text());
app.use(express.json()); // support json encoded bodies
app.use(express.urlencoded({ extended: true })); // support url encoded bodies


// cors
// https://www.npmjs.com/package/cors
// https://codesquery.com/enable-cors-nodejs-express-app/
// Simple Usage (Enable All CORS Requests)
app.use(cors({ credentials: true, origin: true }));
app.options('*', cors()) // include before other routes

/* Configure app Routes to handle requests from browser */

// The default route 
app.use('/', require('./controllers/index'));
// route to /Gobrella
app.use('/Gobrella', require('./controllers/productController'));


// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found: '+ req.method + ":" + req.originalUrl);
    err.status = 404;
    next(err);
});

// Start the HTTP server using HOST address and PORT consts defined above
// Lssten for incoming connections
const server = app.listen(PORT, HOST, () => {
    console.log(`Express server listening on http://${HOST}:${PORT}`);
});

// export this as a module, making the app object available when imported.
module.exports = app;