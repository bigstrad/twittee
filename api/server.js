// Dependencies
const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.TWIT_TEE_API_PORT || 8001;
// const bodyParser = require('body-parser')

let app = express();

// Configure bodyparser to handle post requests
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// Import routes (Note: must be placed *after* body parser!)
let routes = require('./routes')

// Middleware function
// var xxx = function(req, res, next) {
// ...
//   next();
// }

// App config
app.use(morgan('combined'));
app.use('/api', routes);

// Start Express server
app.listen(port, function () {
  console.log(`App listening on port ${port}`);
});