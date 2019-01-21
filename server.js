const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');

// create express app
const app = express();

// CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Authorization, Accept");
  next();
});

// use helmet middleware for http headers
app.use(helmet({
  noCache: true
}));

// Set payload limit
app.use(express.json({limit: '50mb'}));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to block builder api"});
});

// ........

// Require Blocks routes
require('./app/routes/block.routes.js')(app);

// ........

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});